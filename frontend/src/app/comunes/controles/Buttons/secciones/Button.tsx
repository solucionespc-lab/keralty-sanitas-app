import Points from 'comunes/informativos/svg/Points';

import { ButtonProps } from '../types/ButtonTypes';
import { iconografia } from '../recursos/Iconografia';
import { btnPermission } from '../constantes/ButtonConst';
import { habilitarPermiso } from '../../../../../utilidades/FuncionesGenerales';

import { ButtonLoading, ButtonStyle, Icon } from '../estilos/Estilos';

const Button = ({
  id,
  type,
  onClick,
  disabled,
  style,
  name,
  sizeBtn,
  typeBtn,
  icon,
  loading,
  permisos,
  permiso,
}: ButtonProps) => {
  const deshabilitar =
    disabled || habilitarPermiso(permisos, permiso || btnPermission[icon]);
  if (loading)
    return (
      <ButtonLoading size={sizeBtn} typeBtn={typeBtn}>
        <Points />
      </ButtonLoading>
    );

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
      <Icon>
        {(icon !== 'none' && iconografia[icon]?.path) ?? iconografia.new.path}
      </Icon>
      {name}
    </ButtonStyle>
  );
};

export default Button;
