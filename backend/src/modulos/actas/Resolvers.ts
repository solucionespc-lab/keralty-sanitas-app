import { guadarActas } from './resolvers/Mutations';
import {
  traerActa,
  traerActas,
  traerActasProveedor,
  traerDatosEmpresa,
  traerDatosProveedor,
} from './resolvers/Queries';

const ActasResolver = {
  Query: {
    getActas: traerActas,
    getActa: traerActa,
    getActasProveedor: traerActasProveedor,
  },
  Mutation: {
    saveActa: guadarActas,
    updateActa: () => console.log('saveActas'),
  },
  ActasType: {
    empresa: traerDatosEmpresa,
    proveedor: traerDatosProveedor,
  },
};

export default ActasResolver;
