import { useState, useEffect } from 'react';
import { useAutoevaluacion } from 'modulos/autoevaluacion/store/AutoevaluacionStore';
import {
  notasAuditoria,
  resultadoAuditoria,
} from 'modulos/autoevaluacion/funciones/Funciones';

import styles from '../../estilos/EstAutoevaluaciones.module.css';

const ResultadoAuditorias = () => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const unSubs = useAutoevaluacion.subscribe(({ puntajeTotal }) => {
      setTotal(Number(puntajeTotal));
    });

    return unSubs;
  }, []);

  const interpretacion = resultadoAuditoria(total);

  return (
    <main>
      <section
        style={{ alignItems: 'center', padding: '0.5em 0' }}
        className={styles.contenedor_flex}
      >
        <h4>Calificación y estado - </h4>
        <div className={styles.calificacion}>
          <span className={styles[interpretacion.toLocaleLowerCase()]}>
            {interpretacion === 'Critico' ? 'Crítico' : interpretacion}
          </span>
          <span
            className={`${styles.puntaje} ${styles.sin_calculo}`}
          >{`${total === 100 ? 'Completo' : 'Incompleto'}`}</span>
        </div>
      </section>

      <small style={{ padding: '0.5em 0' }}>
        {notasAuditoria(interpretacion)}
      </small>
    </main>
  );
};

export default ResultadoAuditorias;
