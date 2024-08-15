import { gql } from '@apollo/client';

export const SAVE_TRABAJADOR = gql`
  mutation saveTrabajador($input: InputTrabajador!) {
    saveTrabajador(input: $input)
  }
`;

export const UPDATE_TRABAJADOR = gql`
  mutation UpdateTrabajador($idTrabajador: ID!, $input: InputTrabajador) {
    updateTrabajador(idTrabajador: $idTrabajador, input: $input)
  }
`;

export const SAVE_IMPORTAR = gql`
  mutation ImportTrabajadores(
    $primeraCedula: Int
    $ultimaCedula: Int
    $input: [InputTrabajadorImport!]!
  ) {
    importTrabajadores(
      primeraCedula: $primeraCedula
      ultimaCedula: $ultimaCedula
      input: $input
    ) {
      exitos
      fallos
    }
  }
`;
