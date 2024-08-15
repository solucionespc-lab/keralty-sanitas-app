import { gql } from '@apollo/client';

export const GET_TRABAJADORES = gql`
  query getTrabajadores($filtros: InputFiltrosTrabajadores!) {
    getTrabajadores(filtros: $filtros) {
      idTrabajador
      cedula
      nombre
      gerencia
      fechaIngresoEmp
    }
  }
`;

export const GET_TRABAJADOR = gql`
  query getTrabajador($id: ID!) {
    getTrabajador(id: $id) {
      idTrabajador
      cedula
      nombre
      fechaNacimiento
      genero
      estadoCivil
      cargoActual
      procesoActual
      turnoActual
      gerencia
      numHijos
      nivelEducativo
      profesion
      fechaIngresoEmp
      fechaRetiroEmp
      esBrigadista
      temaBrigada
      historiaOcupacional {
        id
        fechaIngresoCargo
        fechaRetiroCargo
        fechaRetiroEmp
        idTrabajador
        fechaIngresoEmp
        genero
        cargo
        gerencia
        proceso
        correo
        turno
        jefeInmediato
        tipoContrato
      }
      nombreContacto
      numContacto
      grupoSanguineo
      rh
      esBrigadista
      temaBrigada
      activo
    }
  }
`;
