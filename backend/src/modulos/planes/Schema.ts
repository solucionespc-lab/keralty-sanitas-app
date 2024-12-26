import { gql } from 'graphql-tag';

const PlanesAccionSchema = gql`
  type PlanType {
    origen: String
    idPlan: String
    fechaCompromiso: String
    fechaEjecucion: String
    descripcion: String
    responsables: String
  }

  extend type Query {
    getPlanesAccion(filtros: FiltrosPlanesInput, idEmpresa: String!): [PlanType]
  }

  extend type Mutation {
    savePlanesAccion(PlanesAccionInput: PlanesInput): String
  }
`;

export default PlanesAccionSchema;
