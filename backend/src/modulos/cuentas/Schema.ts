import { gql } from 'graphql-tag';

const CuentaSchema = gql`
  input CuentaInput {
    nombreEmpresa: String
    nombreUsuario: String
    correo: String
    uid: String
    nit: String
  }

  extend type Mutation {
    updateCuenta(CuentaInput: CuentaInput): String
  }
`;

export default CuentaSchema;
