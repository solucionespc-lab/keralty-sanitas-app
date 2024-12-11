import { useState, useEffect } from 'react';
import { useAutoevaluacion } from 'modulos/autoevaluacion/store/AutoevaluacionStore';
import { resultadoAuditoria } from 'modulos/autoevaluacion/funciones/Funciones';

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
    <section className={styles.calificacion}>
      <h4>Calificación</h4>
      <div>
        <p
          className={`${styles.puntaje} ${styles.sin_calculo}`}
        >{`${total}%`}</p>
        <span className={styles[interpretacion.toLocaleLowerCase()]}>
          {interpretacion === 'Critico' ? 'Crítico' : interpretacion}
        </span>
      </div>
    </section>
  );
};

export default ResultadoAuditorias;
