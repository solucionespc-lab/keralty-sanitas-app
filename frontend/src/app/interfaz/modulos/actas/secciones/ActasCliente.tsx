import { useUserStore } from 'store/PrincipalStore';
import { useState, useTransition } from 'react';
import usePermisos from 'hooks/Permisos';
import Condicional from 'comunes/funcionales/Condicional';
import { Button } from 'comunes/controles/Buttons';
import { Tabla } from '@pc-component-ui-test-v2/tabla';
import { useQuery } from '@apollo/client';

import { validarDatosTablaCliente } from '../utilidades/Funciones';
import { QueryActas, FiltroArgType } from '../types/ActasTypes';
import { AprobarActaIcon, RevisarIcon } from '../recursos/Iconografia';
import RevisarActa from './RevisarActa';

import { GET_ACTAS } from '../peticiones/Queries';
import styles from '../estilos/Generales.module.css';

const ActasCliente = () => {
  const { usuario } = useUserStore();
  const { accesos } = usePermisos();
  const [estados, setEstados] = useState({
    revisar: false,
    filtrar: false,
    idActa: '',
  });
  const [isPendind, startTransition] = useTransition();
  const { data, loading, refetch } = useQuery<QueryActas, FiltroArgType>(
    GET_ACTAS,
    {
      variables: {
        idEmpresa: usuario?.claims.idEmpresa ?? '',
        filtros: {
          fechaInicio: '',
          fechaFin: '',
          estado: '',
        },
      },
    }
  );

  const refrescar = () => {
    refetch();
  };

  return (
    <>
      <h1 className='titulo_modulos'>Gestión de actas de reunión</h1>
      <div className={styles.botones_contenedor}>
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
        id='tabla_evaluaciones'
        tableData={validarDatosTablaCliente(data?.getActas ?? [])}
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
              label: 'Nombre del proveedor',
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
            tooltip: 'Revisar acta',
            icon: <RevisarIcon />,
            id: 'id',
            event: (e) =>
              setEstados({
                ...estados,
                revisar: true,
                idActa: e.data?.id ?? '',
              }),
          },
          {
            tooltip: 'Aprobar acta',
            icon: <AprobarActaIcon />,
            id: 'id',
            event: (e) => console.log('Aprobar acta', e.data?.id ?? ''),
          },
        ]}
        loading={loading}
      />

      <Condicional condicion={estados.revisar}>
        <RevisarActa
          cerrar={() => setEstados({ ...estados, revisar: false })}
          idActa={estados.idActa}
        />
      </Condicional>

      <Condicional condicion={estados.filtrar}>
        <h1>Filtros</h1>
      </Condicional>
    </>
  );
};

export default ActasCliente;
