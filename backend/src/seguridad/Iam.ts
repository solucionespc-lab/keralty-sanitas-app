import { IamType } from './types/SeguridadTypes';

const access: IamType = {
  version: '1.2.0',
  grupos: {
    propietario: {
      roles: ['superadministrador'],
      firmas: ['yr5fS3jQTA94', 'aEqj4MY56xyk', '4N349Qxj6Cn4', '4gj3CyJu9tb6'],
      privilegios: '0:01234567:0123',
      organizacion: 'empresa',
    },
    cliente: {
      firmas: ['yr5fS3jQTA94', 'aEqj4MY56xyk', '4N349Qxj6Cn4', '4gj3CyJu9tb6'],
      roles: ['administrador', 'direccion', 'regional', 'sin regional'],
      privilegios: '0:01234567:3',
      organizacion: 'empresa',
    },
    proveedor: {
      firmas: ['yr5fS3jQTA94', 'aEqj4MY56xyk', '4N349Qxj6Cn4', '4gj3CyJu9tb6'],
      roles: ['coordinacion', 'regional', 'sin regional'],
      privilegios: null,
      organizacion: 'empresa-externo',
    },
    soporte: {
      firmas: ['yr5fS3jQTA94', 'aEqj4MY56xyk', '4N349Qxj6Cn4', '4gj3CyJu9tb6'],
      roles: ['soporte-app', 'soporte-cloud'],
      privilegios: '0:01234567:0123',
      organizacion: 'Soluciones PC',
    },
  },
  modulos: {
    0: 'empresa',
  },
  acciones: {
    aplicacion: [
      'leer',
      'escribir',
      'aprobar',
      'importar',
      'exportar',
      'exportarTodo',
      'masivas',
      'pendientes',
      'duplicar',
    ],
    infraestructura: [
      'crearTokens',
      'crearUsuarios',
      'llamar',
      'configuracion',
    ],
  },
};

export default access;
