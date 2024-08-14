import * as admin from 'firebase-admin';

import { BUCKET_NAME, BUCKET_TEMPLATES_NAME } from '../constantes/Generales';

export const getTemplate = async (templateName: string) => {
  const [template] = await admin
    .storage()
    .bucket(BUCKET_NAME)
    .file(`${BUCKET_TEMPLATES_NAME}/${templateName}`)
    .download();

  return template;
};
