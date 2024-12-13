import * as admin from 'firebase-admin';
import { logger } from 'firebase-functions/v2';

// import { enviarCorreo } from './funciones/EnviarCorreo';
import {
  COL_EMPRESAS,
  COL_EVALUACIONES,
  DATOS_DEFECTO,
  RUTA_CERT_STORAGE,
} from './constantes/ConstAplicacion';
import {
  estandarizarDatos,
  generarHash,
  getLocalDate,
} from './funciones/Funciones';
import { generarDocumento } from './funciones/GenerarDocumento';
import { dbDataType } from './types/RecursosType';

import type {
  EmpresaType,
  EvaluacionesType,
  IBodyData,
} from './types/CertificadosTypes';

const generatePDF = async (datosPDF: IBodyData) => {
  const db = admin.firestore();
  const documentoRef = db
    .collection(COL_EMPRESAS)
    .doc(datosPDF.idEmpresa)
    .collection(COL_EVALUACIONES)
    .doc(datosPDF.idEvaluacion)
    .withConverter(dbDataType<EvaluacionesType>());
  const empresaRef = db
    .collection(COL_EMPRESAS)
    .doc(datosPDF.idEmpresa)
    .withConverter(dbDataType<EmpresaType>());

  const evaluacion = documentoRef.get();
  const empresa = empresaRef.get();
  const documentos = await Promise.all([evaluacion, empresa]);

  const datosParaPDF = estandarizarDatos(
    documentos[0].data(),
    documentos[1].data()
  );

  const rutaCertificado = `${RUTA_CERT_STORAGE}/${datosParaPDF.nombre}_${getLocalDate().fecha}_${generarHash()}.pdf`;

  const datosCompleto = { ...DATOS_DEFECTO, ...datosParaPDF };

  try {
    const crearCertificado = generarDocumento(
      datosCompleto,
      'Certificado.hbs',
      rutaCertificado
    );

    const [certificadoURL] = await Promise.all([crearCertificado]);

    // await enviarCorreo(datosPDF, certificadoURL[0]);
    return certificadoURL[0];
  } catch (error) {
    logger.error(error);
    throw new Error('No se pudo generar el certificado');
  }
};

export default generatePDF;
