import styled from 'styled-components';

export const Icono = styled.svg.attrs<{
  props: { width: string; height: string };
}>((props) => ({
  viewBox: props.viewBox ? props.viewBox : '0 0 24 24',
  x: '0px',
  y: '0px',
  xmlns: props.xmlns ? props.xmlns : 'http://www.w3.org/2000/svg',
}))`
  fill: ${(props): string => {
    if (props.color) return props.color;
    return 'var(--color-add-6)';
  }};
  width: ${(props): string =>
    props.width ? (props.width as string) : 'var(--icons-size)'};
  height: ${(props): string =>
    props.height ? (props.height as string) : 'var(--icons-size)'};
  cursor: pointer;

  :active {
    transform: scale(0.9);
  }

  -webkit-tap-highlight-color: transparent;
`;
