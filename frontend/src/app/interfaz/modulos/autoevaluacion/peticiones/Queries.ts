import { gql } from '@apollo/client';

export const GET_EVALUACIONES = gql`
  query GetEvaluaciones($filtros: FiltrosEvaluacionesInput) {
    getEvaluaciones(filtros: $filtros) {
      id
      idEmpresa
      fechaCreacion
      puntajeTotal
      calificacion
      cuestionario {
        codigo
        respuesta
        planes
        soportes {
          nombre
          url
        }
      }
      firma {
        nombre
        url
      }
      empresa {
        nombre
        riesgo
        tamano
        tipoEmpresa
      }
    }
  }
`;

export const GET_EVALUACION = gql`
  query GetEvaluacion($filtros: FiltrosEvaluacionesInput) {
    getEvaluacion(filtros: $filtros) {
      id
      idEmpresa
      fechaCreacion
      puntajeTotal
      calificacion
      cuestionario {
        codigo
        respuesta
        planes
        soportes {
          nombre
          url
        }
      }
      firma {
        nombre
        url
      }
      annio
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
      activo
    }
  }
`;
