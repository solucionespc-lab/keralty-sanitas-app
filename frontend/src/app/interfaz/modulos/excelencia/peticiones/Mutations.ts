import { gql } from '@apollo/client';

export const SAVE_EVALUACION = gql`
  mutation SaveEvaluacion($evaluacion: EvaluacionInput) {
    saveEvaluacion(evaluacion: $evaluacion)
  }
`;
