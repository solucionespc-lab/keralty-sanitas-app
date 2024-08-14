import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { cuentaServicio } from './src/seguridad/Secrets';
import { app, startServer } from './src/servidor/Servidor';

admin.initializeApp({
  credential: cuentaServicio(),
  databaseURL: process?.env?.REALTIME_DATABASE_URL ?? '',
});

startServer();

const endpoint = {
  api: functions.https.onRequest(app),
  staging: functions.https.onRequest(app),
};

export { endpoint };
