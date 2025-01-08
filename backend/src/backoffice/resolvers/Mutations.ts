import algoliasearch from 'algoliasearch';
import * as admin from 'firebase-admin';
import { logger } from 'firebase-functions';
import path from 'path';
import * as xlsx from 'xlsx';

import { ResolverArgs } from '../../backend-def';
import { COL_EMPRESAS } from '../../modulos/cuentas/constantes/ConstGenerales';
import { EMPRESA_REF } from '../../modulos/empresas/constantes/EmpresasConst';
import { USUARIOS } from '../constantes/ConstGenerales';
import { EmpresaExcelType, EmpresaType } from '../types/EmpresasType';
import { generarHash } from '../utilidades/FuncGenerales';

import type { UserInput } from '../types/UsuarioTypes';

export const guardarUsuario: ResolverArgs<UserInput, string> = async (
  _,
  { input }
) => {
  const usuarioRef = admin.firestore().collection(USUARIOS);
  const password = generarHash();

  console.log(password);

  const { customClaims, ...user } = input;

  try {
    const usuario = await admin.auth().createUser({
      displayName: input.nombre,
      email: input.email,
      emailVerified: input.emailVerified,
      password,
    });

    admin.auth().setCustomUserClaims(usuario.uid, customClaims);
    await usuarioRef
      .doc(usuario.uid)
      .set(
        { ...user, ...customClaims, fechaCreacion: new Date(), activo: true },
        { merge: true }
      );

    // await axios.post(process?.env?.BIENVENIDA_CORREO_URL ?? '', {
    //   usuario: {
    //     app: 'BIO D',
    //     usuario: input.nombre,
    //     correo: input.email,
    //     contrasena: password,
    //     enlace: APP_BIOD_URL,
    //     logo: LOGO_BIOD,
    //   },
    // });

    return 'Se creó correctamente el usuario';
  } catch (error) {
    logger.error(error);
    return 'Ocurrió un error y no se guardó el usuario';
  }
};

export const actualizarUsuario: ResolverArgs<UserInput, string> = async (
  _,
  { input }
) => {
  const usuarioRef = admin.firestore().collection(USUARIOS);

  const { customClaims } = input;

  try {
    const usuario = await admin.auth().updateUser(input.uid, {
      displayName: input.nombre,
      email: input.email,
      emailVerified: input.emailVerified,
    });

    admin.auth().setCustomUserClaims(usuario.uid, customClaims);
    await usuarioRef.doc(input.uid).set(
      {
        nombre: input.nombre,
        firma: input.customClaims.firma,
        grupo: input.customClaims.grupo,
        organizacion: input.customClaims.organizacion,
        permisos: input.customClaims.permisos,
        rol: input.customClaims.rol,
      },
      { merge: true }
    );

    return 'Se actualizó correctamente el usuario';
  } catch (error) {
    logger.error(error);
    return 'Ocurrió un error y no se actualizó el usuario';
  }
};

