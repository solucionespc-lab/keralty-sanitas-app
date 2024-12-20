import { gql } from '@apollo/client';

export const GET_EMPRESA = gql`
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

export const GET_PLANES = gql`
  query GetEvaluaciones($filtros: FiltrosEvaluacionesInput) {
    getEvaluaciones(filtros: $filtros) {
      cuestionario {
        plan
      }
    }
  }
`;
