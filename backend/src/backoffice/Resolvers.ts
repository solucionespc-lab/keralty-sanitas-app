import {
  actualizarUsuario,
  exportarEmpresasDesdeExcel,
  guardarUsuario,
  volcarEmpresasDesdeFirestoreAAlgolia,
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
    volcarEmpresasAAlgolia: volcarEmpresasDesdeFirestoreAAlgolia,
  },
};

export default BackOfficeResolver;
