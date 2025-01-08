import { gql } from '@apollo/client';

export const GET_ACTAS = gql`
  query GetActas($idEmpresa: ID!, $filtros: FiltrosActasInput) {
    getActas(idEmpresa: $idEmpresa, filtros: $filtros) {
      id
      numeroSds
      fechaEjecucion
      nombreEmpresa
      actividades {
        total
        nombre
        horas
        horasInforme
      }
      estado
    }
  }
`;

export const GET_ACTA = gql`
  query GetActa($idEmpresa: ID!, $idActa: ID!) {
    getActa(idEmpresa: $idEmpresa, idActa: $idActa) {
      id
      idEmpresa
      numeroSds
      poliza
      fechaEjecucion
      nombreEmpresa
      nit
      direccion
      telefono
      correo
      modalidad
      asistentes {
        nombre
        cargo
        telefono
      }
      actividades {
        total
        nombre
        horas
        horasInforme
      }
      compromisos {
        descripcion
        responsable
        fecha
      }
      desplazamiento
      descDesplazamiento
      evaluacionActividad
      motivoIncumplimiento
      responsableArl
      responsableEmpresa
      estado
    }
  }
`;
