import { screenSizes } from 'configuraciones/VariablesEstaticasGlobales'
import styled from 'styled-components'

export const Adjuntar = styled.input`
  color: transparent;
  margin-top: 1.5em;
  ::-webkit-file-upload-button {
    visibility: hidden;
  }
  ::before {
    content: 'Seleccionar archivo';
    justify-content: center;
    display: flex;
    background: #e7f5ff;
    border-radius: var(--radius-3);
    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
    cursor: pointer;
    padding: 0.5em;
    color: #228be6;
    font-size: var(--label);
    font-weight: var(--font-semibold);
    font-family: var(--font-family-secondary);
  }
  :hover::before {
    border-color: black;
  }
  :active {
    outline: 0;
  }
  :active::before {
    background: var(--color-add-cyan-1);
  }
  :disabled::before {
    background: var(--gray-6);
  }
`

export const AdjuntarArchivo = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: var(--space-fluid-3);
  color: var(--gray-0);
  width: 100%;
`

export const ContenedorAdjunto = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 2em;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5em;
  /* height: 30%; */
  border: 2px dotted var(--gray-5);
  border-radius: var(--radius-3);
  border-style: dashed;
  width: 70%;
  text-align: center;
  :hover {
    background: var(--surface-third);
  }

  @media ${screenSizes.movil} {
    width: -webkit-fill-available;
    text-align: justify;
    padding: 0.5em;
    margin: 1em 0em;
    height: 40%;
  }
`

export const ContControles = styled.div`
  display: flex;
  flex-direction: row;
  gap: var(--gaps-3);
  width: 75%;
  justify-content: center;
  @media ${screenSizes.movil} {
    margin: 0;
    padding: 0;
  }
  flex-wrap: wrap;
`

export const Contenedor = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  width: -webkit-fill-available;
  height: 100%;
  gap: 1em;
  align-items: center;
`
export const ContenedorErrores = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  width: 100%;
  height: 100%;
  gap: 1em;
  ::-webkit-scrollbar {
    width: 0.5em;
  }
  ::-webkit-scrollbar-track {
    background: var(--gray-4);
    margin: 1em;
  }
  ::-webkit-scrollbar-thumb {
    background: var(--gray-4);
    border-radius: var(--radius-round);
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--brand-primary);
  }
`

export const TituloDescarga = styled.h1`
  font-size: (var(--titulo));
  font-weight: var(--font-medium);
  font-family: var(--font-family-primary);
  padding: 1em;
  color: var(--color-primary-text);
  text-decoration: none;
`
export const ContDescarga = styled.a`
  font-size: calc(var(--titulo) * 2);
  font-weight: var(--font-medium);
  font-family: var(--font-family-primary);
  color: var(--color-primary-text);
  text-decoration: none;
  padding: var(--gaps-3, 16px);
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: var(--gaps-2, 8px);
  border-radius: var(--radius-2, 5px);
  border: 1px solid var(--surface-third, #ced4da);
  background: var(--surface-first, #f8f9fa);
  :hover {
    background: var(--surface-third, #f8f9fa);
  }
`

export const ContDescargaPlantilla = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  color: var(--color-primary-text);
  border-radius: var(--radius-3, 10px);
  padding: var(--gaps-2, 8px) var(--gaps-3, 16px);
  gap: var(--gaps-2, 8px);
  background: var(--surface-second, #f8f9fa);
  width: 75%;
  align-items: center;
  justify-content: center;
`
