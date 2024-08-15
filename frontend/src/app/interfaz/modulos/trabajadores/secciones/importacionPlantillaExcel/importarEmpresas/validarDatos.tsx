/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ContFlexColumn } from 'comunes/estilos/EstComunes';

import { getLocalDate } from 'utilidades/FuncionesGenerales';
import {
  NombreMayus,
  removeAccents,
} from 'modulos/trabajadores/funciones/FuncionesExcel';
import { EncabezadosPlantillaType } from '../types/ImportarTypes';
import { encabezadosPlantillas } from './constantes/ConstImportar';
import formatoFechaEjemplo from './recursos/formatoFecha.png';

const validarFecha = (fecha: string) => {
  const fechaValida = { dia: false, mes: false, year: false };
  const dia = fecha[0];
  const mes = fecha[1];
  const year = fecha[2];

  if (fecha.length === 0 || fecha.length < 3) return false;

  if (year.length === 4) {
    fechaValida.year = true;
  }

  if (dia.length === 2) {
    fechaValida.dia = true;
  }

  if (mes.length === 2 && Number(mes) <= 12) {
    fechaValida.mes = true;
  }
  const esValidafecha = Object.values(fechaValida).some((val) => val === false);

  return !esValidafecha;
};

export const CalcularAntiguedadLimiteEdad = (
  fechaEvaluar: any,
  fechaReciente: any
) => {
  let fechaArregloEvaluar = [];
  fechaArregloEvaluar = fechaEvaluar?.split('-');
  let fechaArregloReciente = [];
  fechaArregloReciente = fechaReciente?.split('-');
  fechaArregloEvaluar?.reverse();
  fechaArregloReciente?.reverse();

  const diaEvaluar = fechaArregloEvaluar?.[0];
  const mesEvaluar = fechaArregloEvaluar?.[1];
  const yearEvaluar = fechaArregloEvaluar?.[2];
  const diaReciente = fechaArregloReciente?.[0];
  const mesReciente = fechaArregloReciente?.[1];
  const yearReciente = fechaArregloReciente?.[2];
  let antiguedad = yearReciente - yearEvaluar;
  const m = Number(mesReciente) - Number(mesEvaluar);

  if (antiguedad === 16) {
    if (m < 0 || (m === 0 && diaReciente < diaEvaluar)) {
      antiguedad -= 1;
    }
  }

  return antiguedad;
};

