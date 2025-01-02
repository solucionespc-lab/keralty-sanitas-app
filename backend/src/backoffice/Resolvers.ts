import {
  actualizarUsuario,
  exportarEmpresasDesdeExcel,
  guardarUsuario,
} from './resolvers/Mutations';
import { traerUsuario, traerUsuarios } from './resolvers/Queries';

const BackOfficeResolver = {
  Query: {
    getUsuarios: traerUsuarios,
    getUsuario: traerUsuario,
  },
  Mutation: {
    saveUsuario: guardarUsuario,
    updateUsuario: actualizarUsuario,
    volcarEmpresasDesdeExcel: exportarEmpresasDesdeExcel,
  },
};

export default BackOfficeResolver;
