import AppModulos from './secciones/AppModulos';
import AppConfig from './secciones/AppConfig';

import { SideBarContainer } from './estilos/EstGenerales';

const BarraLateral = () => {
  return (
    <SideBarContainer>
      <AppConfig />
      <AppModulos />
    </SideBarContainer>
  );
};
export default BarraLateral;
