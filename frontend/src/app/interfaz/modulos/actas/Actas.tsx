import { useUserStore } from 'store/PrincipalStore';
import { toast } from 'sonner';
import { useCallback, useState, useTransition } from 'react';
import usePermisos from 'hooks/Permisos';
import Condicional from 'comunes/funcionales/Condicional';
import { Button } from 'comunes/controles/Buttons';
import correrMicroservicio from 'cloud_functions/CorrerInforme';
import { Tabla } from '@pc-component-ui-test-v2/tabla';
import { useSuspenseQuery } from '@apollo/client';

import { validarDatosTabla } from './utilidades/Funciones';
import RevisarActa from './secciones/RevisarActa';
import DiligenciarActa from './secciones/DiligenciarActa';
import {
  DescargarPDF,
  DiligenciarIcono,
  RevisarIcon,
} from './recursos/Iconografia';

import { GET_ACTAS } from './peticiones/Queries';
import styles from './estilos/Generales.module.css';

import type { FiltroArgType, Query } from './types/ActasTypes';

const Actas = () => {
  const { usuario } = useUserStore();
  const { accesos } = usePermisos();
  const [estados, setEstados] = useState({
    revisar: false,
    diligenciar: false,
    importar: false,
    filtrar: false,
    certificado: false,
    url: '',
    idActa: '',
  });
  const [isPendind, startTransition] = useTransition();
  const { data } = useSuspenseQuery<Query, FiltroArgType>(GET_ACTAS, {
    variables: {
      idEmpresa: usuario?.claims.idEmpresa ?? '',
      filtros: {
        fechaInicio: '',
        fechaFin: '',
        estado: '',
      },
    },
  });

  const generarDocumentos = useCallback(() => {
    toast.promise(
      correrMicroservicio<{ idEvaluacion: string; idEmpresa: string }>(
        'generarActa',
        {
          idEvaluacion: '',
          idEmpresa: '',
        }
      ),
      {
        loading: 'Generando acta de reunión',
        success: (data) => {
          setEstados({ ...estados, certificado: true, url: data });
          return 'Certificado generado de clic en el botón - Descargar certificado';
        },
        error: (data) => data,
      }
    );
  }, []);

  return (
    <>
      <h1 className='titulo_modulos'>Gestión de actas de reunión</h1>
      <div className={styles.botones_contenedor}>
        <div className={styles.acciones_principales}>
          <Button
            icon='import'
            name='Importar solicitudes de servicio (SDS)'
            sizeBtn='small'
            type='button'
            typeBtn='import'
            permiso='escribir'
            permisos={accesos.actas}
            onClick={() => setEstados({ ...estados, importar: true })}
          />

          <Condicional condicion={estados.certificado}>
            <a
              className={styles.adjuntos}
              href={estados.url}
              target='_blank'
              rel='noreferrer'
              download
            >
              <DescargarPDF />
              <span>Descargar acta de reunión</span>
            </a>
          </Condicional>
        </div>

        <div className={styles.acciones_principales}>
          <Button
            icon='update'
            name='Actualizar tabla'
            sizeBtn='small'
            type='button'
            typeBtn='pendings'
            permisos={accesos.excelencia}
            onClick={() => startTransition(() => console.log('actualizar'))}
            loading={isPendind}
          />
        </div>
      </div>

      <Tabla
        id='tabla_evaluaciones'
        tableData={validarDatosTabla(data.getActas)}
        configurations={{
          tableColumns: [
            {
              label: 'SDS',
              key: 'sds',
              visible: true,
              styleConfig: { textAlign: 'center', color: 'var(--gray-1)' },
              rowStyleConfig: { textAlign: 'center' },
            },
            {
              label: 'Nombre del cliente',
              key: 'nombreProveedor',
              visible: true,
              styleConfig: { textAlign: 'start', color: 'var(--gray-1)' },
              rowStyleConfig: { textAlign: 'start' },
            },
            {
              label: 'Actividad',
              key: 'actividad',
              visible: true,
              styleConfig: { textAlign: 'start', color: 'var(--gray-1)' },
              rowStyleConfig: { textAlign: 'start' },
            },
            {
              label: 'Fecha de reunión',
              key: 'fecha',
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
        }}
        controls={[
          {
            tooltip: 'Diligenciar acta',
            target: 'id',
            icon: <DiligenciarIcono />,
            id: 'id',
            event: (e) =>
              setEstados({
                ...estados,
                revisar: true,
                idActa: e.data?.id ?? '',
              }),
          },
          {
            tooltip: 'Descargar acta',
            target: 'id',
            icon: <DescargarPDF />,
            id: 'id',
            event: () => generarDocumentos(),
          },
          {
            tooltip: 'Revisar acta',
            target: 'id',
            icon: <RevisarIcon />,
            id: 'id',
            event: (e) =>
              setEstados({
                ...estados,
                diligenciar: true,
                idActa: e.data?.id ?? '',
              }),
          },
        ]}
        loading={isPendind}
      />

      <Condicional condicion={estados.importar}>
        <input type='file' />
      </Condicional>

      <Condicional condicion={estados.revisar}>
        <RevisarActa
          cerrar={() => setEstados({ ...estados, revisar: false })}
          idActa={estados.idActa}
        />
      </Condicional>

      <Condicional condicion={estados.diligenciar}>
        <DiligenciarActa
          cerrar={() => setEstados({ ...estados, diligenciar: false })}
          idActa={estados.idActa}
        />
      </Condicional>

      <Condicional condicion={estados.filtrar}>
        <h1>Filtros</h1>
      </Condicional>
    </>
  );
};

export default Actas;
