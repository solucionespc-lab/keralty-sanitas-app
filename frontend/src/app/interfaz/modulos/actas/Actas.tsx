import { useState, useTransition } from 'react';
import usePermisos from 'hooks/Permisos';
import Condicional from 'comunes/funcionales/Condicional';
import { Button } from 'comunes/controles/Buttons';
import { Tabla } from '@pc-component-ui-test-v2/tabla';

import styles from './estilos/Generales.module.css';

const Actas = () => {
  const { accesos } = usePermisos();
  const [estados, setEstados] = useState({
    crear: false,
    editar: false,
    filtrar: false,
  });
  const [isPendind, startTransition] = useTransition();

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
            onClick={() => startTransition(() => console.log('actualizar'))}
            loading={isPendind}
          />
        </div>
      </div>

      <Tabla
        id='tabla_evaluaciones'
        tableData={[]}
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
        loading={isPendind}
      />

      <Condicional condicion={estados.crear}>
        <h1>Crear evaluación</h1>
      </Condicional>

      <Condicional condicion={estados.filtrar}>
        <h1>Filtros</h1>
      </Condicional>
    </>
  );
};

export default Actas;
