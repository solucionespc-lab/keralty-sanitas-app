import { gql } from 'graphql-tag';

const ActasSchema = gql`
  type AsistenteType {
    nombre: String
    cargo: String
    telefono: String
  }

  type ActividadesType {
    nombre: String
    horas: Int
    horasInforme: Int
  }

  type CompromisosType {
    descripcion: String
    responsable: String
    fecha: String
  }

  type ProveedorType {
    id: ID
    nit: String
    nombre: String
  }

  type ActasType {
    id: ID
    idEmpresa: ID
    idProveedor: ID
    proveedor: ProveedorType
    numeroSds: String
    poliza: String
    fechaEjecucion: String
    modalidad: String
    actividadPpal: String
    cantidad: Int
    actividades: [ActividadesType]
    asistentes: [AsistenteType]
    compromisos: [CompromisosType]
    desplazamiento: Boolean
    descDesplazamiento: String
    evaluacionActividad: String
    motivoIncumplimiento: String
    responsableCliente: String
    cargoCliente: String
    firmaCliente: String
    responsableProveedor: String
    cargoProveedor: String
    firmaProveedor: String
    resultado: String
    estado: String
    empresa: EmpresaType
  }

  input AsistenteInput {
    nombre: String
    cargo: String
    telefono: String
  }

  input ActividadesInput {
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
    idProveedor: ID
    numeroSds: String
    poliza: String
    fechaEjecucion: String
    modalidad: String
    actividadPpal: String
    cantidad: Int
    actividades: [ActividadesInput]
    compromisos: [CompromisosInput]
    asistentes: [AsistenteInput]
    desplazamiento: Boolean
    descDesplazamiento: String
    evaluacionActividad: String
    motivoIncumplimiento: String
    responsableCliente: String
    cargoCliente: String
    firmaCliente: String
    responsableProveedor: String
    cargoProveedor: String
    firmaProveedor: String
    resultado: String
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
    getActasProveedor(idProveedor: ID!, filtros: FiltrosActasInput): [ActasType]
  }

  extend type Mutation {
    saveActa(ActasInput: ActasInput): String
    updateActa(ActasInput: ActasInput): String
  }
`;

export default ActasSchema;
