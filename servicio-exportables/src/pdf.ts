import { logger } from 'firebase-functions/v2';

import { generarDocumento } from './funciones/GenerarDocumento';

import type { IBodyData } from './types/CertificadosTypes';
import { enviarCorreo } from './funciones/EnviarCorreo';
import { RUTA_CERT_STORAGE } from './constantes/ConstAplicacion';
import { getLocalDate } from './funciones/Funciones';

const generatePDF = async (datosPDF: IBodyData) => {
  const rutaCertificado = `${RUTA_CERT_STORAGE}/${datosPDF.nombreEmpresa}_${getLocalDate().fecha}.pdf`;

  try {
    const crearCertificado = generarDocumento(
      datosPDF,
      'Certificado.hbs',
      rutaCertificado
    );

    const [certificadoURL] = await Promise.all([crearCertificado]);

    await enviarCorreo(datosPDF, certificadoURL[0]);
  } catch (error) {
    logger.error(error);
  }
};

export default generatePDF;
