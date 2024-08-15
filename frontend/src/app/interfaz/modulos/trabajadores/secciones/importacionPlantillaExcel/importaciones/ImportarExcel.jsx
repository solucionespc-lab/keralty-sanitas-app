import xlsxParser from 'xlsx-parse-json';
import { useState } from 'react';
import Toast from 'comunes/informativos/Notificaciones';
import FormModal from 'comunes/funcionales/forms/Form';
import Condicional from 'comunes/funcionales/Condicional';
import {
  ContFlexColumn,
  ContFlexRow,
  Parrafo,
  Subtitulo,
} from 'comunes/estilos/EstComunes';
import { Button } from 'comunes/controles/Buttons';

import {
  Adjuntar,
  ContDescarga,
  ContDescargaPlantilla,
  Contenedor,
  ContenedorAdjunto,
  ContenedorErrores,
  TituloDescarga,
} from './estilos/EstDatosCargar';

import validarDatos from '../importarEmpresas/validarDatos';
import { iconografia } from './recursos/Iconografia';
import ErroresImportados from './ErroresImportados';
import Errores from './Errores';
import DatosCargado from './DatosCargados';

const CargarDatosImportar = ({
  close,
  datosValidadosPlantilla,
  datosImportados,
  guardar,
  urlDescarga,
  datosFallidos,
  finalImportar,
  nombreDescargaPlantilla,
  nombreArchivoDescarga,
  nombreModal,
  listas,
  loading,
  idContratista,
  nombreContratista,
  cedulaNit,
  permisos,
}) => {
  const [datosPlantilla, setDatosPlantilla] = useState([]);
  const [datosCargados, setDatosImportados] = useState([]);
  const [Fallos, setDatosFallos] = useState([]);
  const [importar, setImportar] = useState(false);
  const [, setImportado] = useState(0);
  const [nombreArchivo, setNombreArchivo] = useState({
    nombre: 'Arraste el archivo que desea importar aquí',
    error: '',
  });
  const [estadoValidar, setValidar] = useState(true);
  const leerArchivo = async (e, origen) => {
    let archivo = {};

    if (origen === 'input') {
      if (e.target?.files?.length === 0) return null;
      archivo = e.target?.files[0] ?? '';
      const extraerDatos = await xlsxParser.onFileSelection(archivo);
      const cantidadHojas = Object.keys(extraerDatos) ?? [];
      // Desplegamos el mensaje de error al usuario si la hoja de Excel contiene más de una hoja.
      if (cantidadHojas.length === 0 || cantidadHojas.length > 1) {
        return setNombreArchivo({
          ...nombreArchivo,
          error:
            'La plantilla que desea importar no debe contener más de una hoja, elimine las hojas restantes que no contengan los datos y vuelva a intentarlo',
        });
      }
    } else if (origen === 'drop') {
      if (e.dataTransfer.files.length === 0) return null;
      archivo = e.dataTransfer?.files[0] ?? '';
      setNombreArchivo(e.dataTransfer?.files[0]?.name ?? '');
    } else {
      return null;
    }

    return xlsxParser.onFileSelection(archivo).then((file) => {
      const cantidadHojas = Object.keys(file) ?? [];
      const nombreHoja = cantidadHojas[0];

      setDatosPlantilla(file[nombreHoja] ?? []);
    });
  };

  const drop = (e) => {
    e.preventDefault();

    setNombreArchivo({ nombre: e?.target?.value ?? '', error: '' });
    leerArchivo(e, 'drop');
  };

  const validarDatosPlantilla = (tipoFuncion) => {
    if (tipoFuncion === 'importar') {
      Toast('Se estan  validando los registros', 'advertencia');
    }
    const copiaDatosPlantilla = [...(datosPlantilla ?? [])];

    // Validamos los datos antes de importar el archivo, y mostramos los registros a corregir
    const datosAImportar = copiaDatosPlantilla?.map((caso, index) => {
      if (tipoFuncion === 'importar') {
        setImportado(
          copiaDatosPlantilla.length
            ? Math.round(((index + 1) * 100) / copiaDatosPlantilla?.length)
            : 0
        );
      }

      return validarDatos(
        caso,
        index,
        listas,
        idContratista,
        nombreContratista,
        cedulaNit
      );
    });
    const filtrarErrores = datosAImportar.filter(
      (errores) => errores.error !== ''
    );
    const quitarDatosErrores = datosAImportar.filter(
      (errores) => errores.error === ''
    );

    setDatosFallos(filtrarErrores);
    setDatosImportados(quitarDatosErrores);
    if (tipoFuncion === 'importar' && quitarDatosErrores.length > 0) {
      datosValidadosPlantilla(datosAImportar);
      guardar(quitarDatosErrores);
    }
  };

  return (
    <FormModal
      tittle={nombreModal}
      close={() => close()}
      onSubmit={(e) => {
        e.preventDefault();
        validarDatosPlantilla('importar');
      }}
      buttons={[
        <Button
          icon="import"
          sizeBtn="normal"
          type="button"
          typeBtn="primary"
          key="importar"
          disabled={
            datosPlantilla?.length === 0 ||
            datosFallidos === 0 ||
            finalImportar ||
            estadoValidar ||
            loading
          }
          name="Importar"
          permisos={permisos}
          onClick={(e) => {
            e.preventDefault();
            validarDatosPlantilla('importar');
            setImportar(true);
          }}
        />,
        <Button
          icon="none"
          sizeBtn="normal"
          type="button"
          typeBtn="primary"
          key="validar"
          disabled={
            datosPlantilla?.length === 0 || datosFallidos === 0 || finalImportar
          }
          permisos={permisos}
          permiso="leer"
          name="Validar datos"
          onClick={(e) => {
            e.preventDefault();
            setValidar(false);
            validarDatosPlantilla();
            if (importar) {
              setImportar(!importar);
            }
          }}
        />,
      ]}
    >
      <>
        <Contenedor>
          <ContenedorAdjunto
            onDrop={drop}
            onDragOver={(e) => {
              e.preventDefault();
            }}
          >
            <Condicional condicion={datosPlantilla?.length > 0}>
              <ContFlexColumn style={{ gap: '1em' }}>
                {iconografia?.Excel?.path?.[0] ?? null}
                <Parrafo>{nombreArchivo?.nombre}</Parrafo>
              </ContFlexColumn>
            </Condicional>
            <Adjuntar
              type="file"
              accept=".xlsx"
              onClick={(e) => {
                leerArchivo(e, 'input');
                setNombreArchivo({ nombre: e?.target?.value ?? '', error: '' });
              }}
              onChange={(e) => {
                setNombreArchivo({ nombre: e?.target?.value ?? '', error: '' });

                leerArchivo(e, 'input');
              }}
            />

            <ContFlexRow
              style={{
                borderTop: '2px dotted var(--gray-5)',
                width: '100%',
                paddingTop: 'var(--gaps-2, 8px)',
                justifyContent: 'center',
              }}
            >
              <Parrafo>
                Puede arrastrar y soltar aquí el archivo que desea importar
              </Parrafo>
            </ContFlexRow>
          </ContenedorAdjunto>
          <ContFlexRow
            style={{
              width: '80%',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            <Parrafo>Formatos soportados: xlsx, xlsm, xlsb</Parrafo>
            <Parrafo>Tamaño máximo 4 MB</Parrafo>
          </ContFlexRow>
          <ContDescargaPlantilla>
            <ContFlexColumn
              style={{
                gap: 'var(--gaps-2, 8px)',
                alignItems: 'flex-start',
                justifyContent: 'center',
                flex: '3',
              }}
            >
              <ContFlexRow
                style={{
                  gap: 'var(--gaps-2, 8px)',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                {iconografia?.Excel?.path?.[0] ?? null}
                <TituloDescarga>{nombreDescargaPlantilla}</TituloDescarga>
              </ContFlexRow>
              <Subtitulo style={{ fontWeight: 'var(--font-regular)' }}>
                Puede descargar la plantilla para el cargue de los trabajadores
              </Subtitulo>
            </ContFlexColumn>
            <ContDescarga
              href={urlDescarga ?? ''}
              download={nombreArchivoDescarga}
            >
              Descargar
            </ContDescarga>
          </ContDescargaPlantilla>
          <Condicional condicion={importar}>
            <DatosCargado
              datosACargar={datosImportados}
              datosFallidos={datosFallidos?.length + Fallos.length}
              tituloImportados="Registros cargados correctamente"
            />
          </Condicional>
          <ContenedorErrores>
            <ErroresImportados datosImportados={datosFallidos ?? []} />

            <Errores datosImportados={Fallos ?? []} />
          </ContenedorErrores>
        </Contenedor>
      </>
      {/* )} */}
    </FormModal>
  );
};
export default CargarDatosImportar;
