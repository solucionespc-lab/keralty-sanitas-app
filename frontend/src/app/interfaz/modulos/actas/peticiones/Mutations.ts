import { gql } from '@apollo/client';

export const GUARDAR_ACTA = gql`
  mutation SaveActa($actasInput: ActasInput) {
    saveActa(ActasInput: $actasInput)
  }
`;
