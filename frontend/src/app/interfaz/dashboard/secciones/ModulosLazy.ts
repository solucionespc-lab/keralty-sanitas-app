import { lazy } from 'react';

export const componentes = {
  empresas: lazy(() => import('modulos/administrar-empresas/Empresas')),
  autoevaluacion: lazy(() => import('modulos/autoevaluacion/Autoevaluacion')),
  trabajadores: lazy(() => import('modulos/trabajadores/Trabajadores')),
  excelencia: lazy(() => import('modulos/excelencia/Excelencia')),
  informes: lazy(() => import('modulos/informes/Informes')),
};
