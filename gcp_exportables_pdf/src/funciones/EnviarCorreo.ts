import Handlebars from 'handlebars';
import * as admin from 'firebase-admin';
import { logger } from 'firebase-functions/v2';

import { CONFIG_EMPRESA, EMAIL_REF } from '../constantes/ConstAplicacion';
import { getTemplate } from './GetTemplateFile';
import { IBodyData } from '../types/CertificadosTypes';

export const enviarCorreo = async (datosPDF: IBodyData, urlCert: string) => {
  const configCorreos = await admin.database().ref(CONFIG_EMPRESA).get();
  const config = configCorreos.val();

  const html = await getTemplate('Certificado.hbs');
  const template = Handlebars.compile(html.toString());
  const correo = template(datosPDF);

  logger.debug(config);

  admin
    .firestore()
    .collection(EMAIL_REF)
    .add({
      to: 'nicolai.martin@pcsoluciones.com.co',
      message: {
        subject: 'Certificados autoevaluación',
        html: correo,
        attachments: [
          {
            filename: 'Resumen.pdf',
            path: urlCert,
          },
        ],
      },
    });
};