import Servidor from 'servidor/Servidor';
import { BrowserRouter as Router } from 'react-router-dom';
import { lazy, ReactNode, Suspense } from 'react';
import MainSkeleton from 'comunes/informativos/skeletons/MainSkeleton';

import { useUserStore } from './store/PrincipalStore';

const Dashboard = lazy(() => import('./interfaz/dashboard/Dashboard'));

const MiddlewareApp = ({ children }: { children: ReactNode }) => {
  const { autorizado, token } = useUserStore(({ autorizado, token }) => ({
    autorizado,
    token,
  }));

  if (!autorizado) return <>{children}</>;

  return (
    <Servidor token={token}>
      <Router>
        <Suspense fallback={<MainSkeleton mensaje='Configurando la app...' />}>
          <Dashboard />
        </Suspense>
      </Router>
    </Servidor>
  );
};

export default MiddlewareApp;
