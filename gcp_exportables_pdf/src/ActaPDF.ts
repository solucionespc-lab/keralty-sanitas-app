import { logger } from 'firebase-functions/v2';

import { RUTA_CERT_STORAGE } from './constantes/ConstAplicacion';
import { generarHash, getLocalDate } from './funciones/Funciones';
import { generarActa } from './funciones/GenerarActa';

const generarPDFActa = async () => {
  const rutaCertificado = `${RUTA_CERT_STORAGE}/acta_${getLocalDate().fecha}_${generarHash()}.pdf`;

  try {
    const crearCertificado = generarActa('Acta.hbs', rutaCertificado);
    const [certificadoURL] = await Promise.all([crearCertificado]);

    return certificadoURL[0];
  } catch (error) {
    logger.error(error);
    throw new Error('No se pudo generar el certificado');
  }
};

export default generarPDFActa;
