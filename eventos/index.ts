import * as admin from 'firebase-admin';

import { cuentaServicio } from './src/seguridad/Secretos';
import { eventoCron } from './src/servicios/ejemplo';

admin.initializeApp({
  credential: cuentaServicio(),
  storageBucket: process.env.BUCKET_DEFAULT,
  databaseURL: process.env.REALTIME_DATABASE_URL,
});
// TODO Implementar APPCheck para la seguridad de todas las apis creadas en los proyectos
/*
  .runWith({
      enforceAppCheck: true, // Reject requests with missing or invalid App Check tokens.
      consumeAppCheckToken: true  // Consume the token after verification.
  })
*/

const schedule = { eventoCron };

export { schedule };
