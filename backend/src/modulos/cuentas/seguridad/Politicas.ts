import { allow } from 'graphql-shield';

const cuentasMutationsRules = {
  updateCuenta: allow,
};

export { cuentasMutationsRules };
