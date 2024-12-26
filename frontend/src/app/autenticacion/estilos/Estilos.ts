import styled from 'styled-components';

export const ContenedorGeneral = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: var(--surface-first);
`;

export const Contenedor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  width: 30%;
  background-color: var(--surface-second);
  padding: var(--space-fluid-3);
  border-radius: var(--radius-3);
`;

export const IMG = styled.img`
  width: 100%;
`;
