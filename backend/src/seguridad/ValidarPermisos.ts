import access from './Iam';
import { ClaimsType, gruopAcc } from './types/SeguridadTypes';

const validarIAM = (grupo: gruopAcc, rol: string): boolean => {
  const validarGrupo = access.grupos[grupo]?.roles ?? [];
  return validarGrupo.some((iamRol) => iamRol === rol);
};

// Asignación de permisos para administradores, ver documentanción para su implementación plena
const asignarPermisosAdmin = (grupo: gruopAcc): string => {
  const permisosAdmin = access.grupos[grupo].privilegios;
  const llavesModulos = Object.keys(access.modulos);
  const paquetes = permisosAdmin?.split(':');

  const aplicacionAdmin = paquetes?.[1];
  const infraAdmin = paquetes?.[2];

  let permisosAux = '';

  for (let index = 0; index < llavesModulos.length; index += 1) {
    if (paquetes?.length === 3) {
      permisosAux += `${index}:${aplicacionAdmin}:${infraAdmin}/`;
    } else {
      permisosAux += `${index}:${aplicacionAdmin}/`;
    }
  }

  return permisosAux.slice(0, permisosAux.length - 1);
};

// Funcion que valida los permisos y reconstruye los permisos
const validarPermisos = (
  claims: ClaimsType,
  moduloAEvaluar: string,
  parametroAEvaluar: string
): boolean => {
  const { permisos, grupo, rol, firma } = claims;
  let permisosAdmin: string | undefined;

  // Determinar si es un superadministrador o administrador
  const esAdmin = access.grupos[grupo].firmas.some((firm) => firm === firma);

  if (esAdmin) {
    permisosAdmin = asignarPermisosAdmin(grupo);
  }

  const arbol = permisosAdmin?.split('/') ?? permisos.split('/');

  const arbolPermisos = arbol.map((paquetePermisos) => {
    const permisoResultado = paquetePermisos.split(':');
    const totalAplicacion = permisoResultado[1]?.length ?? 0;
    const totalInfraestructura = permisoResultado[2]?.length ?? 0;
    const perm = [];

    // Arbol correspondiente a los módulos
    const modulo = access.modulos[Number(permisoResultado[0])];

    // Arbol correspondiente a los accessos
    for (let i = 0; i < totalAplicacion; i += 1) {
      const acceso = Number(permisoResultado[1].charAt(i));
      perm.push(access.acciones.aplicacion[acceso]);
    }

    // Arbol correspondiente a la infraestructura
    for (let i = 0; i < totalInfraestructura; i += 1) {
      const infra = Number(permisoResultado[2].charAt(i));
      perm.push(access.acciones.infraestructura[infra]);
    }

    return {
      [modulo]: perm,
    };
  });

  const acceso = arbolPermisos.reduce((permAcc, permiso) =>
    Object.assign(permAcc, permiso)
  );

  const moduloSegunParametro = acceso[moduloAEvaluar] ?? [];
  const parametroEsValido = moduloSegunParametro.some(
    (permiso) => permiso === parametroAEvaluar
  );

  const esValidoElRol = validarIAM(grupo, rol);
  if (parametroEsValido && esValidoElRol) {
    return parametroEsValido;
  }

  return false;
};

export default validarPermisos;
