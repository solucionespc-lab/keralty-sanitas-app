import { gql } from '@apollo/client';

export const GET_ACTAS = gql`
  query GetActas($idEmpresa: ID!, $filtros: FiltrosActasInput) {
    getActas(idEmpresa: $idEmpresa, filtros: $filtros) {
      id
      idEmpresa
      proveedor {
        nombre
      }
      numeroSds
      poliza
      fechaEjecucion
      cantidad
      actividadPpal
      estado
    }
  }
`;

export const GET_ACTAS_PROVEEDOR = gql`
  query GetActasProveedor($idProveedor: ID!, $filtros: FiltrosActasInput) {
    getActasProveedor(idProveedor: $idProveedor, filtros: $filtros) {
      id
      idEmpresa
      empresa {
        nombre
      }
      numeroSds
      poliza
      fechaEjecucion
      cantidad
      actividadPpal
      estado
    }
  }
`;

export const GET_ACTA = gql`
  query GetActa($idEmpresa: ID!, $idActa: ID!) {
    getActa(idEmpresa: $idEmpresa, idActa: $idActa) {
      id
      idEmpresa
      idProveedor
      proveedor {
        nit
        nombre
      }
      numeroSds
      poliza
      fechaEjecucion
      modalidad
      actividadPpal
      cantidad
      actividades {
        nombre
        horas
        horasInforme
      }
      asistentes {
        nombre
        cargo
        telefono
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
      responsableCliente
      cargoCliente
      firmaCliente
      responsableProveedor
      cargoProveedor
      firmaProveedor
      resultado
      estado
      empresa {
        nit
        nombre
      }
    }
  }
`;
