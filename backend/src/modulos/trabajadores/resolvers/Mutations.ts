import * as admin from 'firebase-admin';
import { logger } from 'firebase-functions';

import { calcularYear } from '../../../utilidades/Funciones';
import {
  REF_HISTORIAL_OCUPACIONAL,
  REF_TRABAJADORES,
} from '../constantes/Constantes';

import type {
  IinputOcupacional,
  IinputTrabajador,
  IinputTrabajadorImport,
} from '../types/TrabajadorTypes';

export const guardarTrabajador = async (
  _: unknown,
  { input }: { input: IinputTrabajador }
) => {
  const trabajadorRef = admin.firestore().collection(REF_TRABAJADORES).doc();

  const { historiaOcupacional, ...trabajadorSinHistorico } = input;

  await trabajadorRef
    .set(trabajadorSinHistorico)
    .catch((error) =>
      console.log('Ocurrió un error al crear el trabajador', error)
    )
    .then(async () => {
      const refHistorico = trabajadorRef.collection(REF_HISTORIAL_OCUPACIONAL);
      if (historiaOcupacional) {
        await Promise.all(
          historiaOcupacional.map((historia) => {
            const refHistoria = historia.id
              ? refHistorico.doc(historia.id)
              : refHistorico.doc();
            return refHistoria.set({
              ...historia,
              id: refHistoria.id,
              idTrabajador: trabajadorRef.id,
            });
          })
        );
      }
    });

  return `Se ha creado el trabajador ${input.nombre} de manera exitosa`;
};

export const guardarListaTrab = async (
  _: unknown,
  { lista }: { lista: string[] }
) => {
  let retorno = '';
  await Promise.all(
    lista.map(async (dato) => {
      retorno += `El servicio ${dato} no existe, valide que haya escrito el servicio correctamente |`;
      return null;
    })
  );

  return retorno;
};

