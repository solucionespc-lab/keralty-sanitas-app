import { rule } from 'graphql-shield';

import validarPermisos from './ValidarPermisos';

const estaAutenticado = rule({ cache: 'contextual' })(
  async (_, __, context) => {
    if (context.uid !== undefined || context.user_id !== undefined) {
      return true;
    }
    return false;
  }
);

const leerDocumentos = (modulo: string) =>
  rule(`${modulo}`)(async (_, __, context) =>
    validarPermisos(context, modulo.split('/')[0], 'leer')
  );

const registrarDocumentos = (modulo: string) =>
  rule(`${modulo}`)(async (_, __, context) =>
    validarPermisos(context, modulo.split('/')[0], 'escribir')
  );

const realizacionDeAprobaciones = (modulo: string) =>
  rule(`${modulo}`)(async (_, __, context) =>
    validarPermisos(context, modulo.split('/')[0], 'aprobar')
  );

const importacionDeDatos = (modulo: string) =>
  rule(`${modulo}`)(async (_, __, context) =>
    validarPermisos(context, modulo.split('/')[0], 'importar')
  );

const exportacionDeDatos = (modulo: string) =>
  rule(`${modulo}`)(async (_, __, context) =>
    validarPermisos(context, modulo.split('/')[0], 'exportar')
  );

const borrarDocumentos = (modulo: string) =>
  rule(`${modulo}`)(async (_, __, context) =>
    validarPermisos(context, modulo.split('/')[0], 'borrar')
  );

const cargarArchivos = (modulo: string) =>
  rule(`${modulo}`)(async (_, __, context) =>
    validarPermisos(context, modulo.split('/')[0], 'cargarArchivos')
  );

const creacionDeTokesAuth = (modulo: string) =>
  rule(`${modulo}`)(async (_, __, context) =>
    validarPermisos(context, modulo.split('/')[0], 'crearTokens')
  );

const creacionDePermisosUsuarios = (modulo: string) =>
  rule(`${modulo}`)(async (_, __, context) =>
    validarPermisos(context, modulo.split('/')[0], 'crearUsuarios')
  );

const envioDeMensajeria = (modulo: string) =>
  rule(`${modulo}`)(async (_, __, context) =>
    validarPermisos(context, modulo.split('/')[0], 'mensajeria')
  );

const llamadasOnline = (modulo: string) =>
  rule(`${modulo}`)(async (_, __, context) =>
    validarPermisos(context, modulo.split('/')[0], 'llamar')
  );

const modificacionesMasivas = (modulo: string) =>
  rule(`${modulo}`)(async (_, __, context) =>
    validarPermisos(context, modulo.split('/')[0], 'masivas')
  );

const opcionesConfiguracion = (modulo: string) =>
  rule(`${modulo}`)(async (_, __, context) =>
    validarPermisos(context, modulo.split('/')[0], 'configuracion')
  );

const politicas = {
  estaAutenticado,
  leerDocumentos,
  registrarDocumentos,
  realizacionDeAprobaciones,
  importacionDeDatos,
  exportacionDeDatos,
  borrarDocumentos,
  cargarArchivos,
  creacionDeTokesAuth,
  creacionDePermisosUsuarios,
  envioDeMensajeria,
  modificacionesMasivas,
  opcionesConfiguracion,
  llamadasOnline,
};

export { politicas };
