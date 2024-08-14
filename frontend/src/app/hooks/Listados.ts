import { MODULOS_ACCESO } from 'app/interfaz/dashboard/peticiones/Queries';
import { useApolloClient } from '@apollo/client';

import type { ListadosType } from './types/HookTypes';

const useListados = (): ListadosType => {
  const client = useApolloClient();
  const { getConfiguraciones } = client.readQuery({
    query: MODULOS_ACCESO,
  });

  return {
    listas: JSON.parse(getConfiguraciones?.listas),
    responsables: JSON.parse(getConfiguraciones.responsablesPlan),
  };
};

export default useListados;
