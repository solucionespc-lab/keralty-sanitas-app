import { gql } from '@apollo/client';

export const GET_EVALUACIONES_EXCELENCIA = gql`
  query GetExcelencia($idEmpresa: String!, $filtros: FiltrosExcelenciaInput) {
    getExcelencia(idEmpresa: $idEmpresa, filtros: $filtros) {
      id
      fechaCreacion
      puntajeTotal
      calificacion
      empresa {
        nombre
        riesgo
      }
    }
  }
`;

export const GET_EMPRESA_EXCELENCIA = gql`
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
