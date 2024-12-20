import * as admin from 'firebase-admin';

import { cuentaServicio } from './src/seguridad/Secretos';
import { ejemploTrigger } from './src/servicios/ejemplo';

admin.initializeApp({
  credential: cuentaServicio(),
  storageBucket: process.env.BUCKET_DEFAULT,
  databaseURL: process.env.REALTIME_DATABASE_URL,
});

const trigger = { ejemploTrigger };

export { trigger };
