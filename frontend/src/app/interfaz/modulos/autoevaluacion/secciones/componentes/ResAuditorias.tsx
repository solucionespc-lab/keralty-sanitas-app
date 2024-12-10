import { useEffect, useState } from 'react';
// import { resultadoAuditoria } from 'modulos/auditorias/funciones/Funciones';

import { useAutoevaluacion } from 'modulos/autoevaluacion/store/AutoevaluacionStore';

import styles from '../../estilos/EstAutoevaluaciones.module.css';

const ResultadoAuditorias = () => {
  const [total, setTotal] = useState(0);
  // const interpretacion = resultadoAuditoria(total);

  useEffect(() => {
    const unSubs = useAutoevaluacion.subscribe(({ puntajeTotal }) => {
      const proporcion = puntajeTotal;
      setTotal(Number(proporcion));
    });

    return unSubs;
  }, []);

  return (
    <section className={styles.calificacion}>
      <h4>Calificación</h4>
      <div>
        <p
          className={`${styles.puntaje} ${styles.sin_calculo}`}
        >{`${total}`}</p>
        {/* <span className={styles[interpretacion.toLocaleLowerCase()]}>
          {interpretacion}
        </span> */}
      </div>
    </section>
  );
};

export default ResultadoAuditorias;
