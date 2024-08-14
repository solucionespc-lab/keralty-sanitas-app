import Condicional from 'comunes/funcionales/Condicional';
import { useUserStore } from 'app/store/PrincipalStore';
import { TYPE_OF_DEVICE } from 'app/store/constantes/ContextoConst';

import { version } from '../../../../package.json';
import Temporizador from './secciones/Temporizador';
import Navegacion from './secciones/Navegacion';
import Menu from './secciones/Menu';

import {
  Rol,
  UpperbarContainer,
  UserCont,
  UserContainer,
  UserName,
  Version,
} from './estilos/EstGenerales';

const Barrasuperior = () => {
  const { usuario, external } = useUserStore(({ usuario, external }) => ({
    usuario,
    external,
  }));
  const isDevice = TYPE_OF_DEVICE.test(navigator.userAgent);

  return (
    <UpperbarContainer>
      <Condicional condicion={!isDevice}>
        <UserCont>
          <Menu />
          <UserContainer>
            <UserName>{usuario?.claims.name}</UserName>
            <Rol>{usuario?.claims.rol}</Rol>
          </UserContainer>
        </UserCont>
      </Condicional>
      <Navegacion />
      <Condicional condicion={external}>
        <Temporizador />
      </Condicional>
      <Version>{version}</Version>
    </UpperbarContainer>
  );
};

export default Barrasuperior;
