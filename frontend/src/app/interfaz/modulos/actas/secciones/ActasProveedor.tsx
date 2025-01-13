import { useUserStore } from 'store/PrincipalStore';
import { toast } from 'sonner';
import { useCallback, useState, useTransition } from 'react';
import usePermisos from 'hooks/Permisos';
import Condicional from 'comunes/funcionales/Condicional';
import { Button } from 'comunes/controles/Buttons';
import correrMicroservicio from 'cloud_functions/CorrerInforme';
import { Tabla } from '@pc-component-ui-test-v2/tabla';
import { useQuery } from '@apollo/client';

import { validarDatosTablaProveedor } from '../utilidades/Funciones';
import { FiltroProvArgType, QueryActasProveedor } from '../types/ActasTypes';
import { DescargarPDF, DiligenciarIcono } from '../recursos/Iconografia';
import DiligenciarActa from './DiligenciarActa';

import { GET_ACTAS_PROVEEDOR } from '../peticiones/Queries';
import styles from '../estilos/Generales.module.css';

const ActasProveedor = () => {
  const { usuario } = useUserStore();
  const { accesos } = usePermisos();
  const [estados, setEstados] = useState({
    diligenciar: false,
    filtrar: false,
    certificado: false,
    url: '',
    idActa: '',
    idEmpresa: '',
  });
  const [isPendind, startTransition] = useTransition();
  const { data, loading, refetch } = useQuery<
    QueryActasProveedor,
    FiltroProvArgType
  >(GET_ACTAS_PROVEEDOR, {
    variables: {
      idProveedor: usuario?.claims.idProveedor ?? '',
      filtros: {
        fechaInicio: '',
        fechaFin: '',
        estado: '',
      },
    },
  });

  const generarDocumentos = useCallback(() => {
    toast.promise(
      correrMicroservicio<{ idActa: string; idEmpresa: string }>(
        'generarActa',
        {
          idActa: '',
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

  const refrescar = () => {
    refetch();
  };

  return (
    <>
      <h1 className='titulo_modulos'>Gestión de actas de reunión</h1>
      <div className={styles.botones_contenedor}>
        <div className={styles.acciones_principales}>
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
            onClick={() => startTransition(() => refrescar())}
            loading={isPendind}
          />
        </div>
      </div>

      <Tabla
        id='tabla_actas_proveedor'
        tableData={validarDatosTablaProveedor(data?.getActasProveedor ?? [])}
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
              key: 'nombreCliente',
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
            icon: <DiligenciarIcono />,
            id: 'id',
            event: (e) => {
              console.log(e);
              setEstados({
                ...estados,
                diligenciar: true,
                idActa: e.data?.id ?? '',
                idEmpresa: e.data?.idEmpresa ?? '',
              });
            },
          },
          {
            tooltip: 'Descargar acta',
            target: 'id',
            icon: <DescargarPDF />,
            id: 'id',
            event: (e) => {
              if (e.data?.estado === 'aprobado') {
                generarDocumentos();
                return;
              }
              toast.info('No puede descargar el acta si no ha sido aprobada');
            },
          },
        ]}
        loading={loading}
      />

      <Condicional condicion={estados.diligenciar}>
        <DiligenciarActa
          cerrar={() => setEstados({ ...estados, diligenciar: false })}
          idActa={estados.idActa}
          idEmpresa={estados.idEmpresa}
        />
      </Condicional>

      <Condicional condicion={estados.filtrar}>
        <h1>Filtros</h1>
      </Condicional>
    </>
  );
};

export default ActasProveedor;
