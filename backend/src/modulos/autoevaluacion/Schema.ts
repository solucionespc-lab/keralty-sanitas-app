import { gql } from 'graphql-tag';

const EvaluacionesSchema = gql`
  type FirmaType {
    nombre: String
    url: String
  }

  type SoportesType {
    nombre: String
    url: String
  }

  type PreguntaEvaluacionType {
    codigo: ID
    respuesta: String
    planes: [String]
    soportes: SoportesType
  }

  type EvaluacionType {
    id: ID
    idEmpresa: String
    empresa: EmpresaType
    fechaCreacion: String
    puntajeTotal: Float
    clasificacion: String
    cuestionario: [PreguntaEvaluacionType]
    firma: FirmaType
    annio: Int
  }

  extend type Mutation {
    saveEvaluacion(evaluacion: EvaluacionInput): String
    updateEvaluacion(evaluacion: EvaluacionInput): String
  }

  extend type Query {
    getEvaluacion(filtros: FiltrosEvaluacionesInput): EvaluacionType
    getEvaluaciones(filtros: FiltrosEvaluacionesInput): [EvaluacionType]
  }
`;

export default EvaluacionesSchema;
