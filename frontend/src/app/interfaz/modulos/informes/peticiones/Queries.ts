import { gql } from '@apollo/client';

export const GET_PLANES = gql`
  query GetPlanesAccion($filtros: FiltrosPlanesInput, $idEmpresa: String!) {
    getPlanesAccion(filtros: $filtros, idEmpresa: $idEmpresa) {
      responsables
      fechaCompromiso
      fechaEjecucion
      descripcion
      idPlan
    }
  }
`;
