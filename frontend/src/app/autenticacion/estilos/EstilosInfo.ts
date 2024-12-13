import styled from 'styled-components';
import { screenSizes } from 'configuraciones/VariablesEstaticasGlobales';
// import Fondo from 'assets/fondo-login.webp';

export const Informacion = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;

  @media ${screenSizes.escritorio} {
    max-width: 500px;
    border-radius: var(--radius-3);
  }
`;

export const DescCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  border-right: 1px solid var(--surface-third);
  background-color: var(--surface-second);
`;

export const Company = styled.img`
  display: none;
  width: 100%;

  @media ${screenSizes.escritorio} {
    display: inline-block;
    max-width: 380px;
    padding: var(--space-fluid-2) 0 0;
  }
`;

export const Ilustraciones = styled.img`
  width: 100%;
  max-width: 300px;
  border-radius: var(--radius-4);

  @media ${screenSizes.escritorio} {
    max-width: 450px;
    padding: var(--space-fluid-2) 0 0;
  }
`;

export const AuthQR = styled.img`
  width: 100%;
  max-width: 150px;
  border-radius: var(--radius-4);

  @media ${screenSizes.escritorio} {
    max-width: 450px;
    padding: var(--space-fluid-2) 0 0;
  }
`;

export const ProveedorContenedor = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

export const ProveedorBoton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-fluid-3);
  margin: var(--space-fluid-2);
  border-radius: var(--radius-3);
  border: 2px solid var(--surface-fourth);
  color: var(--color-primary-text);
  transition: background-color 0.15s ease-in-out;
  box-shadow: var(--shadow-3);

  @media ${screenSizes.escritorio} {
    :hover {
      background-color: var(--gray-4);
      color: var(--color-black);
      transition: background-color 0.2s ease-in-out;
    }
  }

  :active {
    transform: scale(0.98);
  }
`;

export const IconoBoton = styled.img`
  max-width: var(--icons-size);
  user-select: none;
  margin-right: var(--gaps-2);
`;

export const ParrafoBoton = styled.p`
  font-size: var(--title);
  user-select: none;
`;
