import { gql } from 'graphql-tag';

const ActasSchema = gql`
  type AsistenteType {
    nombre: String
    cargo: String
    telefono: String
  }

  type ActividadesType {
    total: Int
    nombre: String
    horas: Int
    horasInforme: Int
  }

  type CompromisosType {
    descripcion: String
    responsable: String
    fecha: String
  }

  type ActasType {
    id: ID
    idEmpresa: ID
    numeroSds: String
    poliza: String
    fechaEjecucion: String
    nombreEmpresa: String
    nit: String
    direccion: String
    telefono: String
    correo: String
    modalidad: String
    asistentes: [AsistenteType]
    actividades: [ActividadesType]
    compromisos: [CompromisosType]
    desplazamiento: Boolean
    descDesplazamiento: String
    evaluacionActividad: String
    motivoIncumplimiento: String
    responsableArl: String
    responsableEmpresa: String
    estado: String
  }

  input AsistenteInput {
    nombre: String
    cargo: String
    telefono: String
  }

  input ActividadesInput {
    total: Int
    nombre: String
    horas: Int
    horasInforme: Int
  }

  input CompromisosInput {
    descripcion: String
    responsable: String
    fecha: String
  }

  input ActasInput {
    id: ID
    idEmpresa: ID
    numeroSds: String
    poliza: String
    fechaEjecucion: String
    nombreEmpresa: String
    nit: String
    direccion: String
    telefono: String
    correo: String
    modalidad: String
    asistentes: [AsistenteInput]
    actividades: [ActividadesInput]
    compromisos: [CompromisosInput]
    desplazamiento: Boolean
    descDesplazamiento: String
    evaluacionActividad: String
    motivoIncumplimiento: String
    responsableArl: String
    responsableEmpresa: String
    estado: String
  }

  input FiltrosActasInput {
    fechaInicio: String
    fechaFin: String
    estado: String
  }

  extend type Query {
    getActas(idEmpresa: ID!, filtros: FiltrosActasInput): [ActasType]
    getActa(idEmpresa: ID!, idActa: ID!): ActasType
  }

  extend type Mutation {
    saveActa(ActasInput: ActasInput): String
    updateActa(ActasInput: ActasInput): String
  }
`;

export default ActasSchema;
