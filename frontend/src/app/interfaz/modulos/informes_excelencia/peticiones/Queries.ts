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

export const GET_INFORME_AUTOEVALUACION = gql`
  query GetInformes($annio: Int, $idEmpresa: String) {
    getInformes(annio: $annio, idEmpresa: $idEmpresa) {
      amenazas {
        idPregunta
        ponderacion
        estandar
      }
      salud {
        idPregunta
        ponderacion
        estandar
      }
      peligros {
        idPregunta
        ponderacion
        estandar
      }
      integral {
        idPregunta
        ponderacion
        estandar
      }
      mejoramiento {
        idPregunta
        ponderacion
        estandar
      }
      recursos {
        idPregunta
        ponderacion
        estandar
      }
    }
  }
`;
