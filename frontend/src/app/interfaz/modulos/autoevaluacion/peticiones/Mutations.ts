import { gql } from '@apollo/client';

export const SAVE_EVALUACION = gql`
  mutation SaveEvaluacion($evaluacion: EvaluacionInput) {
    saveEvaluacion(evaluacion: $evaluacion)
  }
`;

export const UPDATE_EVALUACION = gql`
  mutation UpdateEvaluacion($evaluacion: EvaluacionUpdateInput) {
    updateEvaluacion(evaluacion: $evaluacion)
  }
`;
