import { useUserStore } from 'store/PrincipalStore';
import { toast } from 'sonner';
import { useState, useTransition } from 'react';
import usePermisos from 'hooks/Permisos';
import Condicional from 'comunes/funcionales/Condicional';
import { Button } from 'comunes/controles/Buttons';
import correrMicroservicio from 'cloud_functions/CorrerInforme';
import { Tabla } from '@pc-component-ui-test-v2/tabla';
import { useSuspenseQuery } from '@apollo/client';

import { useFiltrosStore } from './store/FiltrosAutoStore';
import FiltrosAuditoria from './secciones/filtros/FiltrosAuditoria';
import EditarAutoevaluacion from './secciones/EditarAutoevaluacion';
import CrearAutoevaluacion from './secciones/CrearAutoevaluacion';
import {
  DescargarIcon,
  EditIconTable,
  PDFDescargaIcon,
} from './recursos/Iconografia';
import { validarDatosTabla } from './funciones/Funciones';

import { GET_EVALUACIONES } from './peticiones/Queries';
import styles from './estilos/EstGenAuditoria.module.css';

import type { PdfParametros, Query } from './types/AutoevaluacionTypes';

const Autoevaluacion = () => {
  const { usuario } = useUserStore();
  const { accesos } = usePermisos();
  const { annio, idEvaluacion } = useFiltrosStore((state) => state);
  const [estados, setEstados] = useState({
    crear: false,
    editar: false,
    certificado: false,
    url: '',
    filtrar: false,
    editarProps: {
      annioConsulta: new Date().getFullYear(),
      idEmpresa: '',
      idEvaluacion: '',
    },
  });
  const [isPendind, startTransition] = useTransition();

  const { data, error, refetch } = useSuspenseQuery<Query>(GET_EVALUACIONES, {
    variables: {
      filtros: {
        idEmpresa: usuario?.claims.idEmpresa ?? '',
        annio,
        idEvaluacion,
      },
    },
  });

  const tituloFiltros = {
    empresa: usuario?.claims.idEmpresa ?? '',
    año: annio,
  };

  const refrescar = () => {
    refetch();
  };

  const generarDocumentos = (idEvaluacion: string, idEmpresa: string) =>
    toast.promise(
      correrMicroservicio<PdfParametros>('generarPdf', {
        idEvaluacion,
        idEmpresa,
      }),
      {
        loading: 'Generando certificado',
        success: (data) => {
          setEstados({ ...estados, certificado: true, url: data });
          return 'Certificado generado de clic en el botón - Descargar certificado';
        },
        error: (data) => data,
      }
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
            name='Actualizar tabla'
            sizeBtn='small'
            type='button'
            typeBtn='update'
            permisos={accesos.autoevaluacion}
            onClick={() => startTransition(() => refrescar())}
            loading={isPendind}
          />
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
            {
              label: 'Vigencia',
              key: 'annio',
              visible: true,
              styleConfig: { textAlign: 'center', color: 'var(--gray-1)' },
              rowStyleConfig: { textAlign: 'center' },
            },
            {
              label: 'Estado',
              key: 'estado',
              visible: true,
              styleConfig: { textAlign: 'center', color: 'var(--gray-1)' },
              rowStyleConfig: { textAlign: 'center' },
            },
          ],
          filters: tituloFiltros,
        }}
        controls={[
          {
            tooltip: 'Editar evaluación',
            icon: <EditIconTable />,
            id: 'id',
            event: (e) => {
              if (e.data?.estado === 'completo') {
                toast.info(
                  'Ya ha registrado completamente la autoevaluación, no puede modificarla'
                );
                return;
              }
              setEstados({
                ...estados,
                editar: true,
                editarProps: {
                  annioConsulta: new Date().getFullYear(),
                  idEmpresa: e.data?.idEmpresa ?? '',
                  idEvaluacion: e.data?.id ?? '',
                },
              });
            },
          },
          {
            tooltip: 'Generar certificado',
            icon: <PDFDescargaIcon />,
            id: 'id',
            event: (e) => {
              if (e.data?.estado !== 'completo') {
                toast.info(
                  'No puede generar el certificado hasta completar la autoevaluación'
                );
                return;
              }
              generarDocumentos(e?.data?.id ?? '', e.data?.idEmpresa ?? '');
            },
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

      <Condicional condicion={estados.editar}>
        <EditarAutoevaluacion
          cerrar={() => setEstados({ ...estados, editar: false })}
          annioConsulta={estados.editarProps.annioConsulta}
          idEmpresa={estados.editarProps.idEmpresa}
          idEvaluacion={estados.editarProps.idEvaluacion}
        />
      </Condicional>

      <Condicional condicion={estados.filtrar}>
        <FiltrosAuditoria
          close={() => setEstados({ ...estados, filtrar: false })}
        />
      </Condicional>
    </>
  );
};

export default Autoevaluacion;
