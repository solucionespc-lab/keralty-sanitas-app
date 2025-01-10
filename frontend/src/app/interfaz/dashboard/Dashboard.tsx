import { useUserStore } from 'store/PrincipalStore';
import { Toaster } from 'sonner';
import { Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import InformesExcelencia from 'modulos/informes_excelencia/InformesExcelencia';
import Informes from 'modulos/informes/Informes';
import ModuloHuerfano from 'comunes/funcionales/ModuloHuerfano';
import ModalToast from 'comunes/funcionales/ModalToast';
import Barrasuperior from 'app/interfaz/barra-superior/Barra-superior';
import BarraLateral from 'app/interfaz/barra-lateral/BarraLateral';
import { useSuspenseQuery } from '@apollo/client';

import RutaProtegida from './secciones/RutaProtegida';
import PanelPrincipal from './secciones/Main';
import ErrorFallback from './secciones/ErrorComponent';
import CrearEmpresa from './secciones/CrearEmpresa';

import { MODULOS_ACCESO } from './peticiones/Queries';
import { ContenedorApp } from './estilos/Estilos';

import type { configType } from './types/DashboardTypes';

const Dashboard = () => {
  const { usuario } = useUserStore();
  const { data } = useSuspenseQuery<configType>(MODULOS_ACCESO);
  const idEmpresa = usuario?.claims.idEmpresa ?? '';

  if (idEmpresa === '') {
    return (
      <ContenedorApp>
        <Barrasuperior />
        <CrearEmpresa />
        <ModalToast>
          <Toaster theme='system' visibleToasts={5} />
        </ModalToast>
      </ContenedorApp>
    );
  }

  return (
    <>
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
            <Route
              path='/informes'
              element={
                <Suspense fallback={<div>Cargando informes</div>}>
                  <Informes />
                </Suspense>
              }
            />
            <Route
              path='/informes-excelencia'
              element={
                <Suspense fallback={<div>Cargando informes</div>}>
                  <InformesExcelencia />
                </Suspense>
              }
            />
            <Route path='*' element={<ModuloHuerfano />} />
          </Routes>
        </ContenedorApp>
        <ModalToast>
          <Toaster theme='system' visibleToasts={5} />
        </ModalToast>
      </ErrorBoundary>
    </>
  );
};

export default Dashboard;
