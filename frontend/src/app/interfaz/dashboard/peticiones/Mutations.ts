import { gql } from '@apollo/client';

export const ACTUALIZAR_EMPRESA = gql`
  mutation UpdateCuenta($cuentaInput: CuentaInput) {
    updateCuenta(CuentaInput: $cuentaInput)
  }
`;
