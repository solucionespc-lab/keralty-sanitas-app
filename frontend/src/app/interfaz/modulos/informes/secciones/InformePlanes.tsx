import { useState } from 'react';
import useListados from 'hooks/Listados';
import { Subtitulo } from 'comunes/estilos/EstComunes';
import Text from 'comunes/controles/Text';
import Date from 'comunes/controles/Date';

import { PlanType } from '../types/InformesTypes';

import styles from '../estilos/EstInformePlanes.module.css';

const InformePlanes = ({ plan }: PlanType) => {
  const { listas } = useListados();
  const [fechaCompromiso, setFechaCompromiso] = useState('');

  return (
    <section className={styles.contenedor_plan}>
      <section className={styles.contenedor_informacion}>
        <p className={styles.etiqueta_primaria}>{plan.ciclo}</p>
        <p className={styles.etiqueta_secundaria}>
          {listas.estandares[plan.estandar]}
        </p>
      </section>

      <Subtitulo style={{ textAlign: 'left' }}>
        Descripción del plan de acción
      </Subtitulo>
      <p style={{ textWrap: 'balance' }}>{plan.planAccion}</p>

      <section className={styles.contenedor_informacion}>
        <Date
          label='Fecha de compromiso'
          onChange={(e) => setFechaCompromiso(e.target.value)}
        />
        <Date
          min={fechaCompromiso}
          label='Fecha de ejecución'
          onChange={() => console.log('cambio')}
        />
      </section>
      <Text label='Responsable' />
    </section>
  );
};

export default InformePlanes;
