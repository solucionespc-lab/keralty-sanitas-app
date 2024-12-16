import { gql } from 'graphql-tag';

const ConfigSchema = gql`
  type Acciones {
    aplicacion: [String]
    infraestructura: [String]
  }

  type Modulos {
    descripcion: String
    titulo: String
    url: String
    subGrupo: String
    responsable: String
    imagen: String
    estaActivo: Boolean
    llaveModulo: String
  }

  type Sidebar_modulos {
    titulo: String
    url: String
    llaveModulo: String
    estaActivo: Boolean
  }

  type Configuraciones {
    version: String
    acciones: Acciones
    sidebar_modulos: [Sidebar_modulos]
    modulos: [Modulos]
    listas: String
  }

  extend type Query {
    getConfiguraciones: Configuraciones
  }
`;

export default ConfigSchema;
