import { nanoid } from 'nanoid';

import { guardarRespuesta } from '../../store/AutoevaluacionStore';

import styles from '../../estilos/EstCuestionario.module.css';

import type { PreguntaEvaluacionType } from '../../types/AutoevaluacionTypes';

const Pregunta = ({
  pregunta,
}: {
  pregunta: PreguntaEvaluacionType | undefined;
}) => {
  return (
    <section className={styles.seccion_cuestionario}>
      <details open key={nanoid()} className={styles.preguntas}>
        <summary className={styles.summary}>
          <h4 className={styles.estandar}>
            {pregunta?.item ?? 'sin información'}
          </h4>
          <div className={styles.contenedor_respuestas}>
            <label className={styles.cumple}>
              <input
                value='cumple'
                name={nanoid()}
                checked={pregunta?.respuesta === 'cumple'}
                type='radio'
                onChange={(e) =>
                  guardarRespuesta(
                    `${pregunta?.ciclo}_${pregunta?.orden}`,
                    'respuesta',
                    e.target.value
                  )
                }
              />
              Cumple
            </label>

            <label className={styles.no_cumple}>
              <input
                value='no_cumple'
                name={nanoid()}
                checked={pregunta?.respuesta === 'no_cumple'}
                type='radio'
                onChange={(e) =>
                  guardarRespuesta(
                    `${pregunta?.ciclo}_${pregunta?.orden}`,
                    'respuesta',
                    e.target.value
                  )
                }
              />
              No cumple
            </label>
          </div>
        </summary>
        <p>{pregunta?.modo ?? 'Sin información'}</p>
      </details>
    </section>
  );
};

export default Pregunta;
