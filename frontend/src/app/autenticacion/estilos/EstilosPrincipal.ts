import styled from 'styled-components';
import { screenSizes } from 'configuraciones/VariablesEstaticasGlobales';
import { entrada } from 'comunes/estilos/Animaciones';

export const ContenedorLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: var(--surface-second);
`;

export const TarjetaLogin = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-3);
  box-shadow: var(--shadow-5);
  background-color: var(--base);
  overflow: hidden;
  margin: var(--space-fluid-2);

  @media ${screenSizes.escritorio} {
    flex-direction: row;
    max-width: 65vw;
    height: 80%;
  }
`;

export const ContenedorFormulario = styled.div`
  position: relative;

  @media ${screenSizes.escritorio} {
    display: flex;
    flex-direction: column;
    padding: 0;
    height: 100%;
  }
`;

export const Opciones = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;

export const MetodosAuth = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: var(--gaps-3);
  width: 100%;
`;

export const Opcion = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--color-primary-text);
  background-color: var(--surface-second);
  font-size: var(--paragraph);
  padding: var(--space-fluid-3);
  border-radius: var(--radius-round);
  transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
  height: 100%;

  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: none;

  :hover {
    background-color: var(--brand-1);
    transition: all 0.2s ease-in-out;

    small {
      display: block;
      opacity: 0.9;
      transition: opacity 0.25s 0.2s ease-in-out;
    }

    svg {
      fill: var(--color-white);
    }
  }

  :focus {
    color: var(--color-white);
    background-color: var(--brand-1);
    transition: all 0.15s ease-in-out;

    small {
      display: block;
      opacity: 0.9;
      transition: opacity 0.2s ease-in-out;
    }

    svg {
      fill: var(--color-white);
    }
  }
`;

export const TooltipMethods = styled.small`
  position: absolute;
  top: 0;
  left: 0;
  width: fit-content;
  padding: var(--space-fluid-3);
  border-radius: var(--radius-2);
  color: var(--color-white);
  background-color: var(--color-black);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease-in-out;
  transform-origin: 0 0;
  transform: translate(-16%, -110%);
`;

export const Volver = styled.svg.attrs(() => ({
  viewBox: '0 0 24 24',
  x: '0px',
  y: '0px',
  xmlns: 'http://www.w3.org/2000/svg',
  fill: 'none',
}))`
  position: absolute;
  top: 0;
  left: 3%;
  background-color: var(--surface-third);
  box-shadow: var(--shadows);
  outline: none;
  border-radius: 50px;
  padding: 0.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(var(--icons-size) * 1.6);
  height: calc(var(--icons-size) * 1.6);
  animation: ${entrada} 0.2s cubic-bezier(0.09, 0.63, 0.32, 1.05);

  cursor: pointer;
  -webkit-tap-highlight-color: none;

  :active {
    transform: scale(90%);
  }
`;

export const MethodsIcons = styled.svg.attrs(() => ({
  viewBox: '0 0 24 24',
  x: '0px',
  y: '0px',
  xmlns: 'http://www.w3.org/2000/svg',
}))`
  width: calc(var(--icons-size) * 1.2);
  height: calc(var(--icons-size) * 1.2);
  fill: var(--color-primary-text);

  -webkit-tap-highlight-color: none;
`;
