import { InputProps } from 'comunes/types/ControlesTypes';
import { screenSizes } from 'configuraciones/VariablesEstaticasGlobales';
import styled from 'styled-components';

const Label = styled.label`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: var(--radius-2);
  font-size: var(--paragraph);
  padding: var(--space-fluid-2);
  color: var(--color-primary-text);
  width: fit-content;

  @media ${screenSizes.escritorio} {
    :hover {
      background-color: var(--surface-fourth);
    }
  }

  @media ${screenSizes.movil} {
    background-color: var(--surface-fourth);
  }

  @media ${screenSizes.tablet} {
    background-color: var(--surface-fourth);
  }

  user-select: none; /* standard syntax */
  -webkit-user-select: none; /* webkit (safari, chrome) browsers */
  -moz-user-select: none; /* mozilla browsers */
  -khtml-user-select: none; /* webkit (konqueror) browsers */
`;

const CheckBoxStyle = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;

  :checked {
    & + span {
      background-color: var(--surface-first);
      border-radius: var(--radius-round);
      transition: all 1s ease-in-out;
    }

    & + span > div {
      opacity: 1;
      transform: translateX(0);
      transition: transform 0.5s 0.1s var(--ease-squish-5),
        opacity 0.5s var(--ease-in-1);
    }
  }
`;

const Boxchecked = styled.span`
  display: grid;
  place-items: center;
  background-color: var(--system-info-color-dark);
  border-radius: var(--radius-2);
  width: var(--paragraph);
  height: var(--paragraph);
  margin-right: 0.5em;
`;

const Light = styled.div`
  position: absolute;
  background-color: var(--brand-secondary);
  border-radius: var(--radius-round);
  width: var(--paragraph);
  height: var(--paragraph);
  opacity: 0;
  transform: translateX(300%);
  transition: transform 0.5s 0.1s var(--ease-squish-5),
    opacity 0.5s var(--ease-in-1);
`;

const CheckBox = ({
  id,
  value,
  onChange,
  disabled,
  required,
  style,
  label,
  readOnly,
  checked,
}: InputProps) => (
  <Label htmlFor={id}>
    <CheckBoxStyle
      id={id}
      type='checkbox'
      style={style}
      onChange={onChange}
      value={typeof value == 'boolean' ? '' : value}
      checked={checked}
      readOnly={readOnly}
      required={required}
      disabled={disabled}
    />
    <Boxchecked>
      <Light className='light' />
    </Boxchecked>
    {label}
  </Label>
);

export default CheckBox;
