import express, { Request, Response } from 'express';
import * as admin from 'firebase-admin';
import { setGlobalOptions, https } from 'firebase-functions/v2';

import generatePDF from './src/pdf';
import { cuentaServicio, urlSevices } from './src/seguridad/Secrets';

const app = express();
admin.initializeApp({
  credential: cuentaServicio(),
  storageBucket: process.env.BUCKET_DEFAULT,
  databaseURL: process.env.REALTIME_DATABASE_URL,
});

app.use(express.json());
app.post('/', async (req: Request, res: Response) => {
  console.log(req.body.data);
  const body = req.body.data;
  await generatePDF(body);

  res.set('content-type', 'text/plain');
  res.set('Access-Control-Allow-Origin', urlSevices());
  res.send({ data: 'Certificado y correo enviados' });
});

setGlobalOptions({ memory: '1GiB' });

const pdf = {
  biod: https.onRequest(app),
};

export { pdf };
