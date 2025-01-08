import { gql } from '@apollo/client';

export const SAVE_EVALUACION = gql`
  mutation SaveExcelencia($cuestionario: ExcelenciaInput) {
    saveExcelencia(cuestionario: $cuestionario)
  }
`;
