import { gql } from 'graphql-tag';

const EvaluacionesSchema = gql`
  type SoportesType {
    nombre: String
    url: String
  }

  type PreguntaEvaluacionType {
    codigo: ID
    respuesta: String
    plan: String
    soportes: [SoportesType]
  }

  type EvaluacionType {
    id: ID
    idEmpresa: String
    empresa: EmpresaType
    fechaCreacion: String
    puntajeTotal: Float
    calificacion: String
    cuestionario: [PreguntaEvaluacionType]
    observaciones: String
    annio: Int
  }

  extend type Query {
    getEvaluacion(filtros: FiltrosEvaluacionesInput): EvaluacionType
    getEvaluaciones(filtros: FiltrosEvaluacionesInput): [EvaluacionType];
  }

  extend type Mutation {
    saveEvaluacion(evaluacion: EvaluacionInput): String
    updateEvaluacion(evaluacion: EvaluacionInput): String
  }
`;

export default EvaluacionesSchema;
