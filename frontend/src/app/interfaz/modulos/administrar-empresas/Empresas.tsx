import { useState, useTransition } from 'react';
import usePermisos from 'hooks/Permisos';
import ModalFiltro from 'comunes/funcionales/modalFiltros/ModalFiltro';
import Condicional from 'comunes/funcionales/Condicional';
import { Button } from 'comunes/controles/Buttons';
import { Tabla } from '@pc-component-ui-test-v2/tabla';
import { useSuspenseQuery } from '@apollo/client';

import { useFiltrosEmpStore } from './store/StoreEmpresas';
import EditarEmpresa from './secciones/EditarEmpresa';
import CrearEmpresa from './secciones/CrearEmpresa';
import { EnvioCorreosIcon, VerRegistro } from './recursos/Iconografia';

import { GET_EMPRESA } from './peticiones/Queries';
import styles from './estilos/Generales.module.css';

import type { QueryEmpresas } from './types/EmpresaTypes';

const Empresas = () => {
  const { accesos } = usePermisos();
  const filtros = useFiltrosEmpStore((state) => state);
  const [isPendind, startTransition] = useTransition();
  const [estados, setEstados] = useState({
    filtrar: false,
    editarRegistro: false,
    crearEmpresa: false,
    idEmpresa: '',
    nombreEmpresa: '',
    Nit: '',
  });

  const { data, error, refetch } = useSuspenseQuery<QueryEmpresas>(
    GET_EMPRESA,
    {
      variables: {
        filtros: { ...filtros },
      },
    }
  );

  const refrescar = () => {
    refetch();
  };

  return (
    <>
      <h1 className='titulo_modulos'>Administrar empresas</h1>
      <div className={styles.contenedor_botones}>
        <Button
          icon='new'
          name='Agregar empresa'
          sizeBtn='small'
          type='button'
          typeBtn='primary'
          permiso='escribir'
          permisos={accesos.empresas}
          onClick={() => setEstados({ ...estados, crearEmpresa: true })}
        />
        <Button
          icon='filter'
          name='Filtros'
          sizeBtn='normal'
          type='button'
          typeBtn='filter'
          permiso='escribir'
          permisos={accesos.empresas}
          onClick={() => setEstados({ ...estados, filtrar: true })}
        />
        <Button
          icon='update'
          name='Actualizar'
          sizeBtn='small'
          type='button'
          typeBtn='update'
          permisos={accesos.empresas}
          onClick={() => startTransition(() => refrescar())}
        />
      </div>

      <Tabla
        id='tabla_contratistas'
        tableData={data.getEmpresas}
        configurations={{
          tableColumns: [
            {
              label: 'NIT',
              key: 'nit',
              styleConfig: { textAlign: 'center', color: 'var(--brand-1)' },
              rowStyleConfig: { textAlign: 'center' },
            },
            {
              label: 'Nombre',
              key: 'nombre',
              styleConfig: { textAlign: 'start', color: 'var(--brand-1)' },
              rowStyleConfig: { textAlign: 'start' },
            },
            {
              label: 'Estado',
              key: 'activo',
              styleConfig: { textAlign: 'center', color: 'var(--brand-1)' },
              rowStyleConfig: { textAlign: 'center' },
            },
          ],
        }}
        controls={[
          {
            tooltip: 'Editar información',
            icon: VerRegistro(),
            event: ({ data: e }) => {
              setEstados({
                ...estados,
                editarRegistro: true,
                idEmpresa: e?.id ?? '',
              });
            },
            id: 'id',
          },
          {
            tooltip: 'Enviar enlace acceso',
            icon: EnvioCorreosIcon(),
            event: ({ data: e }) => console.log(e),
            id: 'id',
          },
        ]}
        error={error}
        loading={isPendind}
      />

      <Condicional condicion={estados.crearEmpresa}>
        <CrearEmpresa />
      </Condicional>

      <Condicional condicion={estados.editarRegistro}>
        <EditarEmpresa id={estados.idEmpresa} />
      </Condicional>

      <Condicional condicion={estados.filtrar}>
        <ModalFiltro
          functions={{
            close: () => setEstados({ ...estados, filtrar: false }),
            apply: () => {
              console.log('filtro aplicado');
            },
            delete: () => {
              console.log('Borrar filtro');
            },
          }}
        >
          <p>hola</p>
        </ModalFiltro>
      </Condicional>
    </>
  );
};

export default Empresas;
