import styled from 'styled-components';

export const ContenedorPlantilla = styled.div`
  display: flex;
  height: 400px;
  max-height: 400px;
  width: 100%;
`;

export const ContenedorExcel = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100%;
  overflow-y: auto;
  overflow-x: auto;
  width: 100%;
  ::-webkit-scrollbar {
    width: 0.5em;
  }
  ::-webkit-scrollbar-track {
    background: var(--surface-second);

    margin: 1em;
  }
  ::-webkit-scrollbar-thumb {
    background: var(--gray-4);
    border-radius: var(--radius-round);
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--brand-primary);
  }
`;
export const ContenedorBotones = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1em;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 100%;
`;
