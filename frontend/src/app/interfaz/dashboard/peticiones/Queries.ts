import { gql } from '@apollo/client';

export const MODULOS_ACCESO = gql`
  query getConfiguraciones {
    getConfiguraciones {
      acciones {
        aplicacion
        infraestructura
      }
      modulos {
        descripcion
        titulo
        url
        subGrupo
        responsable
        imagen
        estaActivo
        llaveModulo
      }
      listas
    }
  }
`;
