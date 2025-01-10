import { gql } from '@apollo/client';

export const GUARDAR_PLAN = gql`
  mutation SavePlanesAccion($planesAccionInput: PlanesInput) {
    savePlanesAccion(PlanesAccionInput: $planesAccionInput)
  }
`;
