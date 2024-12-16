import { Toaster } from 'sonner';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import Informes from 'modulos/informes/Informes';
import ModuloHuerfano from 'comunes/funcionales/ModuloHuerfano';
import ModalToast from 'comunes/funcionales/ModalToast';
import Barrasuperior from 'app/interfaz/barra-superior/Barra-superior';
import BarraLateral from 'app/interfaz/barra-lateral/BarraLateral';
import { useSuspenseQuery } from '@apollo/client';

import RutaProtegida from './secciones/RutaProtegida';
import PanelPrincipal from './secciones/Main';
import ErrorFallback from './secciones/ErrorComponent';

import { MODULOS_ACCESO } from './peticiones/Queries';
import { ContenedorApp } from './estilos/Estilos';

import type { configType } from './types/DashboardTypes';

const Dashboard = () => {
  const { data } = useSuspenseQuery<configType>(MODULOS_ACCESO);

  return (
    <Router>
      <Barrasuperior />
      <BarraLateral />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ContenedorApp>
          <Routes>
            <Route
              index
              element={
                <PanelPrincipal modulos={data.getConfiguraciones.modulos} />
              }
            />
            {data.getConfiguraciones.modulos.map((modulo) => (
              <Route
                key={modulo.titulo}
                path={modulo.url}
                element={<RutaProtegida modulo={modulo.llaveModulo} />}
              />
            ))}
            <Route path='/informes' element={<Informes />}>
              <Route path='autoevaluacion' element={<Informes />} />
            </Route>
            <Route path='*' element={<ModuloHuerfano />} />
          </Routes>
        </ContenedorApp>
        <ModalToast>
          <Toaster theme='system' visibleToasts={5} />
        </ModalToast>
      </ErrorBoundary>
    </Router>
  );
};

export default Dashboard;
