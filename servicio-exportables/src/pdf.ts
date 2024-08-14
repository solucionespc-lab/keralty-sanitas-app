import { logger } from 'firebase-functions/v2';

import { generarDocumento } from './funciones/GenerarDocumento';

import type { IBodyData } from './types/EvaluacionDesempenoType';
import { enviarCorreo } from './funciones/EnviarCorreo';
import {
  RUTA_CERT_STORAGE,
  RUTA_RES_STORAGE,
} from './constantes/ConstAplicacion';
import { getLocalDate } from './funciones/Funciones';

const generatePDF = async (datosPDF: IBodyData) => {
  const rutaCertificado = `${RUTA_CERT_STORAGE}/${datosPDF.nombreContratista}_${getLocalDate().fecha}.pdf`;
  const rutaResumen = `${RUTA_RES_STORAGE}/${datosPDF.nombreContratista}_${getLocalDate().fecha}.pdf`;

  try {
    const crearCertificado = generarDocumento(
      datosPDF,
      'EvalDesempenoContratista.hbs',
      rutaCertificado
    );
    const crearResumen = generarDocumento(
      datosPDF,
      'ResumenEvaluaciones.hbs',
      rutaResumen
    );

    const [certificadoURL, resumenURL] = await Promise.all([
      crearCertificado,
      crearResumen,
    ]);

    await enviarCorreo(datosPDF, certificadoURL[0], resumenURL[0]);
  } catch (error) {
    logger.error(error);
  }
};

export default generatePDF;
