import { gql } from 'graphql-tag';

const TrabajadoresSchema = gql`
  type Trabajador {
    idTrabajador: ID
    cedula: Int
    nombre: String
    fechaNacimiento: String
    genero: String
    estadoCivil: String
    cargoActual: String
    procesoActual: String
    turnoActual: String
    gerencia: String
    numHijos: Int
    nivelEducativo: String
    profesion: String
    fechaIngresoEmp: String
    fechaRetiroEmp: String
    historiaOcupacional: [Ocupacional]
    nombreContacto: String
    numContacto: String
    grupoSanguineo: String
    rh: String
    esBrigadista: Boolean
    temaBrigada: String
    activo: Boolean
  }

  input InputOcupacional {
    id: ID
    fechaIngresoCargo: String
    fechaRetiroCargo: String
    fechaRetiroEmp: String
    idTrabajador: String
    fechaIngresoEmp: String
    genero: String
    cargo: String
    gerencia: String
    proceso: String
    turno: String
    jefeInmediato: String
    tipoContrato: String
    correo: String
  }

  type Ocupacional {
    id: ID
    fechaIngresoCargo: String
    fechaRetiroCargo: String
    fechaRetiroEmp: String
    idTrabajador: String
    fechaIngresoEmp: String
    genero: String
    cargo: String
    gerencia: String
    proceso: String
    correo: String
    turno: String
    jefeInmediato: String
    tipoContrato: String
  }

  input InputTrabajador {
    idTrabajador: String
    cedula: Int
    nombre: String
    fechaNacimiento: String
    fechaIngresoEmp: String
    fechaRetiroEmp: String
    genero: String
    estadoCivil: String
    nivelEducativo: String
    gerencia: String
    cargoActual: String
    procesoActual: String
    turnoActual: String
    profesion: String
    historiaOcupacional: [InputOcupacional]
    nombreContacto: String
    numContacto: String
    numHijos: Int
    grupoSanguineo: String
    rh: String
    esBrigadista: Boolean
    temaBrigada: String
    activo: Boolean
  }

  input InputTrabajadorImport {
    cedula: Int
    nombre: String
    fechaNacimiento: String
    fechaIngresoEmp: String
    fechaRetiroEmp: String
    genero: String
    estadoCivil: String
    nivelEducativo: String
    gerencia: String
    cargoActual: String
    procesoActual: String
    turnoActual: String
    fechaIngresoCargo: String
    fechaRetiroCargo: String
    correo: String
    tipoContrato: String
    jefeInmediato: String
    profesion: String
    nombreContacto: String
    numContacto: String
    numHijos: Int
    grupoSanguineo: String
    rh: String
  }

  input InputFiltrosTrabajadores {
    cedula: Int!
    gerencia: String!
    procesoActual: String!
    cargoActual: String!
    genero: String!
    nivelEducativo: String!
    profesion: String!
    turnoActual: String!
  }
  type SubOcupacional {
    label: String
    value: Int
  }

  type GrupoGenero {
    femenino: [SubOcupacional]
    masculino: [SubOcupacional]
  }

  input InputFiltroInformeOcupacional {
    gerenciasDeUsuario: [String]
    gerencia: String
    year: Int
  }

  type InformeOcupacional {
    antiguedad: GrupoGenero
    cargo: [SubOcupacional]
    proceso: [SubOcupacional]
    gerencia: [SubOcupacional]
    tipoContrato: [SubOcupacional]
    turno: [SubOcupacional]
    tipoGerencia: String
    totalTrabajadores: Int
    year: Int
  }

  type InformeSociodemografico {
    edad: GrupoGenero
    estadoCivil: [SubOcupacional]
    numHijos: [SubOcupacional]
    nivelEducativo: [SubOcupacional]
    profesion: [SubOcupacional]
    totalTrabajadores: Int
    tipoGerencia: String
    year: Int
  }

  ## medidas de resumen

  type MedidaVariacion {
    general: Int!
    masculino: Int!
    femenino: Int!
  }

  type MedidaCentral {
    label: String!
    datos: CentralDatos!
  }

  type CentralDatos {
    general: String!
    masculino: String!
    femenino: String!
  }

  type MedidaDispersion {
    label: String!
    datos: DispersionDatos!
  }

  type DispersionDatos {
    general: Int!
    masculino: Int!
    femenino: Int!
  }

  type MedidaPosicion {
    label: String!
    datos: PosicionDatos!
  }

  type PosicionDatos {
    general: Float!
    masculino: Float!
    femenino: Float!
  }

  type MedidaEdad {
    variacion: MedidaVariacion!
    central: MedidaCentral!
    dispersion: [MedidaDispersion!]!
    posicion: [MedidaPosicion!]!
  }

  type MedidaAntiguedad {
    variacion: MedidaVariacion!
    central: MedidaCentral!
    dispersion: [MedidaDispersion!]!
    posicion: [MedidaPosicion!]!
  }

  type MedidasDeResumen {
    edad: MedidaEdad!
    antiguedad: MedidaAntiguedad!
    totalTrabajadores: Int!
  }

  input InputFiltroSociodemograficoYResumen {
    gerenciasDeUsuario: [String]
    gerencia: String
    proceso: String
    cargo: String
    turno: String
    year: Int!
  }

  type RespuestaImport {
    exitos: Int
    fallos: [String]
  }

  extend type Query {
    getTrabajadores(filtros: InputFiltrosTrabajadores!): [Trabajador]
    getInformeOcupacional(
      filtrosInforme: InputFiltroInformeOcupacional
    ): InformeOcupacional
    getInformeSociodemografico(
      filtrosInforme: InputFiltroSociodemograficoYResumen
    ): InformeSociodemografico
    getTrabajador(id: ID!): Trabajador
    getResumen(
      filtrosResumen: InputFiltroSociodemograficoYResumen
    ): MedidasDeResumen
  }

  extend type Mutation {
    saveTrabajador(input: InputTrabajador!): String
    trabajadoresAlistas(lista: [String]): String
    importTrabajadores(
      primeraCedula: Int
      ultimaCedula: Int
      input: [InputTrabajadorImport!]!
    ): RespuestaImport
    updateTrabajador(input: InputTrabajador, idTrabajador: ID!): String
  }
`;

export default TrabajadoresSchema;
