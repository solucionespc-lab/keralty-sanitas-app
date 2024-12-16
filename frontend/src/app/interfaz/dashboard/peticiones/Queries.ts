import { gql } from '@apollo/client';

export const MODULOS_ACCESO = gql`
  query GetConfiguraciones {
    getConfiguraciones {
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
      sidebar_modulos {
        titulo
        url
        llaveModulo
        estaActivo
      }
      version
      acciones {
        aplicacion
        infraestructura
      }
      listas
    }
  }
`;
