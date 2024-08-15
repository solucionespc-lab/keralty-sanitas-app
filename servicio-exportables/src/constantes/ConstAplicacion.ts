import { getLocalDate } from '../funciones/Funciones';

export const POLITICA_ACCESO = `12-31-${new Date().getFullYear() + 2}`;
export const EMAIL_REF = 'col_correos';
export const CONFIG_EMPRESA = '/empresa';
export const RUTA_CERT_STORAGE = `certificados/${getLocalDate().year}`;

export const dataFake = {
  data: {
    idBaseDeDatos: '54siOOB3yIKHhadnEOkp',
    nombreContratista: 'GONZALEZ CANTOR JOSE LUCINIO',
    year: 2024,
    calificacion: 4.5,
    nombreProveedor: 'Estrategico IPS sas',
    cedulaNit: '900981496',
    tipodeCompra: 'Nacional',
    descripcion: 'Servicio médicos',
    clasificacion: 'Proveedor riesgo crítico',
    fechaElaboracion: '26 de abril de 2023',
    periodoEvaluar: '01/01/2022 a 31/12/2022',
    tipoProveedor: 'Contratista (In House)',
    observaciones:
      'Hay muchas variaciones de los pasajes de Lorem Ipsum disponibles, pero la mayoría sufrió alteraciones en alguna manera, ya sea porque se le agregó humor, o palabras aleatorias que no parecen ni un poco creíbles. Si vas a utilizar un pasaje de Lorem Ipsum, necesitás estar seguro de que no hay nada avergonzante escondido en el medio del texto. Todos los generadores de Lorem Ipsum que se encuentran en Internet tienden a repetir trozos predefinidos cuando sea necesario, haciendo a este el único generador verdadero (válido) en la Internet. Usa un diccionario de mas de 200 palabras provenientes del latín, combinadas con estructuras muy útiles de sentencias, para generar texto de Lorem Ipsum que parezca razonable. Este Lorem Ipsum generado siempre estará libre de repeticiones, humor agregado o palabras no características del lenguaje, etc.',
    tipoBien: 'X',
    tipoServicio: '',
    primerFirmante: 'pepe perez',
    primerCargo: 'Desarrollador',
    primeraFirma: 'adwdawdawdawd',
    segundoFirmante: 'dawad',
    segundoCargo: 'adawda',
    segundaFirma: 'adwawdwa',
    tercerFirmante: 'vbcxvcbxcvb',
    tercerCargo: 'cvbxcvbxcv',
    terceraFirma: 'cvbcvbc',
    ptsContra: [5, 5, 5, 5, 5, 5, 5, 5],
    ptsComer: [5, 5, 5, 5, 5, 5, 5],
    ptsSst: [1, 1, 1, 1, 1],
    ptsAmb: [1, 1],
  },
};
