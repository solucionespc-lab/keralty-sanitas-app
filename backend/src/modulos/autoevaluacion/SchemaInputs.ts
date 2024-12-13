import { gql } from 'graphql-tag';

const EvaluacionesSchemaInputs = gql`
  input FirmaInput {
    nombre: String
    url: String
  }

  input SoportesInput {
    nombre: String
    url: String
  }

  input PreguntaEvaluacionInput {
    codigo: ID
    respuesta: String
    planes: [String]
    soportes: SoportesInput
  }

  input EvaluacionInput {
    id: ID
    idEmpresa: String
    fechaCreacion: String
    puntajeTotal: Float
    calificacion: String
    cuestionario: [PreguntaEvaluacionInput]
    firma: FirmaInput
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
