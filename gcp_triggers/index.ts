import * as admin from 'firebase-admin';

import { cuentaServicio } from './src/seguridad/Secretos';
import { autoevaluaciones } from './src/servicios/autoevaluacion/resolvers/Autoevaluaciones';
import { excelencias } from './src/servicios/autoevaluacion/resolvers/Excelencias';

admin.initializeApp({
  credential: cuentaServicio(),
  storageBucket: process.env.BUCKET_DEFAULT,
  databaseURL: process.env.REALTIME_DATABASE_URL,
});

const triggers = { autoevaluaciones, excelencias };

export { triggers };
