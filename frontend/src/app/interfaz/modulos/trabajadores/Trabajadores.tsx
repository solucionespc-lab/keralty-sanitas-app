// @ts-nocheck
import { buscarCodigoDeLista } from 'utilidades/FuncionesApp';
import { useState, useTransition } from 'react';
import usePermisos from 'hooks/Permisos';
import useListados from 'hooks/Listados';
import Condicional from 'comunes/funcionales/Condicional';
import { Button } from 'comunes/controles/Buttons';
import { Tabla } from '@pc-component-ui-test-v2/tabla';
import { useSuspenseQuery } from '@apollo/client';

import { tituloFiltro, useFiltrosStore } from './store/FiltrosStore';
import Filtros from './secciones/FiltrosTrabajadores';
import EditarTrabajador from './secciones/Editar';
import CrearTrabajador from './secciones/Crear';
import { iconografia } from './recursos/Iconografia';

import { GET_TRABAJADORES } from './peticiones/Queries';
import styles from './estilos/EstGenerales.module.css';

import type { IEstados, QueryTypeTrab } from './types/TrabajadoresTypes';

const Trabajadores = () => {
  const { ...filtros } = useFiltrosStore(({ ...filtros }) => ({ ...filtros }));
  const { data, error, refetch } = useSuspenseQuery<QueryTypeTrab>(
    GET_TRABAJADORES,
    {
      variables: {
        filtros,
      },
    }
  );
  const { accesos } = usePermisos();
  const { listas } = useListados();
  const [isPendind, startTransition] = useTransition();

  const [estados, setEstados] = useState<IEstados>({
    crear: false,
    editar: false,
    aplicaFiltro: false,
    importar: false,
    id: '',
  });

  const datosTabla = data?.getTrabajadores?.map((item) => ({
    ...item,
    gerencia: buscarCodigoDeLista(
      listas,
      'gerencias',
      'id',
      item?.gerencia,
      'value'
    ),
    fechaIngresoEmp:
      item?.fechaIngresoEmp?.split(' ')[0]?.split('-')?.reverse()?.join('/') ??
      '',
  }));

  const refrescar = () => {
    refetch();
  };

  return (
    <>
      <h1 className='titulo_modulos'>Trabajadores</h1>
      <div className={styles.contenedor_botones}>
        <Button
          name='Filtros'
          type='button'
          sizeBtn='normal'
          typeBtn='filter'
          icon='filter'
          permiso='escribir'
          permisos={accesos.trabajadores}
          onClick={() =>
            setEstados({ ...estados, aplicaFiltro: !estados.aplicaFiltro })
          }
        />
        <Button
          icon='update'
          name='Actualizar'
          sizeBtn='small'
          type='button'
          typeBtn='update'
          permiso='escribir'
          permisos={accesos.trabajadores}
          onClick={() => startTransition(() => refrescar())}
        />
        <Button
          name='Crear'
          type='button'
          sizeBtn='normal'
          typeBtn='primary'
          icon='new'
          permiso='escribir'
          permisos={accesos.trabajadores}
          onClick={() => setEstados({ ...estados, crear: true })}
        />
      </div>

      <Tabla
        id='tabla_trabajadores'
        tableData={datosTabla}
        configurations={{
          tableColumns: [
            {
              label: 'Documento de identidad',
              key: 'cedula',
              styleConfig: { textAlign: 'center', color: 'var(--brand-1)' },
              rowStyleConfig: { textAlign: 'center' },
            },
            {
              label: 'Nombre completo',
              key: 'nombre',
              styleConfig: { textAlign: 'start', color: 'var(--brand-1)' },
              rowStyleConfig: { textAlign: 'start' },
            },
            {
              label: 'Fecha ingreso',
              key: 'fechaIngresoEmp',
              styleConfig: { textAlign: 'center', color: 'var(--brand-1)' },
              rowStyleConfig: { textAlign: 'center' },
            },
            {
              label: 'Gerencia',
              key: 'gerencia',
              styleConfig: { textAlign: 'center', color: 'var(--brand-1)' },
              rowStyleConfig: { textAlign: 'center' },
            },
          ],
          filters: tituloFiltro(),
        }}
        controls={[
          {
            tooltip: 'Editar',
            icon: iconografia.editar.path,
            event: ({ data: e }) => {
              setEstados({
                ...estados,
                editar: true,
                id: e?.idTrabajador ?? '',
              });
            },
            id: 'idTrabajador',
          },
        ]}
        error={error}
        loading={isPendind}
      />
      <Condicional condicion={estados.crear}>
        <CrearTrabajador
          cerrar={() => setEstados({ ...estados, crear: false })}
        />
      </Condicional>

      <Condicional condicion={estados.editar}>
        <EditarTrabajador
          idTrabajador={estados?.id}
          cerrar={() => setEstados({ ...estados, editar: false })}
        />
      </Condicional>

      <Condicional condicion={estados.aplicaFiltro}>
        <Filtros
          close={() => setEstados({ ...estados, aplicaFiltro: false })}
        />
      </Condicional>
    </>
  );
};

export default Trabajadores;
