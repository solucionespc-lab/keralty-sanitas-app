import { useState, useTransition } from 'react';
import usePermisos from 'hooks/Permisos';
import Condicional from 'comunes/funcionales/Condicional';
import { Button } from 'comunes/controles/Buttons';
import { Tabla } from '@pc-component-ui-test-v2/tabla';
import { useSuspenseQuery } from '@apollo/client';

import { useFiltrosStore } from './store/FiltrosAutoStore';
import FiltrosAuditoria from './secciones/filtros/FiltrosAuditoria';
import CrearAutoevaluacion from './secciones/CrearAutoevaluacion';
import { EditIconTable } from './recursos/Iconografia';
import { validarDatosTabla } from './funciones/Funciones';

import { GET_EVALUACIONES } from './peticiones/Queries';
import styles from './estilos/EstGenAuditoria.module.css';

import type { Query } from './types/AutoevaluacionTypes';

const Autoevaluacion = () => {
  const { accesos } = usePermisos();
  const permisos = accesos.evaluaciones;
  const { annio, idEmpresa, idEvaluacion } = useFiltrosStore((state) => state);
  const [estados, setEstados] = useState({
    crear: false,
    editar: false,
    idEmpresa: '',
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

  return (
    <>
      <h1 className='titulo_modulos'>Autoevaluación</h1>
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
        </div>

        <div className={styles.acciones_principales}>
          <Button
            icon='update'
            name='Actualizar'
            sizeBtn='small'
            type='button'
            typeBtn='update'
            permisos={permisos}
            onClick={() => startTransition(() => refrescar())}
            loading={isPendind}
          />
          <Button
            icon='filter'
            name='Filtros'
            sizeBtn='small'
            type='button'
            typeBtn='filter'
            permisos={permisos}
            onClick={() => setEstados({ ...estados, filtrar: true })}
          />
        </div>
      </div>

      <Tabla
        id='tabla_evaluaciones'
        tableData={validarDatosTabla(data)}
        configurations={{
          tableColumns: [
            {
              label: 'Nombre empresa',
              key: 'riesgo',
              visible: true,
              styleConfig: { textAlign: 'start', color: 'var(--gray-1)' },
              rowStyleConfig: { textAlign: 'start' },
            },
            {
              label: 'Fecha realización',
              key: 'riesgo',
              visible: true,
              styleConfig: { textAlign: 'center', color: 'var(--gray-1)' },
              rowStyleConfig: { textAlign: 'center' },
            },
            {
              label: 'Puntaje total',
              key: 'riesgo',
              visible: true,
              styleConfig: { textAlign: 'center', color: 'var(--gray-1)' },
              rowStyleConfig: { textAlign: 'center' },
            },
            {
              label: 'Clasificación',
              key: 'riesgo',
              visible: true,
              styleConfig: { textAlign: 'center', color: 'var(--gray-1)' },
              rowStyleConfig: { textAlign: 'center' },
            },
          ],
          filters: tituloFiltros,
        }}
        controls={[
          {
            tooltip: 'Ver',
            icon: <EditIconTable />,
            id: 'id',
            event: (e) => console.log(e),
          },
          {
            tooltip: 'Descargar certificado',
            icon: <EditIconTable />,
            id: 'id',
            event: (e) => console.log(e),
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
        <h1>Editar Auditoria</h1>
        {/* <EditarAuditoria
          permisos={permisos}
          idAuditoria={estados.idAuditoria}
          idContratista={estados.idContratista}
          cerrar={() => setEstados({ ...estados, editar: false })}
        /> */}
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
