import styled from 'styled-components';
import { screenSizes } from 'configuraciones/VariablesEstaticasGlobales';
import { zoomIn } from 'comunes/estilos/Animaciones';

export const FormEstilo = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--gaps-6);
  padding: var(--gaps-4);
  animation: ${zoomIn} 0.3s cubic-bezier(0.09, 0.63, 0.32, 1.05);
  height: inherit;
`;

export const ContainerFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2em;
`;

export const ContainerData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2em;
  width: 100%;

  @media ${screenSizes.escritorio} {
    margin: 0;
  }
`;

export const NombreApp = styled.h1`
  font-size: calc(var(--title) * 1.5);
  text-align: center;
  color: var(--brand-7);
  z-index: var(--layer-1);
  width: fit-content;
`;

export const TituloHerramienta = styled.h1`
  font-size: calc(var(--title) * 2);
  color: var(--brand-primary);
  font-weight: bold;
  text-align: center;
  width: 100%;
`;

export const Descripcion = styled.p`
  font-size: var(--subtitle);
  color: var(--color-primary-text);
  text-align: center;
  margin-top: 1em;
  width: 100%;

  @media ${screenSizes.escritorio} {
    width: 90%;
  }
`;

export const LoginLabels = styled.label`
  color: var(--color-primary-text);
  font-size: calc(var(--subtitle) * 1.2);
  font-weight: bold;
  margin-bottom: 0.5em;
`;

export const Campos = styled.input`
  background-color: var(--color-white);
  border-radius: var(--radius-3);
  border: 1.5px solid var(--brand-secondary);
  outline: none;
  font-size: calc(var(--paragraph) * 1.1);
  padding: var(--space-fluid-4);
  color: var(--color-black);
  background-color: var(--surface-second);
  width: 100%;
  max-width: 300px;

  :not(:placeholder-shown) {
    border: 1.5px solid var(--color-add-2);
    background-color: var(--surface-second);
    color: var(--color-primary-text);
  }

  :focus {
    border: 1.5px solid var(--brand-secondary);
  }
`;

export const CampoToken = styled.textarea`
  background-color: var(--surface-first);
  border-radius: var(--radius-3);
  border: 2px solid var(--brand-secondary);
  outline: none;
  font-size: var(--paragraph);
  padding: var(--space-fluid-4);
  color: var(--color-primary-text);
  height: 8em;
  width: 100%;

  :not(:placeholder-shown) {
    border: 2px solid var(--color-add-2);
    background-color: var(--surface-first);
  }

  :focus {
    border: 2px solid var(--color-add-2);
  }

  @media ${screenSizes.movil} {
    margin-top: 1em;
  }

  @media ${screenSizes.tablet} {
    margin-top: 1em;
  }
`;

export const ButtonStyle = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--radius-2);
  background: #8ce99a;
  font-size: var(--title);
  outline: none;
  border: none;
  padding: 0.5em 1em;

  @media ${screenSizes.escritorio} {
    margin-bottom: 0;
    padding: 0.5em 1em;
  }

  :active {
    transform: scale(0.95);
  }

  user-select: none; /* standard syntax */
  -webkit-user-select: none; /* webkit (safari, chrome) browsers */
  -moz-user-select: none; /* mozilla browsers */
  -khtml-user-select: none; /* webkit (konqueror) browsers */
`;

export const Icon = styled.svg.attrs(() => ({
  viewBox: '0 0 24 24',
  x: '0px',
  y: '0px',
}))`
  width: calc(var(--icons-size) * 1.3);
  height: calc(var(--icons-size) * 1.3);
  fill: var(--color-white);
  margin-right: 0.5em;
`;
