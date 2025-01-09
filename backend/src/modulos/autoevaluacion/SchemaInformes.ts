import { gql } from 'graphql-tag';

const InformesAutoSchema = gql`
  type ResultadoType {
    idPregunta: String
    ponderacion: Float
    estandar: String
  }

  type AutoevaluacionInfoType {
    ciclo: CicloType
    estandar: EstandarType
  }

  type CicloType {
    Actuar: PuntajeType
    Hacer: PuntajeType
    Planear: PuntajeType
    Verificar: PuntajeType
  }

  type EstandarType {
    amenazas: PuntajeType
    integral: PuntajeType
    mejoramiento: PuntajeType
    perligros: PuntajeType
    recursos: PuntajeType
    salud: PuntajeType
    verificacion: PuntajeType
  }

  type PuntajeType {
    puntajeMaximo: Float
    resultado: Float
  }

  type ExcelenciaInfoType {
    compromiso: ResultadoExcelenciaType
    liderazgo: ResultadoExcelenciaType
    objetivos: ResultadoExcelenciaType
    proposito: ResultadoExcelenciaType
    sst: ResultadoExcelenciaType
  }

  type ResultadoExcelenciaType {
    resultadoEsperado: Float
    resultadoObtenido: Float
  }

  type InformeType {
    annio: Int
    idEmpresa: String
    autoevaluacion: AutoevaluacionInfoType
    excelencia: ExcelenciaInfoType
  }
`;

export default InformesAutoSchema;
