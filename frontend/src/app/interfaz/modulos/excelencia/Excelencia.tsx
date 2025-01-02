import { useShallow } from 'zustand/react/shallow';
import { useUserStore } from 'store/PrincipalStore';
import { useEffect, useState, useTransition } from 'react';
import usePermisos from 'hooks/Permisos';
import Condicional from 'comunes/funcionales/Condicional';
import { Button } from 'comunes/controles/Buttons';
import { Tabla } from '@pc-component-ui-test-v2/tabla';
import { useSuspenseQuery } from '@apollo/client';

import { validarDatosTabla } from './utilidades/Funciones';
import { FiltrosType, Query } from './types/ExcelenciaTypes';
import { guardarDatosEmpresa } from './store/StoreExcelencia';
import { useFiltrosStore } from './store/FiltrosStore';
import FiltrosExcelencia from './secciones/filtros/FiltrosExcelencia';
import CrearExcelencia from './secciones/CrearExcelencia';

import { GET_EVALUACIONES_EXCELENCIA } from './peticiones/Queries';
import styles from './estilos/EstGenAuditoria.module.css';

const Autoevaluacion = () => {
  const { usuario } = useUserStore();
  const { accesos } = usePermisos();
  const filtros = useFiltrosStore(useShallow((state) => state));
  const [estados, setEstados] = useState({
    crear: false,
    editar: false,
    filtrar: false,
  });
  const [isPendind, startTransition] = useTransition();

  const { data, error, refetch } = useSuspenseQuery<Query, FiltrosType>(
    GET_EVALUACIONES_EXCELENCIA,
    {
      variables: {
        idEmpresa: usuario?.claims.idEmpresa ?? '',
        filtros: {
          fechaInicio: filtros.fechaInicio,
          fechaFin: filtros.fechaFin,
          annio: filtros.annio,
        },
      },
    }
  );

  const refrescar = () => {
    refetch();
  };

  useEffect(() => {
    guardarDatosEmpresa(
      data.getExcelencia[0].empresa,
      usuario?.claims.idEmpresa ?? ''
    );
  }, []);

  return (
    <>
      <h1 className='titulo_modulos'>
        Diagnóstico inicial excelencia organizacional
      </h1>
      <div className={styles.botones_contenedor}>
        <div className={styles.acciones_principales}>
          <Button
            icon='new'
            name='Diligenciar evaluación de excelencia'
            sizeBtn='small'
            type='button'
            typeBtn='primary'
            permiso='escribir'
            permisos={accesos.excelencia}
            onClick={() => setEstados({ ...estados, crear: true })}
          />
        </div>

        <div className={styles.acciones_principales}>
          <Button
            icon='update'
            name='Actualizar tabla'
            sizeBtn='small'
            type='button'
            typeBtn='update'
            permisos={accesos.excelencia}
            onClick={() => startTransition(() => refrescar())}
            loading={isPendind}
          />
        </div>
      </div>

      <Tabla
        id='tabla_evaluaciones'
        tableData={validarDatosTabla(data.getExcelencia)}
        configurations={{
          tableColumns: [
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
        }}
        controls={[]}
        error={error}
        loading={isPendind}
      />

      <Condicional condicion={estados.crear}>
        <CrearExcelencia
          cerrar={() => setEstados({ ...estados, crear: false })}
        />
      </Condicional>

      <Condicional condicion={estados.filtrar}>
        <FiltrosExcelencia
          close={() => setEstados({ ...estados, filtrar: false })}
        />
      </Condicional>
    </>
  );
};

export default Autoevaluacion;
