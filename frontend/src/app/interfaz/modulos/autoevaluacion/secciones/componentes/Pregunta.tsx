// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { nanoid } from 'nanoid';

import { guardarRespuesta } from '../../store/AutoevaluacionStore';
import Observaciones from './Observaciones';

import styles from '../../estilos/EstCuestionario.module.css';

import type { PreguntaEvaluacionType } from '../../types/AutoevaluacionTypes';

const Pregunta = ({
  preguntas,
}: {
  preguntas: PreguntaEvaluacionType[] | undefined;
}) => {
  return (
    <>
      {preguntas?.map((preg) => (
        <section key={preg.item} className={styles.seccion_cuestionario}>
          <details open className={styles.preguntas}>
            <summary className={styles.summary}>
              <h4 className={styles.estandar}>
                {preg?.item ?? 'sin información'}
              </h4>
              <div className={styles.contenedor_respuestas}>
                <label className={styles.cumple}>
                  <input
                    value='cumple'
                    name={nanoid()}
                    checked={preg?.respuesta === 'cumple'}
                    type='radio'
                    onChange={(e) =>
                      guardarRespuesta(
                        `${preg?.ciclo}_${preg?.orden}`,
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
                    checked={preg?.respuesta === 'no_cumple'}
                    type='radio'
                    onChange={(e) =>
                      guardarRespuesta(
                        `${preg?.ciclo}_${preg?.orden}`,
                        'respuesta',
                        e.target.value
                      )
                    }
                  />
                  No cumple
                </label>
              </div>
            </summary>

            <p>{preg?.modo ?? 'Sin información'}</p>

            <Observaciones
              idCiclo={`${preg?.ciclo}_${preg?.orden}`}
              label='Observaciones'
              value={preg?.observaciones}
            />

            <input style={{ marginTop: '1em' }} type='file' />
          </details>
        </section>
      ))}
    </>
  );
};

export default Pregunta;
