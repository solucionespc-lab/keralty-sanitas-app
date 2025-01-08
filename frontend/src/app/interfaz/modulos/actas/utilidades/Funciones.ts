import { CONVENCION_RESULTADOS } from '../constantes/ConstGenerales';

import type { ActasType } from '../types/ActasTypes';

/**
 *
 * @param datosQuery Arreglo de datos provenientes de la Query realizada al servidor
 * @returns Devuelve un arreglo de objetos con los campos correspondientes a la respuesta del servidor
 */
export const validarDatosTabla = (datosQuery: ActasType[]) => {
  return datosQuery?.map((dato) => ({
    id: dato.id,
    sds: dato.numeroSds,
    nombreProveedor: dato.nombreEmpresa,
    actividad: dato.actividades[0].nombre,
    fecha: dato.fechaEjecucion,
    estado:
      CONVENCION_RESULTADOS[dato.estado as keyof typeof CONVENCION_RESULTADOS],
  }));
};
