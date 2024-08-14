import styled, { Keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { screenSizes } from 'configuraciones/VariablesEstaticasGlobales';
import { entrada, salida } from 'comunes/estilos/Animaciones';

import { IConfig } from '../types/SidebarTypes';

export const ModuleContainer = styled.div<IConfig>`
  display: flex;
  flex-wrap: wrap;
  opacity: ${({ open }): number => (open ? 1 : 0)};
  background-color: var(--surface-first);
  margin: 0.5em;
  border-radius: var(--radius-3);

  @media ${screenSizes.movil} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    position: absolute;
    bottom: ${({ open }): string => (open ? '100%' : '0')};
    width: 100%;
    box-sizing: border-box;
    z-index: ${({ open }): string => (open ? '2' : '0')};
    transition: all 0.35s cubic-bezier(0.66, 1.48, 0.93, 0.9);
  }

  @media ${screenSizes.tablet} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    position: absolute;
    bottom: ${({ open }): string => (open ? '100%' : '0')};
    width: 100%;
    box-sizing: border-box;
    z-index: ${({ open }): string => (open ? '2' : '0')};
    transition: all 0.35s cubic-bezier(0.66, 1.48, 0.93, 0.9);
  }

  @media ${screenSizes.escritorio} {
    justify-content: flex-start;
    flex-direction: column;
    overflow-y: auto;
    padding: ${({ open }): string => (open ? '0 var(--gaps-2)' : '0')};
    width: ${({ open }): string => (open ? '12vmax' : '0')};
    transition: width 0.35s cubic-bezier(0.66, 1.48, 0.93, 0.9);
  }
`;

export const ModuleSection = styled(Link)<{
  open: boolean;
}>`
  display: flex;
  align-items: center;
  gap: var(--gaps-2);
  border-radius: var(--radius-2);
  padding: 0.5em;
  box-sizing: border-box;
  text-decoration: none;
  opacity: ${({ open }) => (open ? 1 : 0)};
  width: 100%;

  animation: ${({ open }): Keyframes => (open ? entrada : salida)} 0.5s
    cubic-bezier(0.075, 0.82, 0.165, 1) forwards;

  -webkit-tap-highlight-color: transparent;

  :active {
    text-decoration: none;
    transform: scale(0.95);
  }

  @media ${screenSizes.escritorio} {
    cursor: pointer;

    :hover {
      background-color: var(--surface-second);

      small {
        color: var(--brand-primary);
      }
    }
  }
`;

export const TitleModule = styled.p`
  display: none;
  text-align: center;
  font-size: var(--subtitle);
  font-weight: bold;
  color: var(--brand-primary);
  margin: 0.25em 0em;

  @media ${screenSizes.escritorio} {
    display: inline-block;
  }
`;

export const NameModule = styled.small`
  text-align: left;
  font-size: var(--messages);
  color: var(--color-primary-text);
  width: 18ch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ModuleIcon = styled.svg.attrs((props) => ({
  viewBox: '0 0 24 24',
  x: '0px',
  y: '0px',
  xmlns: 'http://www.w3.org/2000/svg',
  style: props.style,
}))`
  width: 24px;
  height: 24px;
  fill: var(--brand-primary);
`;
