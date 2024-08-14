import { gql } from 'graphql-tag';

const root = gql`
  type Query {
    raiz: String
  }
  type Mutation {
    raiz: String
  }
`;

export default root;
