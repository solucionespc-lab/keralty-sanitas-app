import { gql } from 'graphql-tag';

const EvaluacionesSchema = gql`
  type SoportesType {
    nombre: String
    url: String
  }

  type PreguntaEvaluacionType {
    codigo: ID
    respuesta: String
    soportes: [SoportesType]
    observaciones: String
  }

  type EvaluacionType {
    id: ID
    idEmpresa: String
    empresa: EmpresaType
    fechaCreacion: String
    puntajeTotal: Float
    calificacion: String
    cuestionario: [PreguntaEvaluacionType]
    estado: String
    annio: Int
  }

  extend type Query {
    getEvaluacion(filtros: FiltrosEvaluacionesInput): EvaluacionType
    getEvaluaciones(filtros: FiltrosEvaluacionesInput): [EvaluacionType]
    getInformes(annio: Int, idEmpresa: String): [InformeType]
  }

  extend type Mutation {
    saveEvaluacion(evaluacion: EvaluacionInput): String
    updateEvaluacion(evaluacion: EvaluacionUpdateInput): String
  }
`;

export default EvaluacionesSchema;
