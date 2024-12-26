import { getLocalDate } from '../funciones/Funciones';

export const EMAIL_REF = 'col_correo_evaluaciones';
export const EMAIL_USUARIO_REF = 'col_correo_usuarios';

export const RUTA_CERT_STORAGE = `certificados/${getLocalDate().year}`;
export const RUTA_CERT_STORAGE_TEMP = `certificados/temporales/${getLocalDate().year}`;

export const COL_EMPRESAS = 'col_empresas';
export const COL_EVALUACIONES = 'col_evaluaciones';

const marca =
  process.env.APP_ENV !== 'development'
    ? 'https://firebasestorage.googleapis.com/v0/b/internal-bucket-keralty/o/marca%20de%20agua.png?alt=media&token=0c0ec6c2-047a-4b7a-8507-9681140f8be6'
    : 'http://127.0.0.1:9199/v0/b/internal-bucket/o/marca%20de%20agua.png?alt=media&token=cd76c5d1-1e49-455a-af88-2146b31c47b6';

const logo =
  process.env.APP_ENV !== 'development'
    ? 'https://firebasestorage.googleapis.com/v0/b/internal-bucket-keralty/o/Logokeralty.png?alt=media&token=b3729e72-4e11-497c-9db6-8c868cd90bdc'
    : 'http://127.0.0.1:9199/v0/b/internal-bucket/o/Logokeralty.png?alt=media&token=53029e97-db46-485a-9ac2-52e3ac070a5c';

const firma =
  process.env.APP_ENV !== 'development'
    ? 'https://firebasestorage.googleapis.com/v0/b/internal-bucket-keralty/o/Firma%20AEB.png?alt=media&token=05e14668-ecf7-4783-a123-8808fd443bf1'
    : 'http://127.0.0.1:9199/v0/b/internal-bucket/o/Firma%20AEB.png?alt=media&token=abe510d4-26b4-4a2f-991b-e0446152a139';

export const DATOS_DEFECTO = {
  marcaUrl: marca,
  logoUrl: logo,
  firmaUrl: firma,
};
