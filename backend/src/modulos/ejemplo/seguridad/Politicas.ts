import { and } from 'graphql-shield';

import { politicas } from '../../../seguridad/Autorizaciones';

export const ejemploQueryPolicy = {
  getEjemplo: and(politicas.estaAutenticado),
};

export const ejemploMutationPolicy = {
  saveEjemplo: and(politicas.estaAutenticado),
};
