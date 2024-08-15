import styled from 'styled-components'

import { screenSizes } from '../../../../../../../../configuraciones/VariablesEstaticasGlobales'
import { BtnAIconAnimation } from '../../../../../../comunes/Animaciones'

export const colors = {
  primary: ['var(--brand-5)', 'var(--brand-2)'],
  secondary: ['var(--brand-1-secondary)', 'var(--brand-1-secondary)'],
  cancel: ['#f5aabb', '#ff88aa'],
  filter: ['#afbeec', '#4c4ce4'],
  import: ['#7debf2', '#60a4ff'],
  download: ['#a5e29c', '#0dec38'],
  update: ['#7debf2', '#60a4ff'],
  removeFilter: ['var(--gray-6)', 'var(--gray-6)'],
  pendings: ['var(--brand-2-secondary)', 'var(--brand-3-secondary)'],
  massive: ['var(--gray-5)', 'var(--gray-8)'],
  add: ['#f2f4b8', '#FCFFAB'],
  pdf: ['#c01c11', '#b30b00'],
  delete: ['var(--brand-4)', 'var(--brand-2)'],
  email: ['#c01c11', '#b30b00'],
  token: ['#bce3eb', '#90d9e8']
}

export const ButtonStyle = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
  padding: 0.5em;
  border-radius: var(--radius-3);
  background: linear-gradient(
    90deg,
    ${({ typeBtn }) => colors[typeBtn]?.[0] ?? colors.primary[0]},
    ${({ typeBtn }) => colors[typeBtn]?.[1] ?? colors.primary[0]}
  );
  background-size: 300%;
  box-sizing: border-box;
  font-size: var(--paragraph);
  font-weight: ${({ typeBtn }) =>
    ['removeFilter', 'correo', 'pdf'].includes(typeBtn)
      ? 'var(--font-regular)'
      : 'var(--font-bold)'};
  font-family: var(--font-family-secondary);
  color: ${({ typeBtn }) =>
    ['removeFilter', 'correo', 'pdf'].includes(typeBtn) ? 'var(--gray-0)' : 'currentColor'};
  outline: none;
  border: none;
  width: fit-content;
  transition: all 0.4s var(--ease-5);

  :active {
    transform: scale(0.95);
  }

  :disabled {
    background: var(--gray-3);
    color: var(--gray-7);
    pointer-events: none;
  }

  @media ${screenSizes.escritorio} {
    :hover {
      svg {
        animation-delay: 0.3s;
        animation: ${BtnAIconAnimation} 1s linear infinite;
      }

      box-shadow: var(--shadow-3);
      transition: box-shadow 0.3s var(--ease-5);
    }
  }

  user-select: none; /* standard syntax */
  -webkit-user-select: none; /* webkit (safari, chrome) browsers */
  -moz-user-select: none; /* mozilla browsers */
  -khtml-user-select: none; /* webkit (konqueror) browsers */
`

export const Icon = styled.svg.attrs(() => ({
  viewBox: '0 0 24 24',
  x: '0px',
  y: '0px',
  xmlns: 'http://www.w3.org/2000/svg'
}))`
  width: calc(var(--icons-size) * 0.8);
  height: calc(var(--icons-size) * 0.8);
  fill: currentColor;
  ${({ goback }) => (goback ? 'transform: rotate(180deg);' : '')}
`
