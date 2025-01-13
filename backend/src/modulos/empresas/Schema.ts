import { gql } from 'graphql-tag';

const EmpresaSchema = gql`
  enum TipoEmpresaEnum {
    empresa
    agropecuaria
  }

  # Este enum es equivalente al número de trabajadores de la empresa ej: pequena menos de 10 trabajadores
  enum TamanoEnum {
    pequena
    mediana
    grande
  }

  type Responsables {
    nombre: String
    cargo: String
    telefono: String
    correo: String
    usuarioActivo: Boolean
  }

  type EmpresaType {
    id: ID
    nit: String
    nombre: String
    tipoEmpresa: TipoEmpresaEnum
    riesgo: String
    tamano: TamanoEnum
    activo: Boolean
    fechaAfiliacion: String
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
    tipoEmpresa: TipoEmpresaEnum
    riesgo: String
    tamano: TamanoEnum
    activo: Boolean
    fechaAfiliacion: String
    responsables: [ResponsablesInput]
  }

  input FiltrosInput {
    idEmpresa: String
    riesgo: String
    tamano: String
  }

  extend type Query {
    getEmpresas(filtros: FiltrosInput): [EmpresaType]
    getEmpresa(idEmpresa: String!): EmpresaType
  }

  extend type Mutation {
    saveEmpresa(empresa: EmpresaInput): String
  }
`;

export default EmpresaSchema;
