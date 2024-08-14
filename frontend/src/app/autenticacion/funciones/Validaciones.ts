import tiposErrores from 'comunes/recursos/Errores.json';
import Toast from 'comunes/informativos/Notificaciones';

const mensajeDefecto =
  'Se produjo un error inesperado, comuníquese con el administrador';

export function validarEmail(correo: string): boolean {
  const regex = /\w+([.|-]?)\w+@(pcsoluciones|biodsa|biod){1}(.com|\.co)+$/;

  if (regex.test(correo)) {
    return true;
  }

  return false;
}

export const validarErrores = (codigo: string): void => {
  const mensajeDeError = tiposErrores.find((err) => err.codigo === codigo);
  Toast(mensajeDeError?.mensaje ?? mensajeDefecto, 'error');
};
