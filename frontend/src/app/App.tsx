import { Suspense, lazy } from 'react';
import MainSkeleton from 'comunes/informativos/skeletons/MainSkeleton';
import Cargando from 'comunes/informativos/Cargando';

import Servidor from '../servidor/Servidor';
import { useUserStore } from './store/PrincipalStore';
import { Container } from './interfaz/dashboard/estilos/Estilos';
import Dashboard from './interfaz/dashboard/Dashboard';

const Content = {
  login: lazy(() => import('autenticacion/Login')),
};

const App = () => {
  const { autorizado, token } = useUserStore(({ autorizado, token }) => ({
    autorizado,
    token,
  }));

  if (!autorizado) {
    return (
      <Suspense fallback={<Cargando mensaje='Bienvenido(a)!' />}>
        <Content.login />
      </Suspense>
    );
  }

  return (
    <Servidor token={token}>
      <Container>
        <Suspense fallback={<MainSkeleton mensaje='Configurando la app...' />}>
          <Dashboard />
        </Suspense>
      </Container>
    </Servidor>
  );
};

export default App;
