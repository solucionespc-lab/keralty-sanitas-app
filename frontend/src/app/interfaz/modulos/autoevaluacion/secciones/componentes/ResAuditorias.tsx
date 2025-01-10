import { useState, useEffect } from 'react';
import { useAutoevaluacion } from 'modulos/autoevaluacion/store/AutoevaluacionStore';
import { EstadoIcon } from 'modulos/autoevaluacion/recursos/Iconografia';
import {
  notasAuditoria,
  resultadoAuditoria,
} from 'modulos/autoevaluacion/funciones/Funciones';

import styles from '../../estilos/EstAutoevaluaciones.module.css';

const ResultadoAuditorias = () => {
  const [tablero, setTablero] = useState({ total: 0, estado: 'parcial' });

  useEffect(() => {
    const unSubs = useAutoevaluacion.subscribe(({ puntajeTotal, estado }) => {
      setTablero({ total: Number(puntajeTotal), estado });
    });

    return unSubs;
  }, []);

  const interpretacion = resultadoAuditoria(tablero.total);

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
          <div
            style={{ justifyContent: 'center', alignItems: 'center' }}
            className={styles.contenedor_flex}
          >
            <EstadoIcon />
            <p>{tablero.estado}</p>
          </div>
        </div>
      </section>

      <small style={{ padding: '0.5em 0' }}>
        {notasAuditoria(interpretacion)}
      </small>
    </main>
  );
};

export default ResultadoAuditorias;
