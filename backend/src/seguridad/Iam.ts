import { IamType } from './types/SeguridadTypes';

const access: IamType = {
  version: '1.2.0',
  grupos: {
    propietario: {
      roles: ['superadministrador'],
      firmas: ['yr5fS3jQTA94', 'aEqj4MY56xyk', '4N349Qxj6Cn4', '4gj3CyJu9tb6'],
      privilegios: '0:01234:0',
      organizacion: 'Keralty',
    },
    cliente: {
      firmas: ['yr5fS3jQTA94', 'aEqj4MY56xyk', '4N349Qxj6Cn4', '4gj3CyJu9tb6'],
      roles: ['administrador'],
      privilegios: '0:01234',
      organizacion: 'Empresa cliente',
    },
    soporte: {
      firmas: ['yr5fS3jQTA94', 'aEqj4MY56xyk', '4N349Qxj6Cn4', '4gj3CyJu9tb6'],
      roles: ['soporte-app', 'soporte-cloud'],
      privilegios: '0:01234:0',
      organizacion: 'Soluciones PC',
    },
  },
  modulos: {
    0: 'empresa',
    1: 'autoevaluacion',
    2: 'trabajadores',
  },
  acciones: {
    aplicacion: ['leer', 'escribir', 'aprobar', 'importar', 'exportar'],
    infraestructura: ['configuracion'],
  },
};

export default access;
