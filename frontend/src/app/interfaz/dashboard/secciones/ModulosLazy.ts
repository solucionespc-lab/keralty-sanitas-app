import { lazy } from 'react';

export const componentes = {
  empresas: lazy(() => import('modulos/administrar-empresas/Empresas')),
  biomecanico: lazy(() => import('modulos/biomecanico/Biomecanico')),
  autoevaluacion: lazy(() => import('modulos/autoevaluacion/Autoevaluacion')),
  // trabajadores: lazy(() => import('modulos/trabajadores/Trabajadores')),
};
