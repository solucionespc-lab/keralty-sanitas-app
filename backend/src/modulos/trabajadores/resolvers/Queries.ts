import * as admin from 'firebase-admin';

import {
  REF_HISTORIAL_OCUPACIONAL,
  REF_TRABAJADORES,
} from '../constantes/Constantes';

import type { IFiltroTrabajador } from '../types/TrabajadorTypes';

export const traerTrabajadores = async (
  _: unknown,
  { filtros }: { filtros: IFiltroTrabajador }
) => {
  let trabajadorRef: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> =
    admin.firestore().collection(REF_TRABAJADORES);

  const hayFiltros = Object.values(filtros).some(
    (item) => item !== '' && item !== 0
  );

  if (hayFiltros) {
    Object.keys(filtros).forEach((llave) => {
      if (filtros[llave as keyof IFiltroTrabajador] != '') {
        trabajadorRef = trabajadorRef.where(
          llave,
          '==',
          filtros[llave as keyof IFiltroTrabajador]
        );
      }
    });
  } else {
    trabajadorRef = trabajadorRef.limit(50);
  }

  const trabajadorPromise = await trabajadorRef.get();

  return trabajadorPromise.docs.map((doc: FirebaseFirestore.DocumentData) => ({
    ...doc.data(),
    idTrabajador: doc.id,
  }));
};

export const traerTrabajador = async (_: unknown, { id }: { id: string }) => {
  const trabajadorRef = admin.firestore().collection(REF_TRABAJADORES).doc(id);

  const historiaOcupacional = (
    await trabajadorRef
      .collection(REF_HISTORIAL_OCUPACIONAL)
      .orderBy('fechaIngresoCargo')
      .get()
  ).docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  const trabajador = await trabajadorRef.get();

  return {
    ...trabajador.data(),
    idTrabajador: id,
    historiaOcupacional: historiaOcupacional,
  };
};
