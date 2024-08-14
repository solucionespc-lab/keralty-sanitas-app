import styled from 'styled-components';
import { screenSizes } from 'configuraciones/VariablesEstaticasGlobales';

export const SideBarContainer = styled.section`
  position: relative;
  grid-column: 1 / 5;
  grid-row: 10 / 10;
  display: flex;
  flex-direction: column-reverse;
  background-color: var(--base);

  @media ${screenSizes.escritorio} {
    grid-column: 1 / 1;
    grid-row: 2 / 13;
    flex-direction: row;
  }
`;
