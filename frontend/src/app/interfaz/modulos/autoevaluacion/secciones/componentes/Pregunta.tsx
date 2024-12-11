import { useShallow } from 'zustand/react/shallow';
import { nanoid } from 'nanoid';
import { clasificarPreguntas } from 'modulos/autoevaluacion/funciones/Funciones';
import { Subtitulo } from 'comunes/estilos/EstComunes';

import {
  guardarRespuesta,
  useCuestionario,
} from '../../store/AutoevaluacionStore';

import styles from '../../estilos/EstCuestionario.module.css';

import type { PreguntaEvaluacionType } from '../../types/AutoevaluacionTypes';

const Pregunta = ({ preguntas }: { preguntas: PreguntaEvaluacionType[] }) => {
  const { respuesta } = useCuestionario(
    useShallow(({ respuesta }) => ({
      respuesta,
    }))
  );

  const { planear, hacer, verificar, actuar } = clasificarPreguntas(
    Object.values(preguntas)
  );

  return (
    <main className={styles.contenedor_cuestionario}>
      <section className={styles.seccion_cuestionario}>
        <Subtitulo>Planear</Subtitulo>
        {planear.map((dato) => (
          <details open key={nanoid()} className={styles.preguntas}>
            <summary className={styles.summary}>
              <h4>{dato.estandar}</h4>
              <div className={styles.contenedor_respuestas}>
                <label className={styles.cumple}>
                  <input
                    value='Cumple'
                    checked={respuesta === 'Cumple'}
                    name={`${nanoid()}`}
                    type='radio'
                    onChange={(e) =>
                      guardarRespuesta(dato.codigo, 'respuesta', e.target.value)
                    }
                  />
                  Cumple
                </label>

                <label className={styles.no_cumple}>
                  <input
                    value='No cumple'
                    checked={respuesta === 'No cumple'}
                    name={`${nanoid()}`}
                    type='radio'
                    onChange={(e) =>
                      guardarRespuesta(e.target.value, dato.codigo)
                    }
                  />
                  No cumple
                </label>

                <label className={styles.no_aplica}>
                  <input
                    value='No aplica'
                    checked={respuesta === 'No aplica'}
                    name={`${nanoid()}`}
                    type='radio'
                    onChange={(e) =>
                      guardarRespuesta(e.target.value, dato.codigo)
                    }
                  />
                  No aplica
                </label>
              </div>
            </summary>
            <h4 style={{ marginTop: '1em' }}>{dato.item}</h4>
            <p>{dato.criterio}</p>
            <p>{dato.modo}</p>
          </details>
        ))}
      </section>

      <section className={styles.seccion_cuestionario}>
        <Subtitulo>Hacer</Subtitulo>
        {hacer.map((dato) => (
          <details key={nanoid()} className={styles.preguntas}>
            <summary className={styles.summary}>
              <h4>{dato.estandar}</h4>
              <div className={styles.contenedor_respuestas}>
                <label className={styles.cumple}>
                  <input
                    value='Cumple'
                    checked={respuesta === 'Cumple'}
                    name={`${nanoid()}`}
                    type='radio'
                    onChange={(e) =>
                      guardarRespuesta(e.target.value, dato.codigo)
                    }
                  />
                  Cumple
                </label>

                <label className={styles.no_cumple}>
                  <input
                    value='No cumple'
                    checked={respuesta === 'No cumple'}
                    name={`${nanoid()}`}
                    type='radio'
                    onChange={(e) =>
                      guardarRespuesta(e.target.value, dato.codigo)
                    }
                  />
                  No cumple
                </label>

                <label className={styles.no_aplica}>
                  <input
                    value='No aplica'
                    checked={respuesta === 'No aplica'}
                    name={`${nanoid()}`}
                    type='radio'
                    onChange={(e) =>
                      guardarRespuesta(e.target.value, dato.codigo)
                    }
                  />
                  No aplica
                </label>
              </div>
            </summary>
            <h4 style={{ marginTop: '1em' }}>{dato.item}</h4>
            <p>{dato.criterio}</p>
            <p>{dato.modo}</p>
          </details>
        ))}
      </section>

      <section className={styles.seccion_cuestionario}>
        <Subtitulo>Verificar</Subtitulo>
        {verificar.map((dato) => (
          <details key={nanoid()} className={styles.preguntas}>
            <summary className={styles.summary}>
              <h4>{dato.estandar}</h4>
              <div className={styles.contenedor_respuestas}>
                <label className={styles.cumple}>
                  <input
                    value='Cumple'
                    checked={respuesta === 'Cumple'}
                    name={`${nanoid()}`}
                    type='radio'
                    onChange={(e) =>
                      guardarRespuesta(e.target.value, dato.codigo)
                    }
                  />
                  Cumple
                </label>

                <label className={styles.no_cumple}>
                  <input
                    value='No cumple'
                    checked={respuesta === 'No cumple'}
                    name={`${nanoid()}`}
                    type='radio'
                    onChange={(e) =>
                      guardarRespuesta(e.target.value, dato.codigo)
                    }
                  />
                  No cumple
                </label>

                <label className={styles.no_aplica}>
                  <input
                    value='No aplica'
                    checked={respuesta === 'No aplica'}
                    name={`${nanoid()}`}
                    type='radio'
                    onChange={(e) =>
                      guardarRespuesta(e.target.value, dato.codigo)
                    }
                  />
                  No aplica
                </label>
              </div>
            </summary>
            <h4 style={{ marginTop: '1em' }}>{dato.item}</h4>
            <p>{dato.criterio}</p>
            <p>{dato.modo}</p>
          </details>
        ))}
      </section>

      <section className={styles.seccion_cuestionario}>
        <Subtitulo>Actuar</Subtitulo>
        {actuar.map((dato) => (
          <details key={nanoid()} className={styles.preguntas}>
            <summary className={styles.summary}>
              <h4>{dato.estandar}</h4>
              <div className={styles.contenedor_respuestas}>
                <label className={styles.cumple}>
                  <input
                    value='Cumple'
                    checked={respuesta === 'Cumple'}
                    name={`${nanoid()}`}
                    type='radio'
                    onChange={(e) =>
                      guardarRespuesta(e.target.value, dato.codigo)
                    }
                  />
                  Cumple
                </label>

                <label className={styles.no_cumple}>
                  <input
                    value='No cumple'
                    checked={respuesta === 'No cumple'}
                    name={`${nanoid()}`}
                    type='radio'
                    onChange={(e) =>
                      guardarRespuesta(e.target.value, dato.codigo)
                    }
                  />
                  No cumple
                </label>

                <label className={styles.no_aplica}>
                  <input
                    value='No aplica'
                    checked={respuesta === 'No aplica'}
                    name={`${nanoid()}`}
                    type='radio'
                    onChange={(e) =>
                      guardarRespuesta(e.target.value, dato.codigo)
                    }
                  />
                  No aplica
                </label>
              </div>
            </summary>
            <h4 style={{ marginTop: '1em' }}>{dato.item}</h4>
            <p>{dato.criterio}</p>
            <p>{dato.modo}</p>
          </details>
        ))}
      </section>
    </main>
  );
};

export default Pregunta;
