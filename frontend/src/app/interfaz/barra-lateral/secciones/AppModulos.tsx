import usePermisos from 'hooks/Permisos';
import { ModulosType } from 'app/interfaz/dashboard/types/DashboardTypes';
import { MODULOS_ACCESO } from 'app/interfaz/dashboard/peticiones/Queries';
import { useApolloClient } from '@apollo/client';

import { useBLStore } from '../store/BLStore';
import { iconografia } from '../recursos/Iconografia';

import {
  ModuleContainer,
  ModuleIcon,
  ModuleSection,
  NameModule,
  TitleModule,
} from '../estilos/EstModulos';

const AppModulos = () => {
  const client = useApolloClient();
  const { accesoModulos } = usePermisos();
  const { verModulo } = useBLStore((state) => state);
  const { getConfiguraciones } = client.readQuery({
    query: MODULOS_ACCESO,
  });

  const modulosConPermiso = getConfiguraciones.modulos.filter(
    (modulo: ModulosType) =>
      accesoModulos.some((acceso) => modulo.llaveModulo === acceso)
  );

  return (
    <ModuleContainer open={verModulo}>
      <TitleModule>Módulos</TitleModule>
      {modulosConPermiso?.map((modulo: ModulosType) => (
        <ModuleSection
          open={verModulo}
          to={modulo.url}
          key={modulo.titulo}
          onClick={() =>
            localStorage.setItem('modulo', `${modulo.llaveModulo}`)
          }
        >
          <ModuleIcon>{iconografia.module.path}</ModuleIcon>
          <NameModule>{modulo.titulo}</NameModule>
        </ModuleSection>
      ))}
    </ModuleContainer>
  );
};

export default AppModulos;
