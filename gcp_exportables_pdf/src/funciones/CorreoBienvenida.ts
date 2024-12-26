import * as admin from 'firebase-admin';
import Handlebars from 'handlebars';

import { getTemplate } from './GetTemplateFile';
import { EMAIL_USUARIO_REF } from '../constantes/ConstAplicacion';
import { usuarioCorreoType } from '../types/CorreoBievenidaType';

export const correoBienvenida = async ({ data }: usuarioCorreoType) => {
  const html = await getTemplate('CorreoBienvenida.hbs');
  const template = Handlebars.compile(html.toString());
  const correo = template(data);

  admin
    .firestore()
    .collection(EMAIL_USUARIO_REF)
    .add({
      to: data.correo,
      message: {
        subject: 'Bienvenido(a) a la herramienta Colsanitasst',
        html: correo,
      },
    });

  return 'Se ha enviado el correo de bienvenida';
};
