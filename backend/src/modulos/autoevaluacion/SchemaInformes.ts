import { gql } from 'graphql-tag';

const InformesAutoSchema = gql`
  type ResultadoType {
    idPregunta: String
    ponderacion: Float
    estandar: String
  }

  type InformeType {
    amenazas: [ResultadoType]
    salud: [ResultadoType]
    peligros: [ResultadoType]
    integral: [ResultadoType]
    mejoramiento: [ResultadoType]
    recursos: [ResultadoType]
  }
`;

export default InformesAutoSchema;
