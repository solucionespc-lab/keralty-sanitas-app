import {
  actualizarTrabajador,
  guardarListaTrab,
  guardarTrabajador,
  importarTrabajadores,
} from './resolvers/Mutations';
import { traerTrabajador, traerTrabajadores } from './resolvers/Queries';

const TrabajadoresResolver = {
  Query: {
    getTrabajadores: traerTrabajadores,
    getTrabajador: traerTrabajador,
  },
  Mutation: {
    saveTrabajador: guardarTrabajador,
    trabajadoresAlistas: guardarListaTrab,
    importTrabajadores: importarTrabajadores,
    updateTrabajador: actualizarTrabajador,
  },
};

export default TrabajadoresResolver;
