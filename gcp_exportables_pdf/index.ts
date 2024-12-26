import express, { Request, Response } from 'express';
import * as admin from 'firebase-admin';
import { https } from 'firebase-functions/v2';

import { correoBienvenida } from './src/funciones/CorreoBienvenida';
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
  const body = req.body.data;
  const url = await generatePDF(body);

  res.set('content-type', 'text/plain');
  res.set('Access-Control-Allow-Origin', '*');
  res.send({ data: url });
});

app.post('/bienvenida', async (req: Request, res: Response) => {
  const datosUsuario = req.body;
  const enviarCorreo = await correoBienvenida(datosUsuario);

  res.set('content-type', 'application/pdf');
  res.set('Access-Control-Allow-Origin', urlSevices());
  res.send({
    data: { enviarCorreo },
  });
});

const pdf = {
  keralty: https.onRequest(
    { cors: '*', memory: '2GiB', timeoutSeconds: 120 },
    app
  ),
};

export { pdf };
