import { toast } from 'sonner';
import { useState, useTransition } from 'react';
import usePermisos from 'hooks/Permisos';
import ModalFiltro from 'comunes/funcionales/modalFiltros/ModalFiltro';
import FormModal from 'comunes/funcionales/forms/Form';
import Condicional from 'comunes/funcionales/Condicional';
import { Button } from 'comunes/controles/Buttons';
import correrMicroservicio from 'cloud_functions/CorrerInforme';
import { Tabla } from '@pc-component-ui-test-v2/tabla';
import { useSuspenseQuery } from '@apollo/client';

import { useFiltrosEmpStore } from './store/StoreAutoevaluacion';
import EditarEmpresa from './secciones/EditarEmpresa';
import CrearEmpresa from './secciones/CrearEmpresa';
import { EnvioCorreosIcon, VerRegistro } from './recursos/Iconografia';

import { GET_EMPRESAS } from './peticiones/Queries';
import styles from './estilos/Generales.module.css';

import type { pdfDatosType, QueryEmpresas } from './types/EmpresaTypes';

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
    GET_EMPRESAS,
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
      <h1 className='titulo_modulos'>Autoevalución</h1>
      <div className={styles.contenedor_botones}>
        <Button
          icon='new'
          name='Crear autoevaluación'
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
              label: 'Estado de la evaluación',
              key: 'activo',
              styleConfig: { textAlign: 'center', color: 'var(--brand-1)' },
              rowStyleConfig: { textAlign: 'center' },
            },
          ],
        }}
        controls={[
          {
            tooltip: 'Ver información',
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
            tooltip: 'Enviar autoevaluación',
            icon: EnvioCorreosIcon(),
            event: () => {
              toast.promise(
                correrMicroservicio<pdfDatosType>('generarPdf', {
                  nombreEmpresa:
                    'Soluciones en epidemiología y salud ocupacional pc',
                  year: 2024,
                  calificacion: 95,
                  interpretacion: 'ACEPTABLE',
                }),
                {
                  loading: 'Generando certificado',
                  success: (data) => data,
                  error: (data) => data,
                }
              );
            },
            id: 'id',
          },
        ]}
        error={error}
        loading={isPendind}
      />

      <Condicional condicion={estados.crearEmpresa}>
        <FormModal
          tittle='Registrar empresa'
          close={() => setEstados({ ...estados, crearEmpresa: false })}
          buttons={[
            <Button
              key='button-1'
              name='Registrar'
              type='button'
              sizeBtn='normal'
              typeBtn='primary'
              icon='new'
              permiso='escribir'
              permisos={accesos.empresas}
            />,
          ]}
        >
          <CrearEmpresa />
        </FormModal>
      </Condicional>

      <Condicional condicion={estados.editarRegistro}>
        <FormModal
          tittle='Editar empresa'
          close={() => setEstados({ ...estados, editarRegistro: false })}
          buttons={[
            <Button
              key='button-1'
              name='Actualizar'
              type='button'
              sizeBtn='normal'
              typeBtn='primary'
              icon='new'
              permisos={accesos.empresas}
            />,
          ]}
        >
          <EditarEmpresa id={estados.idEmpresa} />
        </FormModal>
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
