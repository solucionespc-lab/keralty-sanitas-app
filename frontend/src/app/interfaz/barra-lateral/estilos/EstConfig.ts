import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { screenSizes } from 'configuraciones/VariablesEstaticasGlobales';
import { Latido, zoomIn } from 'comunes/estilos/Animaciones';

export const ConfigContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--gaps-1);
  justify-content: space-around;
  align-items: center;
  padding: var(--space-fluid-2);
  border-right: 1px solid var(--surface-third);
  background-color: var(--base);

  @media ${screenSizes.movil} {
    z-index: var(--layer-1);
  }

  @media ${screenSizes.tablet} {
    z-index: var(--layer-1);
  }

  @media ${screenSizes.escritorio} {
    flex-direction: column;
    justify-content: flex-start;
  }
`;

export const ContainerMovileModalOptions = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  border-radius: var(--radius-3);
  margin: var(--space-fluid-2);
  animation: ${zoomIn} 0.25s var(--ease-2);
`;

export const IconSectionModulos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-fluid-square);
  border: 1px solid var(--surface-third);
  border-radius: var(--radius-2);
  transition: background 0.2s var(--ease-in-2);
  text-decoration: none;

  -webkit-tap-highlight-color: transparent;

  @media ${screenSizes.movil} {
    @supports (gap: var(--gaps-3)) {
      margin: 0.25em;
    }

    :active {
      transform: scale(0.95);
      border: 1px solid var(--brand-primary);

      svg {
        fill: var(--brand-primary);
      }
    }
  }

  @media ${screenSizes.tablet} {
    @supports (gap: var(--gaps-3)) {
      margin: 0.25em;
    }

    :active {
      transform: scale(0.95);
      border: 1px solid var(--brand-primary);

      svg {
        fill: var(--brand-primary);
      }
    }
  }

  @media ${screenSizes.escritorio} {
    border: none;
    background-color: var(--surface-second);

    cursor: pointer;

    :active {
      transform: scale(0.95);
      svg {
        fill: var(--brand-primary);
      }
    }

    :hover {
      svg {
        fill: var(--brand-primary);
        animation: ${Latido} 0.7s ease-in-out infinite;
      }

      small {
        font-weight: var(--font-semibold);
      }
    }
  }
`;

export const IconSection = styled(Link)<any>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-fluid-square);
  border: 1px solid var(--surface-third);
  border-radius: var(--radius-2);
  transition: background 0.2s var(--ease-in-2);
  text-decoration: none;

  -webkit-tap-highlight-color: transparent;

  @media ${screenSizes.movil} {
    @supports (gap: var(--gaps-3)) {
      margin: 0.25em;
    }

    :active {
      transform: scale(0.95);
      border: 1px solid var(--brand-primary);

      svg {
        fill: var(--brand-primary);
      }
    }
  }

  @media ${screenSizes.tablet} {
    @supports (gap: var(--gaps-3)) {
      margin: 0.25em;
    }

    :active {
      transform: scale(0.95);
      border: 1px solid var(--brand-primary);

      svg {
        fill: var(--brand-primary);
      }
    }
  }

  @media ${screenSizes.escritorio} {
    border: none;
    background-color: var(--surface-second);

    cursor: pointer;

    :active {
      transform: scale(0.95);
      svg {
        fill: var(--brand-primary);
      }
    }

    :hover {
      svg {
        fill: var(--brand-primary);
        animation: ${Latido} 0.7s ease-in-out infinite;
      }

      small {
        font-weight: var(--font-semibold);
      }
    }
  }
`;

export const OptionName = styled.small`
  display: block;
  text-align: center;
  font-size: var(--messages);
  color: var(--color-primary-text);

  @media ${screenSizes.escritorio} {
    display: none;
  }
`;

export const ConfigIcon = styled.svg.attrs((props) => ({
  viewBox: '0 0 24 24',
  x: '0px',
  y: '0px',
  xmlns: 'http://www.w3.org/2000/svg',
  style: props.style,
}))`
  width: calc(var(--icons-size) * 1.2);
  height: calc(var(--icons-size) * 1.2);
  fill: var(--color-primary-text);

  @media ${screenSizes.escritorio} {
    width: var(--icons-size);
    height: var(--icons-size);
  }
`;
