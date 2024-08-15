import React from 'react';
import { iconografia } from '../recursos/Iconografia';
import { ButtonStyle, Icon } from './EstBotones';

const BotónImportacion = ({
  id,
  type,
  onClick,
  disabled,
  style,
  name,
  sizeBtn,
  typeBtn,
  icon,
}) => {
  const deshabilitar = disabled;

  return (
    <ButtonStyle
      id={id}
      type={type}
      style={style}
      disabled={deshabilitar}
      size={sizeBtn}
      typeBtn={typeBtn}
      onClick={onClick}
    >
      <Icon>{iconografia[icon]?.path ?? iconografia.new.path}</Icon>
      {name}
    </ButtonStyle>
  );
};

export default BotónImportacion;
