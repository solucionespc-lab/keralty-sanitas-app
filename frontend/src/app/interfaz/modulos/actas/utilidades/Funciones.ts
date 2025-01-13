import {
  CONVENCION_ESTADOS,
  CONVENCION_RESULTADOS,
} from '../constantes/ConstGenerales';

import type { ActasType } from '../types/ActasTypes';

/**
 *
 * @param datosQuery Arreglo de datos provenientes de la Query realizada al servidor
 * @returns Devuelve un arreglo de objetos con los campos correspondientes a la respuesta del servidor
 */
export const validarDatosTablaCliente = (datosQuery: ActasType[]) => {
  return datosQuery?.map((dato) => ({
    id: dato.id,
    sds: dato.numeroSds,
    nombreProveedor: dato.proveedor.nombre,
    actividad: dato.actividadPpal,
    fecha: dato.fechaEjecucion,
    estado: CONVENCION_ESTADOS[dato.estado as keyof typeof CONVENCION_ESTADOS],
  }));
};

/**
 *
 * @param datosQuery Arreglo de datos provenientes de la Query realizada al servidor
 * @returns Devuelve un arreglo de objetos con los campos correspondientes a la respuesta del servidor
 */
export const validarDatosTablaProveedor = (datosQuery: ActasType[]) => {
  return datosQuery?.map((dato) => ({
    id: dato.id,
    sds: dato.numeroSds,
    idEmpresa: dato.idEmpresa,
    nombreCliente: dato.empresa.nombre,
    actividad: dato.actividadPpal,
    fecha: dato.fechaEjecucion,
    estado: CONVENCION_ESTADOS[dato.estado as keyof typeof CONVENCION_ESTADOS],
  }));
};

/**
 * Extrae la llave correspondiente a un valor en el objeto CONVENCION_RESULTADOS.
 *
 * @param resultado El valor a buscar en CONVENCION_RESULTADOS.
 * @returns La llave correspondiente al valor encontrado, o vacío si no se encuentra.
 *
 */
export function extraerValorResultado(resultado: string) {
  for (const [llave, valor] of Object.entries(CONVENCION_RESULTADOS)) {
    if (resultado === valor) {
      return llave;
    }
  }
  return '';
}
