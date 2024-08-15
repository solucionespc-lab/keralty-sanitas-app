export const habilitarPermiso = (permisos: string[] = [], permiso = '') =>
  !permisos.some((p) => p === permiso);
