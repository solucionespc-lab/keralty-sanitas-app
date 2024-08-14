import { gql } from 'graphql-tag';

export const EjmeploSchema = gql`
  type Borrar {
    id: String
  }

  input InputBorrar {
    id: String
  }

  extend type Query {
    getEjemplo(id: String!): Borrar
  }

  extend type Mutation {
    saveEjemplo(input: InputBorrar): String
  }
`;
