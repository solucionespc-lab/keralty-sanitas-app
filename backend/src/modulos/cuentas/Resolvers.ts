import { actualizarUsuario } from './resolvers/Mutations';

const CuentaResolver = {
  Mutation: {
    updateCuenta: actualizarUsuario,
  },
};

export default CuentaResolver;
