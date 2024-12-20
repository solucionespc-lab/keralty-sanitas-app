import { gql } from 'graphql-tag';

const EvaluacionesSchemaInputs = gql`
  input SoportesInput {
    nombre: String
    url: String
  }

  input PreguntaEvaluacionInput {
    codigo: ID
    respuesta: String
    plan: String
    soportes: [SoportesInput]
    observaciones: String
  }

  input EvaluacionInput {
    id: ID
    idEmpresa: String
    fechaCreacion: String
    puntajeTotal: Float
    calificacion: String
    cuestionario: [PreguntaEvaluacionInput]
    observaciones: String
    annio: Int
    empresa: EmpresaInput
  }

  input FiltrosEvaluacionesInput {
    idEvaluacion: String
    idEmpresa: String
    annio: Int
  }
`;

export default EvaluacionesSchemaInputs;
