import { getLocalDate } from '../funciones/Funciones';

export const EMAIL_REF = 'col_correo_evaluaciones';
export const EMAIL_USUARIO_REF = 'col_correo_usuarios';

export const RUTA_CERT_STORAGE = `certificados/${getLocalDate().year}`;
export const RUTA_CERT_STORAGE_TEMP = `certificados/temporales/${getLocalDate().year}`;

export const COL_EMPRESAS = 'col_empresas';
export const COL_EVALUACIONES = 'col_evaluaciones';

const marca =
  process.env.APP_ENV !== 'development'
    ? 'https://firebasestorage.googleapis.com/v0/b/internal-bucket-biod/o/Marca%20de%20agua.png?alt=media&token=73486225-8aa8-41ba-8473-a088bb57ba76'
    : 'http://127.0.0.1:9199/v0/b/internal-bucket/o/marca%20de%20agua.png?alt=media&token=cd76c5d1-1e49-455a-af88-2146b31c47b6';

const logo =
  process.env.APP_ENV !== 'development'
    ? 'https://firebasestorage.googleapis.com/v0/b/internal-bucket-biod/o/logo.webp?alt=media&token=a2d23927-3333-4beb-879c-db955b680596'
    : 'http://127.0.0.1:9199/v0/b/internal-bucket/o/Logokeralty.png?alt=media&token=53029e97-db46-485a-9ac2-52e3ac070a5c';

export const DATOS_DEFECTO = {
  marcaUrl: marca,
  logoUrl: logo,
};
