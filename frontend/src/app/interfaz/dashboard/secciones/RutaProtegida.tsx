import { Suspense } from 'react';
import usePermisos from 'hooks/Permisos';
import ModuloSkeleton from 'comunes/informativos/skeletons/ModuloSkeleton';
import Denegado from 'comunes/informativos/Denegado';

import { componentes } from './ModulosLazy';

const RutaProtegida = ({ modulo }: { modulo: keyof typeof componentes }) => {
  const { accesoModulos } = usePermisos();
  const tienePermiso = accesoModulos.includes(modulo);
  const Componente = componentes[modulo];

  if (!tienePermiso) return <Denegado />;

  return (
    <Suspense fallback={<ModuloSkeleton />}>
      <Componente />
    </Suspense>
  );
};

export default RutaProtegida;
