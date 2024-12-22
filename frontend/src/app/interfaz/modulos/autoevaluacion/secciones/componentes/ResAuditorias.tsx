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
    <section>
      <h4>Calificación</h4>
      <div className={styles.calificacion}>
        <p
          className={`${styles.puntaje} ${styles.sin_calculo}`}
        >{`${total}%`}</p>
        <span className={styles[interpretacion.toLocaleLowerCase()]}>
          {interpretacion === 'Critico' ? 'Crítico' : interpretacion}
        </span>
      </div>
      <small>{notasAuditoria(interpretacion)}</small>
    </section>
  );
};

export default ResultadoAuditorias;
