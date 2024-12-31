import * as admin from 'firebase-admin';

import { cuentaServicio } from './src/seguridad/Secretos';
import { ejemploTrigger } from './src/servicios/ejemplo/resolvers/Ejemplo';

admin.initializeApp({
  credential: cuentaServicio(),
  storageBucket: process.env.BUCKET_DEFAULT,
  databaseURL: process.env.REALTIME_DATABASE_URL,
});

const triggers = { ejemploTrigger };

export { triggers };
