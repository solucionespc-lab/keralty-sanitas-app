import { gql } from 'graphql-tag';

const ExcelenciaSchema = gql`
  type ContenidoType {
    codigoPregunta: String
    requisito: String
    respuesta: Int
    observaciones: String
    tema: String
  }

  type ExcelenciaType {
    id: ID
    idEmpresa: String
    codigo: String
    objetivo: String
    dimension: Int
    contenido: [ContenidoType]
    fechaCreacion: String
    annio: Int
    puntajeTotal: Float
    calificacion: String
    evaluador: String
    area: String
    empresa: EmpresaType
  }

  input ContenidoInput {
    codigoPregunta: String
    requisito: String
    respuesta: Int
    observaciones: String
    tema: String
  }

  input ExcelenciaInput {
    id: ID
    idEmpresa: String
    codigo: String
    objetivo: String
    dimension: Int
    contenido: [ContenidoInput]
    fechaCreacion: String
    annio: Int
    puntajeTotal: Float
    calificacion: String
    evaluador: String
    area: String
  }

  input FiltrosExcelenciaInput {
    fechaInicio: String
    fechaFin: String
    annio: Int!
  }

  extend type Query {
    getExcelencia(
      filtros: FiltrosExcelenciaInput
      idEmpresa: String!
    ): [ExcelenciaType]
  }

  extend type Mutation {
    saveExcelencia(cuestionario: ExcelenciaInput): String
  }
`;

export default ExcelenciaSchema;
