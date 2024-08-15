import styled from 'styled-components';
import { zoomIn } from 'comunes/estilos/Animaciones';

import { screenSizes } from '../../../../../../../../configuraciones/VariablesEstaticasGlobales';

export const Details = styled.div`
  width: 100%;
  /* cursor: pointer; */
  font-size: var(--etiqueta);
  font-family: var(--font-family-primary);
`;
export const Summary = styled.summary`
  font-size: var(--etiqueta);
  font-family: var(--font-family-primary);
  font-weight: var(--font-medium);
  margin-bottom: 0.5em;
  margin-left: calc(var(--icons-size) + 0.5em);
  color: var(--color-add-red-7);
`;
export const TarjetaError = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: flex-start;
  border: 1px solid transparent;
  background-color: var(--gray-0);
  box-shadow: 4px 3px 5px hsl(0deg 0% 80%);
  border-radius: var(--radius-3);
  width: 100%;
  height: 12em;
  padding: 0.5em;
  margin-bottom: 1.5em;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
  transition: clip-path 2s ease-in-out;
  animation: ${zoomIn} 0.3s ease-in-out;

  @media (min-width: 48em) {
    ::-webkit-scrollbar {
      width: 0.5em;
    }
    ::-webkit-scrollbar-track {
      margin: 1em;
    }
    ::-webkit-scrollbar-thumb {
      background: var(--gray-4);
      border-radius: var(--radius-round);
    }
    ::-webkit-scrollbar-thumb:hover {
      background: var(--gray-4);
      background-color: var(--brand-primary);
    }
  }
`;

export const ItemLista = styled.li`
  display: flex;
  flex-direction: row;
  font-size: var(--parrafo);
  font-family: var(--font-family-primary);
  gap: 0.5em;
  text-align: 'justify';
  ::marker {
    content: '✖️';
  }
`;

export const Listado = styled.ul`
  list-style-position: inherit;
  padding: 0.5em 0em;
`;

export const Close = styled.svg.attrs(() => ({
  viewBox: '0 0 24 24',
  x: '0px',
  y: '0px',
  xmlns: 'http://www.w3.org/2000/svg',
}))`
  width: var(--icons-size);
  height: var(--icons-size);
  strokewidth: 2px;
  stroke: var(--color-add-19);
  transform: rotate(0deg);
  transition: transform 0.5s var(--ease-5);

  @media ${screenSizes.escritorio} {
    :hover {
      transform: rotate(360deg);
      transition: all 0.5s var(--ease-5);
    }
  }
`;
