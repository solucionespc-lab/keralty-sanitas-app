import { gql } from '@apollo/client';

export const GET_EMPRESAS = gql`
  query GetEmpresas($filtros: FiltrosInput) {
    getEmpresas(filtros: $filtros) {
      nit
      nombre
      activo
      responsables {
        nombre
        cargo
        telefono
        correo
        usuarioActivo
      }
    }
  }
`;

export const GET_EMPRESA = gql`
  query GetEmpresa($idEmpresa: String!) {
    getEmpresa(id: $idEmpresa) {
      nit
      nombre
      activo
      responsables {
        nombre
        cargo
        telefono
        correo
        usuarioActivo
      }
    }
  }
`;
