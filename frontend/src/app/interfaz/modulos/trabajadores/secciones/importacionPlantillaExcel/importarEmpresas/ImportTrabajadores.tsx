import { useEffect, useState } from 'react';
import { GET_TRABAJADORES } from 'modulos/trabajadores/peticiones/Queries';
import { SAVE_IMPORTAR } from 'modulos/trabajadores/peticiones/Mutations';
import { cantidadDatosEnviar } from 'modulos/contratistas/funciones/FunContratista';
import {
  importacionPlantilla,
  nombreDocoumentoPlantilla,
} from 'modulos/contratistas/constantes/ConstContratista';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import Toast from 'comunes/informativos/Notificaciones';
import { Buffer } from 'buffer';
import { useMutation } from '@apollo/client';

import CargarDatosImportar from '../importaciones/ImportarExcel';

const storage = getStorage();
const storageRef = ref(storage, importacionPlantilla);

const ImportarTrabajadores = ({
  close,
  cedulaNit,
  nombreContratista,
  idContratista,
  // refetch,
  permisos,
}: any) => {
  const listasStorage =
    localStorage?.getItem('listasTrabajadores') ?? JSON.stringify({});
  const listas = JSON?.parse(listasStorage ?? []);
  const [estados, setEstados] = useState({ datos: [] });
  const [totalDatosCargar, setTotalCar] = useState(0);
  const [datosCargados, setDatosCar] = useState(0);
  const [datosFallidos, setDatosFallidos] = useState([]);
  const [termino, setTermino] = useState(false);
  const [url, setURL] = useState('');

  const [actualizar, { loading }] = useMutation(SAVE_IMPORTAR, {
    onCompleted: (registros) => {
      const fallosArray = [...datosFallidos];
      const fallos = fallosArray.concat(registros?.importTrabajadores?.fallos);

      setDatosFallidos(fallos ?? []);
      setDatosCar(datosCargados + registros?.importTrabajadores?.exitos);
      Toast(
        `Se han importado ${registros?.importTrabajadores?.exitos} registros en la base de datos`,
        'informacion'
      );
      // refetch();
      if (
        totalDatosCargar ===
          datosCargados + registros?.importTrabajadores?.exitos &&
        fallos.length === 0 &&
        registros?.importTrabajadores?.fallos.length === 0
      ) {
        close();
      }
    },
    refetchQueries: [GET_TRABAJADORES, 'getTrabajadores'],

    onError: (datoError: any) => {
      Toast(
        `Ha ocurrido un error al actualizar los datos, ${datoError}`,
        'error'
      );
    },
  });

  const guardar = (datos: any) => {
    const datosCargar = datos.reduce((casos: any, caso: any) => {
      if (caso.seCarga === true) {
        casos.push(caso.caso);
      }
      return casos;
    }, []);
    const archivosAjustados = datosCargar?.sort((a: any, b: any) =>
      a?.cedula > b?.cedula ? 1 : -1
    );

    setTermino(true);
    // Validar que se envien de a 900 bytes datos por 1seg
    let arregloDatosEnviar: any = [];

    if (archivosAjustados?.length > 0) {
      const conversionBytes = Buffer?.byteLength(
        JSON.stringify(archivosAjustados)
      );
      const limite = 900;
      const cantidad = Math.ceil(conversionBytes / limite);
      arregloDatosEnviar = cantidadDatosEnviar(archivosAjustados, cantidad);
      let contador = 0;

      const i = setInterval(() => {
        setTotalCar(Number(archivosAjustados?.length));

        actualizar({
          variables: {
            primeraCedula: arregloDatosEnviar[contador]?.[0]?.cedula,
            ultimaCedula:
              arregloDatosEnviar[contador]?.[
                arregloDatosEnviar[contador]?.length - 1
              ]?.cedula,
            input: arregloDatosEnviar[contador],
          },
        });

        contador += 1;
        if (contador === arregloDatosEnviar.length) {
          setTermino(false);
          clearInterval(i);
        }
      }, 3100);
    }
  };
  const validarExistenciaDoc = () => {
    const storagePerfil = ref(storageRef, nombreDocoumentoPlantilla);
    getDownloadURL(storagePerfil).then((vinculo: any) => {
      setURL(vinculo);
      return vinculo;
    });
    return url;
  };

  useEffect(() => {
    validarExistenciaDoc();
  }, []);

  return (
    <CargarDatosImportar
      close={close}
      permisos={permisos}
      idContratista={idContratista}
      nombreContratista={nombreContratista}
      cedulaNit={cedulaNit}
      loading={false}
      nombreModal="Importar trabajadores"
      nombreDescargaPlantilla="Trabajadores"
      nombreArchivoDescarga="Plantilla lista SG-SSTA.xlsx"
      datosImportados={datosCargados}
      datosValidadosPlantilla={(e: any) => {
        setEstados({ ...estados, datos: e });
      }}
      datosFallidos={datosFallidos ?? []}
      finalImportar={termino}
      guardar={(e: any) => {
        setEstados({ ...estados, datos: e });
        guardar(e);
      }}
      urlDescarga={url}
      listas={listas}
    />
  );
};
export default ImportarTrabajadores;
