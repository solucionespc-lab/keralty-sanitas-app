import { shield } from 'graphql-shield';

import reglas from './Reglas';

export default shield(reglas, {
  allowExternalErrors: true,
  fallbackError: 'access/access-denied',
});
