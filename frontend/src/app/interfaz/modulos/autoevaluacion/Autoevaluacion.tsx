import { toast } from 'sonner';
import { useCallback, useState, useTransition } from 'react';
import usePermisos from 'hooks/Permisos';
import Condicional from 'comunes/funcionales/Condicional';
import { Button } from 'comunes/controles/Buttons';
import correrMicroservicio from 'cloud_functions/CorrerInforme';
import { Tabla } from '@pc-component-ui-test-v2/tabla';
import { useSuspenseQuery } from '@apollo/client';

import { useFiltrosStore } from './store/FiltrosAutoStore';
import FiltrosAuditoria from './secciones/filtros/FiltrosAuditoria';
import CrearAutoevaluacion from './secciones/CrearAutoevaluacion';
import { DescargarIcon, PDFDescargaIcon } from './recursos/Iconografia';
import { validarDatosTabla } from './funciones/Funciones';

import { GET_EVALUACIONES } from './peticiones/Queries';
import styles from './estilos/EstGenAuditoria.module.css';

import type { Query } from './types/AutoevaluacionTypes';

const Autoevaluacion = () => {
  const { accesos } = usePermisos();
  const { annio, idEmpresa, idEvaluacion } = useFiltrosStore((state) => state);
  const [estados, setEstados] = useState({
    crear: false,
    editar: false,
    certificado: false,
    url: '',
    filtrar: false,
  });
  const [isPendind, startTransition] = useTransition();

  const { data, error, refetch } = useSuspenseQuery<Query>(GET_EVALUACIONES, {
    variables: {
      filtros: { idEmpresa, annio, idEvaluacion },
    },
  });

  const tituloFiltros = {
    empresa: idEmpresa,
    año: annio,
  };

  const refrescar = () => {
    refetch();
  };

  const generarDocumentos = useCallback(
    (idEvaluacion: string, idEmpresa: string) => {
      toast.promise(
        correrMicroservicio<{ idEvaluacion: string; idEmpresa: string }>(
          'generarPdf',
          {
            idEvaluacion,
            idEmpresa,
          }
        ),
        {
          loading: 'Generando certificado',
          success: (data) => {
            setEstados({ ...estados, certificado: true, url: data });
            return 'Certificado generado de clic en el botón - Descargar certificado';
          },
          error: (data) => data,
        }
      );
    },
    []
  );

  return (
    <>
      <h1 className='titulo_modulos'>Autoevaluación del SG-SST</h1>
      <div className={styles.botones_contenedor}>
        <div className={styles.acciones_principales}>
          <Button
            icon='new'
            name='Diligenciar autoevaluación'
            sizeBtn='small'
            type='button'
            typeBtn='primary'
            permiso='escribir'
            permisos={accesos.autoevaluacion}
            onClick={() => setEstados({ ...estados, crear: true })}
          />
          <Condicional condicion={estados.certificado}>
            <a
              className={styles.adjuntos}
              href={estados.url}
              target='_blank'
              rel='noreferrer'
              download
            >
              <DescargarIcon />
              <span>Descargar certificado</span>
            </a>
          </Condicional>
        </div>

        <div className={styles.acciones_principales}>
          <Button
            icon='update'
            name='Actualizar datos'
            sizeBtn='small'
            type='button'
            typeBtn='update'
            permisos={accesos.autoevaluacion}
            onClick={() => startTransition(() => refrescar())}
            loading={isPendind}
          />
          {/* <Button
            icon='filter'
            name='Filtros'
            sizeBtn='small'
            type='button'
            typeBtn='filter'
            permisos={accesos.autoevaluacion}
            onClick={() => setEstados({ ...estados, filtrar: true })}
          /> */}
        </div>
      </div>

      <Tabla
        id='tabla_evaluaciones'
        tableData={validarDatosTabla(data.getEvaluaciones)}
        configurations={{
          tableColumns: [
            {
              label: 'Nombre empresa',
              key: 'empresa',
              visible: true,
              styleConfig: { textAlign: 'start', color: 'var(--gray-1)' },
              rowStyleConfig: { textAlign: 'start' },
            },
            {
              label: 'Fecha realización',
              key: 'fecha',
              visible: true,
              styleConfig: { textAlign: 'center', color: 'var(--gray-1)' },
              rowStyleConfig: { textAlign: 'center' },
            },
            {
              label: 'Puntaje total',
              key: 'puntaje',
              visible: true,
              styleConfig: { textAlign: 'center', color: 'var(--gray-1)' },
              rowStyleConfig: { textAlign: 'center' },
            },
            {
              label: 'Clasificación',
              key: 'calificacion',
              visible: true,
              styleConfig: { textAlign: 'start', color: 'var(--gray-1)' },
              rowStyleConfig: { textAlign: 'start' },
            },
          ],
          filters: tituloFiltros,
        }}
        controls={[
          {
            tooltip: 'Generar certificado',
            icon: <PDFDescargaIcon />,
            id: 'id',
            event: (e) =>
              generarDocumentos(e?.data?.id ?? '', e.data?.idEmpresa ?? ''),
          },
        ]}
        error={error}
        loading={isPendind}
      />

      <Condicional condicion={estados.crear}>
        <CrearAutoevaluacion
          cerrar={() => setEstados({ ...estados, crear: false })}
        />
      </Condicional>

      {/* <Condicional condicion={estados.editar}>
        <h1>Editar Auditoria</h1>
        <EditarAuditoria
          permisos={permisos}
          idAuditoria={estados.idAuditoria}
          idContratista={estados.idContratista}
          cerrar={() => setEstados({ ...estados, editar: false })}
        />
      </Condicional> */}

      <Condicional condicion={estados.filtrar}>
        <FiltrosAuditoria
          close={() => setEstados({ ...estados, filtrar: false })}
        />
      </Condicional>
    </>
  );
};

export default Autoevaluacion;
