import * as puppeteer from 'puppeteer';

export const FORMATO_PDF: puppeteer.PDFOptions = {
  margin: { top: '6.35mm', right: '6.35mm', bottom: '6.35mm', left: '6.35mm' },
  printBackground: true,
  format: 'letter',
};

export const OPCIONES_NAVEGADOR: puppeteer.WaitForOptions = {
  waitUntil: 'networkidle0',
};

export const BUCKET_NAME = process.env.BUCKET_NAME;
export const BUCKET_TEMPLATES_NAME = process.env.BUCKET_TEMPLATES_NAME;

/* Logos e imagenes propias */
export const LOGO = process.env.LOGO;

export const LST_MESES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

export const LST_DIAS = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miercoles',
  'Jueves',
  'Viernes',
  'Sábado',
];
