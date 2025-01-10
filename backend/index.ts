import * as admin from 'firebase-admin';
import { https } from 'firebase-functions/v2';

import { cuentaServicio } from './src/seguridad/Secrets';
import { app, startServer } from './src/servidor/Servidor';

admin.initializeApp({
  credential: cuentaServicio(),
  databaseURL: process?.env?.REALTIME_DATABASE_URL ?? '',
});

startServer();

const endpoint = {
  api: https.onRequest({ cors: '*' }, app),
  staging: https.onRequest({ cors: '*' }, app),
};

export { endpoint };