export const importarTrabajadores = async (
  _: unknown,
  {
    primeraCedula,
    ultimaCedula,
    input,
  }: {
    primeraCedula: number;
    ultimaCedula: number;
    input: IinputTrabajadorImport[];
  }
) => {
  const respuesta: { exitos: number; fallos: string[] } = {
    exitos: 0,
    fallos: [],
  };
  // indiceTrabajadoresRedis();
  const trabajadorRef = admin.firestore().collection(REF_TRABAJADORES);

  const cantLotes = Math.ceil(input.length / 300);
  /** VALIDACION TEMPORAL DE TRABAJADORES DESDE FIREBASE */
  const trabajadoresQuery = await trabajadorRef
    .orderBy('cedula', 'asc')
    .startAt(primeraCedula)
    .endAt(ultimaCedula)
    .get();
  // traemos todos los trabajadores existentes buscando las cédulas
  const trabajadoresExistentes: Partial<IinputTrabajador>[] =
    trabajadoresQuery.docs.map((doc) => doc.data() as IinputTrabajador);

  const historialTrabajadoresExistentes = await Promise.all(
    trabajadoresExistentes.map((trabajador) => {
      return trabajadorRef
        .doc(trabajador.idTrabajador as string)
        .collection(REF_HISTORIAL_OCUPACIONAL)
        .get()
        .then((res) => res.docs);
    })
  );

  const ultimoRegistroPorTrabajador: Record<string, IinputTrabajadorImport> =
    {};

  // batch por lotes para actualizar el historial ocupacional
  for (let i = 0; i < cantLotes; i++) {
    const batchHistorial = admin.firestore().batch();
    const inicio = i * 300;
    const fin = Math.min((i + 1) * 300, input.length);
    const lote = input.slice(inicio, fin);

    lote.forEach(async (trabajador: IinputTrabajadorImport) => {
      let validacion = true;
      // Aquí validaremos que el objeto cumpla con las restricciones ocupacionales, como por ejemplo que tenga la edad mínima y demás.

      // condicion 1, el trabajador  debe temer una edad mínima de 16 años.
      const edad = calcularYear(trabajador.fechaNacimiento);
      if (edad < 16) {
        respuesta.fallos.push(
          `Edad del trabajador con cédula ${trabajador.cedula} es inválida, debe tener al menos 16 años`
        );
        validacion = false;
      }
      // Validamos que el trabajador sea uno de los existentes, si existe usamos su referencia en la base de datos, si no existe se crea una referencia nueva.

      const trabajadorExiste = trabajadoresExistentes.find(
        (item) => item.cedula?.toString() === trabajador.cedula.toString()
      );
      // Si el objeto cumple con las condiciones se procede a guardarlo
      if (validacion === true) {
        const referencia = trabajadorExiste
          ? trabajadorRef.doc(trabajadorExiste.idTrabajador as string)
          : trabajadorRef.doc();

        // filtramos para tomar el último registro en el excel del trabajador
        if (!ultimoRegistroPorTrabajador[referencia.id]) {
          ultimoRegistroPorTrabajador[referencia.id] = trabajador;
        } else if (
          trabajador.fechaIngresoCargo >
          ultimoRegistroPorTrabajador[referencia.id].fechaIngresoCargo
        ) {
          ultimoRegistroPorTrabajador[referencia.id] = trabajador;
        }

        // Buscamos si en los datos ocupacionales ya existe el cargo, si
        const cargoParaActualizar = historialTrabajadoresExistentes
          .flat()
          .find(
            (item) =>
              item.data().fechaIngresoCargo === trabajador.fechaIngresoCargo &&
              item.data().idTrabajador === referencia.id
          );

        const referenciaOcupacional = cargoParaActualizar
          ? cargoParaActualizar.ref
          : referencia.collection(REF_HISTORIAL_OCUPACIONAL).doc();

        const datosOcupacionales: IinputOcupacional = {
          cargo: trabajador.cargoActual ?? '',
          fechaIngresoCargo: trabajador.fechaIngresoCargo ?? '',
          fechaRetiroCargo: trabajador.fechaRetiroCargo ?? '9999-12-31',
          idTrabajador: referencia.id,
          turno: trabajador.turnoActual ?? '',
          id: referenciaOcupacional.id,
          correo: trabajador.correo ?? '',
          fechaIngresoEmp: trabajador.fechaIngresoEmp,
          fechaRetiroEmp: trabajador.fechaRetiroEmp,
          genero: trabajador.genero ?? '',
          gerencia: trabajador.gerencia ?? '',
          jefeInmediato: trabajador.jefeInmediato ?? '',
          proceso: trabajador.procesoActual ?? '',
          tipoContrato: trabajador.tipoContrato ?? '',
        };
        batchHistorial.set(referenciaOcupacional, datosOcupacionales);
        respuesta.exitos++;
      }
    });

    try {
      await batchHistorial.commit();
      console.log('Se crearon los historiales');
    } catch (error) {
      logger.error((error as Error).message);
    }
  }

  // batch por lotes del trabajador
  for (let i = 0; i < cantLotes; i++) {
    const inicio = i * 300;
    const fin = Math.min((i + 1) * 300, input.length);
    const lote = Object.keys(ultimoRegistroPorTrabajador).slice(inicio, fin);

    const trabajadoresToRedis: IinputTrabajador[] = [];
    const batch = admin.firestore().batch();
    lote.forEach((key: string) => {
      const ultimoRegistro: IinputTrabajador = ultimoRegistroPorTrabajador[key];
      const ultimoRegistroRef = trabajadorRef.doc(key);
      trabajadoresToRedis.push({
        ...ultimoRegistro,
        idTrabajador: key,
      });
      batch.set(
        ultimoRegistroRef,
        {
          ...ultimoRegistro,
          idTrabajador: key,
        },
        { merge: true }
      );
    });

    // try {
    //   await batch.commit().then(async () => {
    //     await TrabajadoresResolver.Mutation.saveTrabajadorOnRedis(_, {
    //       input: trabajadoresToRedis,
    //     });
    //   });
    //   console.log('Se crearon los trabajadores');
    // } catch (error) {
    //   logger.error((error as Error).message);
    // }
  }

  return respuesta;
};

export const actualizarTrabajador = async (
  _: unknown,
  { input, idTrabajador }: { input: IinputTrabajador; idTrabajador: string }
) => {
  const { historiaOcupacional, ...trabajadorSinHistorico } = input;

  const trabajadorRef = admin
    .firestore()
    .collection(REF_TRABAJADORES)
    .doc(idTrabajador);

  await trabajadorRef
    .update(trabajadorSinHistorico)
    .catch((error) =>
      console.log('Ocurrió un error al actualizar el trabajador', error)
    )
    .then(async () => {
      const refHistorico = trabajadorRef.collection(REF_HISTORIAL_OCUPACIONAL);

      if (historiaOcupacional) {
        await Promise.all(
          historiaOcupacional.map((historia) => {
            if (historia.id) {
              return refHistorico.doc(historia.id).update({ ...historia });
            }
            return refHistorico.doc().set(historia);
          })
        );
      }
    });

  return `Se ha actualizado el trabajador ${input.nombre} de manera exitosa`;
};
