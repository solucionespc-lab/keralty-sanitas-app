import { getStorage } from 'firebase-admin/storage';
import { logger } from 'firebase-functions/v2';
import Handlebars from 'handlebars';
import * as puppeteer from 'puppeteer';

import helpersFile from './GetHelper.hbs';
import { getTemplate } from './GetTemplateFile';
import { FORMATO_PDF, OPCIONES_NAVEGADOR } from '../constantes/Generales';

import type { PDFDataType } from '../types/CertificadosTypes';

export const generarDocumento = async (
  datosPDF: PDFDataType,
  templateName: string,
  urlRepositorio: string
) => {
  // Inicializamos la instancia del navegador
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();
  const bucket = getStorage().bucket();
  const url: string[] = [];

  // Cargamos la plantilla HTML del Storage y la compilamos con Handlebars
  const html = await getTemplate(templateName);
  helpersFile(templateName);
  const template = Handlebars.compile(html.toString());

  // Cargamos la información en la página
  const pdfString = template(datosPDF);
  await page.setContent(pdfString, OPCIONES_NAVEGADOR);
  await page.emulateMediaType('screen');
  const pdf = await page.pdf(FORMATO_PDF);
  await browser.close();

  // Guardamos el PDF en el storage
  const file = bucket.file(urlRepositorio);

  await file.save(pdf, {
    metadata: {
      contentType: 'application/pdf',
    },
  });

  url.push(file.publicUrl());

  logger.info(`PDF resumen generado para ${templateName}`);
  return url;
};
