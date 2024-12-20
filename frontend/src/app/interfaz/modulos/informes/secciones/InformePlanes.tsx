import { Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { Titulo } from 'comunes/estilos/EstComunes';
import Text from 'comunes/controles/Text';
import Date from 'comunes/controles/Date';
import { useSuspenseQuery } from '@apollo/client';
import { saveAs } from 'file-saver';

import { Query } from '../types/InformesTypes';
import { useFiltrosStore } from '../store/FiltrosInformeStore';

import { GET_PLANES } from '../peticiones/Queries';
import styles from '../estilos/EstInformePlanes.module.css';
import { nanoid } from 'nanoid';
import { exportarPlanes } from '../utilidades/Exportar';
import { DescargarExcelIcon } from '../recursos/Iconografia';

const InformePlanes = () => {
  const { annio, idEmpresa, idEvaluacion } = useFiltrosStore((state) => state);

  // TODO: Implementar correctamente los planes de acción, estos deben guardarse en la coleccion planes accion
  const { data } = useSuspenseQuery<Query>(GET_PLANES, {
    variables: {
      filtros: { idEmpresa, annio, idEvaluacion },
    },
  });

  const planesCompletos = data.getEvaluaciones[0].cuestionario.filter(
    ({ plan }) => plan !== ''
  );

  return (
    <main className={styles.contenedor_planes}>
      <button
        className={styles.boton_exportar}
        onClick={async () => {
          const { archivo, nombre } = await exportarPlanes(planesCompletos);
          saveAs(archivo, nombre);
        }}
      >
        <DescargarExcelIcon />
        <span>Exportar a Excel</span>
      </button>

      {planesCompletos.map((evaluacion) => (
        <Fragment key={nanoid()}>
          <section className={styles.contenedor_plan}>
            <Titulo style={{ textAlign: 'left' }}>
              Descripción del plan de acción
            </Titulo>
            <p style={{ textWrap: 'stable' }}>{evaluacion.plan}</p>

            <section className={styles.contenedor_informacion}>
              <Date
                label='Fecha de compromiso'
                onChange={() => console.log('cambio')}
              />
              <Date
                label='Fecha de ejecución'
                onChange={() => console.log('cambio')}
              />
            </section>
            <Text label='Responsable(s)' />
          </section>
        </Fragment>
      ))}
    </main>
  );
};

export default InformePlanes;