export const exportarEmpresasDesdeExcel = async (): Promise<string> => {
  try {
    logger.info('Volcando empresas desde Excel');

    const filePath = path.join(
      process.cwd(),
      'src/recursos/Base empresas herramienta estándares con Trabajadores.xlsx'
    );

    // Lee el archivo Excel
    const workbook = xlsx.readFile(filePath);
    const sheetName = 'Listado de Pólizas Emitidas';
    const sheet = workbook.Sheets[sheetName];
    if (!sheet) {
      throw new Error(`No se encontró la hoja: ${sheetName}`);
    }

    // Convierte la hoja a JSON
    const empresas: EmpresaExcelType[] = xlsx.utils.sheet_to_json(sheet);

    // Obtiene todas las empresas actuales de Firestore
    const empresasRef = admin.firestore().collection(EMPRESA_REF);
    const empresasSnapshot = await empresasRef.get();
    const empresasFirestore: Record<string, FirebaseFirestore.DocumentData> =
      {};

    empresasSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.nit) {
        empresasFirestore[data.nit] = { id: doc.id, ...data };
      }
    });

    // Inicia un batch para operaciones en lotes
    let batch = admin.firestore().batch();
    const tamanoLote = 500;
    let contadorRegistros = 0;

    for (const empresa of empresas) {
      const nit = String(empresa['NIT']);
      const razonSocial = empresa['RAZON SOCIAL '];
      const fechaAfiliacion = empresa['FECHA AFILIACION ']
        ? excelSerialToJSDate(empresa['FECHA AFILIACION '])
        : null;

      const asegurados = Number(empresa['No. Asegurados']);
      const numeroAsegurados = empresa['No. Asegurados'];

      if (!nit || !razonSocial) {
        logger.warn(
          `La fila tiene datos incompletos: ${JSON.stringify(empresa)}`
        );
        console.log(empresa);
        continue;
      }

      const datosActualizados: EmpresaType = {
        nit,
        nombre: razonSocial,
        tipoEmpresa: 'empresa',
        tamano: calcularTamanoEmpresa(asegurados),
        riesgo: 'I',
        grupo: '',
        activo: true,
        ...(fechaAfiliacion && { fechaAfiliacion }),
        ...(numeroAsegurados && { numeroAsegurados }),
      };

      if (empresasFirestore[nit]) {
        // Actualiza la empresa existente
        const docRef = empresasRef.doc(empresasFirestore[nit].id);
        const currentData = empresasFirestore[nit];

        // Manejo del campo "responsables"
        if (
          currentData &&
          currentData.responsables &&
          !Array.isArray(currentData.responsables)
        ) {
          const responsablesArray = [currentData.responsables];
          datosActualizados.responsables = responsablesArray;
        }

        batch.set(docRef, datosActualizados, { merge: true });
      } else {
        // Crea una nueva empresa
        const docRef = empresasRef.doc(); // Genera un nuevo ID
        datosActualizados.responsables = [];
        batch.set(docRef, datosActualizados);
      }

      contadorRegistros++;

      if (contadorRegistros >= tamanoLote) {
        await batch.commit();
        batch = admin.firestore().batch(); // Reinicia el batch
        contadorRegistros = 0;
        logger.info('Batch ejecutado con éxito.');
      }
    }

    // Ejecuta las operaciones restantes
    if (contadorRegistros > 0) {
      await batch.commit();
      logger.info('Batch final ejecutado con éxito.');
    }

    return 'Empresas volcadas desde Excel con éxito';
  } catch (error) {
    logger.error('Error procesando el archivo Excel:', error);
    return 'Error procesando el archivo Excel';
  }
};

const excelSerialToJSDate = (serial: number): string => {
  const excelEpoch = new Date(1900, 0, 1); // 1 de enero de 1900
  const offset = serial - 1; // Excel cuenta el 1 de enero de 1900 como 1
  const days = offset - (serial > 59 ? 1 : 0); // Ajusta por el bug del año bisiesto de 1900
  const jsDate = new Date(excelEpoch.getTime() + days * 24 * 60 * 60 * 1000);
  return jsDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD
};

const calcularTamanoEmpresa = (asegurados: number): string => {
  if (asegurados <= 10) {
    return 'pequena';
  } else if (asegurados > 10 && asegurados <= 49) {
    return 'mediana';
  } else {
    return 'grande';
  }
};

export const volcarEmpresasDesdeFirestoreAAlgolia = async () => {
  // Inicializar Algolia
  const ALGOLIA_APP_ID_PRUEBA = '26C8K9E3NL'; // Prod:6B400QQWIH Dev:26C8K9E3NL
  const ALGOLIA_ADMIN_KEY_PRUEBA = 'ca5f06df05a6b00d50d910d69617a2b1'; // Prod:e7a83aadf3efbb76d2303433f243fada Dev:ca5f06df05a6b00d50d910d69617a2b1
  const ALGOLIA_INDEX_NAME_PRUEBA = 'col_empresas_keralty'; // col_trabajadores_avvillas-sst
  // Tamaño del lote
  const BATCH_SIZE = 500;

  try {
    // Inicializar Algolia
    const client = algoliasearch(
      ALGOLIA_APP_ID_PRUEBA,
      ALGOLIA_ADMIN_KEY_PRUEBA
    );
    const algoliaIndex = client.initIndex(ALGOLIA_INDEX_NAME_PRUEBA);

    // Traemos las empresas de firestore
    const empresas = await admin.firestore().collection(COL_EMPRESAS).get();
    console.log(`Cantidad de empresas encontradas: ${empresas.size}`);

    // Formatear informacion del trabajador para estructura algolia
    const empresasFormateadas = empresas.docs.map((doc) => {
      const datosEmpresa = doc.data();
      return {
        ...datosEmpresa,
        objectID: doc.id,
      };
    });

    console.log('Limpiando tabla de empresas en algolia...');
    await algoliaIndex.clearObjects();

    // Dividir registros en lotes
    for (let i = 0; i < empresasFormateadas.length; i += BATCH_SIZE) {
      const batch = empresasFormateadas.slice(i, i + BATCH_SIZE);
      console.log(`Subiendo batch ${i / BATCH_SIZE + 1}...`);
      // eslint-disable-next-line no-await-in-loop
      await algoliaIndex.saveObjects(batch); // Enviar el lote a Algolia
    }

    return 'Datos cargados a Algolia';
  } catch (error) {
    console.log('Error cargando datos a Algolia', error);
    throw error;
  }
};
