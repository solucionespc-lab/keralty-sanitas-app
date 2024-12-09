import * as admin from 'firebase-admin';
import { applicationDefault } from 'firebase-admin/app';
import 'dotenv/config';

const getProdMode = () => {
  const enviroment = process.env.APP_ENV;
  return enviroment === 'development' ? true : false;
};

export const cuentaServicio = () => {
  const isDevMode = getProdMode();

  if (isDevMode) {
    return applicationDefault();
  }

  return admin.credential.cert({
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: process.env.PRIVATE_KEY,
  });
};
