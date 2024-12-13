import { gql } from 'graphql-tag';

const BOUsuarioSchema = gql`
  enum GrupoType {
    propietario
    soporte
  }

  input UsuarioInput {
    uid: String
    email: String!
    emailVerified: Boolean!
    nombre: String!
    tokens: [String]
    customClaims: ClaimsInput!
  }

  input ClaimsInput {
    grupo: GrupoType
    rol: String
    organizacion: String
    permisos: String
    firma: String
    idEmpresa: String
  }

  type Usuario {
    uid: String
    email: String
    emailVerified: Boolean
    nombre: String
    tokens: [String]
    customClaims: Claims
    fechaCreacion: String
    activo: Boolean
  }

  type Claims {
    grupo: GrupoType
    rol: String
    organizacion: String
    permisos: String
    firma: String
    idEmpresa: String
  }

  extend type Query {
    getUsuarios: [Usuario]
    getUsuario(id: String!): Usuario
  }

  extend type Mutation {
    saveUsuario(input: UsuarioInput): String
    updateUsuario(input: UsuarioInput): String
    deletePlanesVacios: String
  }
`;

export default BOUsuarioSchema;
