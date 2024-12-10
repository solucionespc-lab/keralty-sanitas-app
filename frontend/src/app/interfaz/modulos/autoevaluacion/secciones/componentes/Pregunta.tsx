import { useShallow } from 'zustand/react/shallow';
import { memo } from 'react';
import { nanoid } from 'nanoid';
import { clasificarPreguntas } from 'modulos/autoevaluacion/funciones/Funciones';
import { Subtitulo } from 'comunes/estilos/EstComunes';

import { useCuestionario } from '../../store/AutoevaluacionStore';

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
    <main>
      <section>
        <Subtitulo>Planear</Subtitulo>
        {planear.map((dato) => (
          <details open key={nanoid()} className={styles.preguntas}>
            <summary className={styles.summary}>
              <h4>{dato.estandar}</h4>
              <div className={styles.contenedor_respuestas}>
                <label className={styles.respuesta_si}>
                  <input
                    value='Cumple'
                    checked={respuesta === 'Cumple'}
                    name={`${nanoid()}`}
                    type='radio'
                    onChange={(e) => console.log(e.target.value)}
                  />
                  Cumple
                </label>

                <label className={styles.respuesta_no}>
                  <input
                    value='No cumple'
                    checked={respuesta === 'No cumple'}
                    name={`${nanoid()}`}
                    type='radio'
                    onChange={(e) => console.log(e.target.value)}
                  />
                  No cumple
                </label>

                <label className={styles.respuesta_na}>
                  <input
                    checked={respuesta === 'No aplica'}
                    name={`${nanoid()}`}
                    type='radio'
                    onChange={(e) => console.log(e.target.value)}
                  />
                  No aplica
                </label>
              </div>
            </summary>
            <h4>{dato.item}</h4>
            <p>{dato.criterio}</p>
            <p>{dato.modo}</p>
          </details>
        ))}
      </section>

      <section>
        <Subtitulo>Hacer</Subtitulo>
        {hacer.map((dato) => (
          <details key={nanoid()} className={styles.preguntas}>
            <summary className={styles.summary}>
              <h4>{dato.estandar}</h4>
              <div className={styles.contenedor_respuestas}>
                <label className={styles.respuesta_si}>
                  <input
                    value='Cumple'
                    checked={respuesta === 'Cumple'}
                    name={`${nanoid()}`}
                    type='radio'
                    onChange={(e) => console.log(e.target.value)}
                  />
                  Cumple
                </label>

                <label className={styles.respuesta_no}>
                  <input
                    value='No cumple'
                    checked={respuesta === 'No cumple'}
                    name={`${nanoid()}`}
                    type='radio'
                    onChange={(e) => console.log(e.target.value)}
                  />
                  No cumple
                </label>

                <label className={styles.respuesta_na}>
                  <input
                    checked={respuesta === 'No aplica'}
                    name={`${nanoid()}`}
                    type='radio'
                    onChange={(e) => console.log(e.target.value)}
                  />
                  No aplica
                </label>
              </div>
            </summary>
            <h4>{dato.item}</h4>
            <p>{dato.criterio}</p>
            <p>{dato.modo}</p>
          </details>
        ))}
      </section>

      <section>
        <Subtitulo>Verificar</Subtitulo>
        {verificar.map((dato) => (
          <details key={nanoid()} className={styles.preguntas}>
            <summary className={styles.summary}>
              <h4>{dato.estandar}</h4>
              <div className={styles.contenedor_respuestas}>
                <label className={styles.respuesta_si}>
                  <input
                    value='Cumple'
                    checked={respuesta === 'Cumple'}
                    name={`${nanoid()}`}
                    type='radio'
                    onChange={(e) => console.log(e.target.value)}
                  />
                  Cumple
                </label>

                <label className={styles.respuesta_no}>
                  <input
                    value='No cumple'
                    checked={respuesta === 'No cumple'}
                    name={`${nanoid()}`}
                    type='radio'
                    onChange={(e) => console.log(e.target.value)}
                  />
                  No cumple
                </label>

                <label className={styles.respuesta_na}>
                  <input
                    checked={respuesta === 'No aplica'}
                    name={`${nanoid()}`}
                    type='radio'
                    onChange={(e) => console.log(e.target.value)}
                  />
                  No aplica
                </label>
              </div>
            </summary>
            <h4>{dato.item}</h4>
            <p>{dato.criterio}</p>
            <p>{dato.modo}</p>
          </details>
        ))}
      </section>

      <section>
        <Subtitulo>Actuar</Subtitulo>
        {actuar.map((dato) => (
          <details key={nanoid()} className={styles.preguntas}>
            <summary className={styles.summary}>
              <h4>{dato.estandar}</h4>
              <div className={styles.contenedor_respuestas}>
                <label className={styles.respuesta_si}>
                  <input
                    value='Cumple'
                    checked={respuesta === 'Cumple'}
                    name={`${nanoid()}`}
                    type='radio'
                    onChange={(e) => console.log(e.target.value)}
                  />
                  Cumple
                </label>

                <label className={styles.respuesta_no}>
                  <input
                    value='No cumple'
                    checked={respuesta === 'No cumple'}
                    name={`${nanoid()}`}
                    type='radio'
                    onChange={(e) => console.log(e.target.value)}
                  />
                  No cumple
                </label>

                <label className={styles.respuesta_na}>
                  <input
                    checked={respuesta === 'No aplica'}
                    name={`${nanoid()}`}
                    type='radio'
                    onChange={(e) => console.log(e.target.value)}
                  />
                  No aplica
                </label>
              </div>
            </summary>
            <h4>{dato.item}</h4>
            <p>{dato.criterio}</p>
            <p>{dato.modo}</p>
          </details>
        ))}
      </section>
    </main>
  );
};

export default memo(Pregunta);
