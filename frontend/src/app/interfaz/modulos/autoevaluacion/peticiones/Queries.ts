import { gql } from '@apollo/client';

export const GET_EVALUACIONES = gql`
  query GetEvaluaciones($filtros: FiltrosEvaluacionesInput) {
    getEvaluaciones(filtros: $filtros) {
      id
      idEmpresa
      fechaCreacion
      puntajeTotal
      calificacion
      annio
      estado
      empresa {
        nombre
      }
    }
  }
`;

export const GET_EVALUACION = gql`
  query GetEvaluacion($filtros: FiltrosEvaluacionesInput) {
    getEvaluacion(filtros: $filtros) {
      id
      idEmpresa
      estado
      puntajeTotal
      fechaCreacion
      calificacion
      empresa {
        nit
        nombre
        tipoEmpresa
        riesgo
        tamano
      }
      cuestionario {
        codigo
        respuesta
        observaciones
        soportes {
          nombre
          url
        }
      }
    }
  }
`;

export const GET_EMPRESA_AUTOEVALUACION = gql`
  query GetEmpresa($idEmpresa: String!) {
    getEmpresa(idEmpresa: $idEmpresa) {
      nit
      nombre
      tipoEmpresa
      riesgo
      tamano
    }
  }
`;
