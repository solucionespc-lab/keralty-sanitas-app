import { gql } from 'graphql-tag';

const PlanesAccionSchemaInputs = gql`
  input PlanesInput {
    idPlan: String
    idEmpresa: String
    descripcion: String
    fechaCompromiso: String
    fechaEjecucion: String
    responsables: String
  }

  input FiltrosPlanesInput {
    fechaInicio: String
    fechaFin: String
  }
`;

export default PlanesAccionSchemaInputs;