const validarDatos = (item: any, numeroFila: number, listas: any): any => {
  const errores: any = [];
  const copiaPlantilla: any = { ...item };
  const datosPlantilla: EncabezadosPlantillaType = {
    ...encabezadosPlantillas,
  };
  const datosFechas: string[] = [
    'fechaNacimiento',
    'fechaIngresoEmp',
    'fechaRetiroEmp',
    'fechaIngresoCargo',
    'fechaRetiroCargo',
  ];

  const datosObliagtorios: string[] = [
    'cedula',
    'nombre',
    'genero',
    'estadoCivil',
    'nivelEducativo',
  ];

  const registro = {
    numFila: Number(numeroFila) + 2,
    identidad: `${copiaPlantilla?.[datosPlantilla?.identidad] ?? ''} `,
    caso: {},
    error: '',
    seCarga: true,
  };
  // datos obligatorios o formatos por campo

  datosFechas?.forEach((codigoFecha: any) => {
    if (copiaPlantilla?.[datosPlantilla?.[codigoFecha]]) {
      let fechaArreglo = [];
      fechaArreglo =
        copiaPlantilla?.[datosPlantilla?.[codigoFecha]]?.split('/');

      if (fechaArreglo[0] === 4) {
        fechaArreglo.reverse();
      }
      const validarFormatoFecha = validarFecha(fechaArreglo);

      if (!validarFormatoFecha) {
        const error = (
          <ContFlexColumn style={{ gap: '1em' }}>
            {`La variable " ${
              datosPlantilla?.[codigoFecha]
            } " no cumple el formato dd/mm/aaaa, se esta recibiendo de esta forma ${
              copiaPlantilla?.[datosPlantilla?.[codigoFecha]]
            }. Por esta razón, se debe seleccionar en la plantilla el formato indicado en la siguiente imagen:`}
            <img src={formatoFechaEjemplo} width="50%" />{' '}
          </ContFlexColumn>
        );
        errores.push(error);
      }
      if (validarFormatoFecha) {
        const formatoInternoJAVA = copiaPlantilla?.[
          datosPlantilla?.[codigoFecha]
        ]
          .split('/')
          .reverse()
          .join('-');

        Object.assign(copiaPlantilla, {
          [datosPlantilla?.[codigoFecha]]: formatoInternoJAVA,
        });
      }
    }
  });

  datosObliagtorios?.forEach((campo: any) => {
    if (!copiaPlantilla?.[datosPlantilla?.[campo]]) {
      const error = `La variable " ${datosPlantilla?.[campo]} " es obligatoria`;
      errores.push(error);
    }
  });

  if (
    CalcularAntiguedadLimiteEdad(
      copiaPlantilla?.[datosPlantilla?.fechaIngresoEmp],
      getLocalDate().fecha
    ) < 0
  ) {
    errores.push('La Antigüedad debe ser mayor o igual a 0 ');
  }

  if (
    CalcularAntiguedadLimiteEdad(
      copiaPlantilla?.[datosPlantilla?.fechaNacimiento],
      getLocalDate().fecha
    ) < 16
  ) {
    errores.push('La edad debe ser mayor de 15 años');
  }
  if (
    copiaPlantilla?.[datosPlantilla?.fechaRetiroEmp]
      ?.split(' ')?.[0]
      ?.split('-')?.[0] <
    copiaPlantilla?.[datosPlantilla?.fechaIngresoEmp]
      ?.split(' ')?.[0]
      ?.split('-')?.[0]
  ) {
    errores.push(
      'La Fecha de retiro debe ser mayor o igual que la fecha de ingreso a la empresa'
    );
  }
  if (
    copiaPlantilla?.[datosPlantilla?.fechaRetiroEmp]
      ?.split(' ')?.[0]
      ?.split('-')?.[0] ===
    copiaPlantilla?.[datosPlantilla?.fechaIngresoEmp]
      ?.split(' ')?.[0]
      ?.split('-')?.[0]
  ) {
    if (
      copiaPlantilla?.[datosPlantilla?.fechaRetiroEmp]
        ?.split(' ')?.[0]
        ?.split('-')?.[1] <
      copiaPlantilla?.[datosPlantilla?.fechaIngresoEmp]
        ?.split(' ')?.[0]
        ?.split('-')?.[1]
    ) {
      errores.push(
        'La Fecha de retiro debe ser mayor o igual que la fecha de ingreso a la empresa'
      );
    }
    if (
      copiaPlantilla?.[datosPlantilla?.fechaRetiroEmp]
        ?.split(' ')?.[0]
        ?.split('-')?.[1] >=
        copiaPlantilla?.[datosPlantilla?.fechaIngresoEmp]
          ?.split(' ')?.[0]
          ?.split('-')?.[1] &&
      copiaPlantilla?.[datosPlantilla?.fechaRetiroEmp]
        ?.split(' ')?.[0]
        ?.split('-')?.[2] <
        copiaPlantilla?.[datosPlantilla?.fechaIngresoEmp]
          ?.split(' ')?.[0]
          ?.split('-')?.[2]
    ) {
      errores.push(
        'La Fecha de retiro debe ser mayor o igual que la fecha de ingreso a la empresa'
      );
    }
  }

  //funciones

  const buscarListado = (lista: any, tipoCampo: string) => {
    const listado = lista ?? [];
    const listadoCampo = listado?.map((campo: any) => {
      return campo?.[tipoCampo];
    });
    return listadoCampo;
  };

  const validarEscrituraListadoCampo = (
    datoEncabezado: string,
    tipoListado: any,
    tipoCampoBusqueda: string,
    tipoCampoMostrar?: string
  ) => {
    const campoSinAcento = removeAccents(
      copiaPlantilla?.[datoEncabezado] ?? ''
    );

    const filtrarRegional = tipoListado?.find(
      (item: any) => removeAccents(item?.[tipoCampoBusqueda]) === campoSinAcento
    );

    return filtrarRegional?.[tipoCampoMostrar || tipoCampoBusqueda] ?? '';
  };

  const validarEscrituraListadoCampoArray = (
    datoEncabezado: string,
    tipoListado: any
  ) => {
    const campoSinAcento = removeAccents(datoEncabezado ?? '');

    const filtrarRegional = tipoListado?.find(
      (item: any) => removeAccents(item) === campoSinAcento
    );

    return filtrarRegional;
  };

  const validadoGrupoSan = validarEscrituraListadoCampoArray(
    copiaPlantilla[datosPlantilla?.rh]?.[0],
    listas?.grupoSanguineo
  );

  const validadoGenero = validarEscrituraListadoCampoArray(
    copiaPlantilla[datosPlantilla?.genero],
    listas?.genero
  );

  const validadoEstadoCivil = validarEscrituraListadoCampo(
    datosPlantilla?.estadoCivil,
    listas?.estadoCivil,
    'value',
    'id'
  );

  const validadoNivelEducativo = validarEscrituraListadoCampo(
    datosPlantilla?.nivelEducativo,
    listas?.nivelEducativo,
    'value',
    'id'
  );

  const validadoGerencia = validarEscrituraListadoCampo(
    datosPlantilla?.gerencia,
    listas?.gerencias,
    'value',
    'id'
  );

  const cargoActual = validarEscrituraListadoCampo(
    datosPlantilla?.cargo,
    listas?.cargos,
    'value',
    'id'
  );
  const procesoActual = validarEscrituraListadoCampo(
    datosPlantilla?.proceso,
    listas?.procesos,
    'value',
    'id'
  );

  const validadoturnoActual = validarEscrituraListadoCampo(
    datosPlantilla?.turno,
    listas?.turnos,
    'value',
    'id'
  );

  const validadoContrato = validarEscrituraListadoCampo(
    datosPlantilla?.tipoContrato,
    listas?.contratos,
    'value',
    'id'
  );

  const validadoProfesion = validarEscrituraListadoCampo(
    datosPlantilla?.profesion,
    listas?.profesiones,
    'value',
    'id'
  );

  //////////////////////////////////////////////////////

  const estadoCivil = buscarListado(listas?.estadoCivil, 'value');
  estadoCivil.push('');

  const nivelEducativo = buscarListado(listas?.nivelEducativo, 'value');
  nivelEducativo.push('');

  const gerencia = buscarListado(listas?.gerencias, 'value');
  gerencia.push('');

  const cargo = buscarListado(listas?.cargos, 'value');
  cargo.push('');

  const proceso = buscarListado(listas?.procesos, 'value');
  proceso.push('');

  const turno = buscarListado(listas?.turnos, 'value');
  turno.push('');

  const tipoContrato = buscarListado(listas?.contratos, 'value');
  tipoContrato.push('');

  const profesion = buscarListado(listas?.profesiones, 'value');
  profesion.push('');

  const tipoGenero = listas?.genero;
  tipoGenero.push('');
  const tipoRH: any = [];
  listas?.grupoSanguineo?.forEach((item: any) => {
    tipoRH.push(item + '+');
    tipoRH.push(item + '-');
  });

  const datosPlantillaEncabezados = [
    datosPlantilla?.genero,
    datosPlantilla?.estadoCivil,
    datosPlantilla?.nivelEducativo,
    datosPlantilla?.gerencia,
    datosPlantilla?.cargo,
    datosPlantilla?.proceso,
    datosPlantilla?.turno,
    datosPlantilla?.tipoContrato,
    datosPlantilla?.profesion,
    datosPlantilla?.rh,
  ];

  const variables: any = {
    [datosPlantilla?.genero]: tipoGenero,
    [datosPlantilla?.estadoCivil]: estadoCivil,
    [datosPlantilla?.nivelEducativo]: nivelEducativo,
    [datosPlantilla?.gerencia]: gerencia,
    [datosPlantilla?.cargo]: cargo,
    [datosPlantilla?.proceso]: proceso,
    [datosPlantilla?.turno]: turno,
    [datosPlantilla?.tipoContrato]: tipoContrato,
    [datosPlantilla?.profesion]: profesion,
    [datosPlantilla?.rh]: tipoRH,
  };

  const variablesMostrar: any = {
    [datosPlantilla?.genero]: tipoGenero,
    [datosPlantilla?.estadoCivil]: estadoCivil,
    [datosPlantilla?.nivelEducativo]: nivelEducativo,
    [datosPlantilla?.gerencia]: gerencia,
    [datosPlantilla?.cargo]:
      'de acuerdo con la lista de cargos de la herramienta',
    [datosPlantilla?.proceso]:
      'de acuerdo con la lista de procesos de la herramienta',
    [datosPlantilla?.proceso]: turno,
    [datosPlantilla?.tipoContrato]: tipoContrato,
    [datosPlantilla?.profesion]:
      'de acuerdo con la lista de profesiones de la herramienta',
    [datosPlantilla?.rh]: tipoRH,
  };

  let estado = '';
  const organizarEspacios = (campo: string) => {
    return variablesMostrar[campo]?.length <= 2
      ? variablesMostrar[campo]?.join(' ó ')
      : variablesMostrar[campo]?.join(', ');
  };
  datosPlantillaEncabezados.map((campo) => {
    const conversionFormato = removeAccents(copiaPlantilla?.[campo] ?? '');
    const variablesEspeciales = conversionFormato;
    estado = variables[campo]?.find(
      (est: any) => removeAccents(est) === variablesEspeciales
    );

    if (estado === undefined) {
      errores.push(
        `La variable ${campo} no coincide con las utilizadas en la herramienta, ${
          Array.isArray(variablesMostrar[campo])
            ? `estas deben ser : ${organizarEspacios(campo)}`
            : ` esta debe estar ${variablesMostrar[campo]}`
        }.`
      );
    }
    return estado;
  });

  if (errores?.length > 0) {
    return {
      ...registro,
      error: errores,
      seCarga: false,
    };
  }
  // variables

  const nombreOrden = [datosPlantilla?.nombre];
  const nombreContra = () => {
    const nombre: string[] = [];
    nombreOrden?.forEach((itemNombre) => {
      if (copiaPlantilla?.[itemNombre]) {
        nombre.push(NombreMayus(copiaPlantilla?.[itemNombre]));
      }
    });
    return nombre.join(' ') ?? '';
  };
  const validarNombre = nombreContra();

  return {
    ...registro,
    caso: {
      cedula: Number(copiaPlantilla?.[datosPlantilla?.cedula] ?? 0),
      nombre: validarNombre ?? '',
      fechaNacimiento: copiaPlantilla?.[datosPlantilla?.fechaNacimiento] ?? '',
      fechaIngresoEmp: copiaPlantilla?.[datosPlantilla?.fechaIngresoEmp] ?? '',
      fechaRetiroEmp: copiaPlantilla?.[datosPlantilla?.fechaRetiroEmp] ?? '',
      genero: validadoGenero ?? '',
      estadoCivil: validadoEstadoCivil ?? '',
      nivelEducativo: validadoNivelEducativo ?? '',
      gerencia: validadoGerencia ?? '',
      cargoActual: cargoActual ?? '',
      procesoActual: procesoActual ?? '',
      turnoActual: validadoturnoActual ?? '',
      fechaIngresoCargo:
        copiaPlantilla?.[datosPlantilla?.fechaIngresoCargo] ?? '',
      fechaRetiroCargo:
        copiaPlantilla?.[datosPlantilla?.fechaRetiroCargo] ?? '',
      correo: copiaPlantilla?.[datosPlantilla?.correo] ?? '',
      tipoContrato: validadoContrato ?? '',
      jefeInmediato: copiaPlantilla?.[datosPlantilla?.jefeInmediato] ?? '',
      profesion: validadoProfesion ?? '',
      nombreContacto: copiaPlantilla?.[datosPlantilla?.nombreContacto] ?? '',
      numContacto: copiaPlantilla?.[datosPlantilla?.numContacto] ?? '',
      numHijos: Number.isNaN(Number(copiaPlantilla?.[datosPlantilla?.numHijos]))
        ? 0
        : Number(copiaPlantilla?.[datosPlantilla?.numHijos]) ?? 0,
      grupoSanguineo: validadoGrupoSan ?? '',
      rh: copiaPlantilla?.[datosPlantilla?.rh]?.[1] ?? '',
    },
  };
};
export default validarDatos;
