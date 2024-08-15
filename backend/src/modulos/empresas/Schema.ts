import { gql } from 'graphql-tag';

const EmpresaSchema = gql`
  type Responsables {
    nombre: String
    cargo: String
    telefono: String
    correo: String
    usuarioActivo: Boolean
  }

  type Empresa {
    nit: String
    nombre: String
    activo: Boolean
    responsables: [Responsables]
  }

  input ResponsablesInput {
    nombre: String
    cargo: String
    telefono: String
    correo: String
    usuarioActivo: Boolean
  }

  input EmpresaInput {
    nit: String
    nombre: String
    activo: Boolean
    responsables: [ResponsablesInput]
  }

  input FiltrosInput {
    nombre: String
    nit: String
  }

  extend type Query {
    getEmpresas(filtros: FiltrosInput): [Empresa]
    getEmpresa(idEmpresa: String!): Empresa
  }

  extend type Mutation {
    saveEmpresa(empresa: EmpresaInput): String
  }
`;

export default EmpresaSchema;
