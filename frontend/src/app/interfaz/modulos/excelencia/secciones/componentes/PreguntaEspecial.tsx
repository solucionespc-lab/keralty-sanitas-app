import { nanoid } from 'nanoid';
import { guardarRespuesta } from 'modulos/excelencia/store/StoreExcelencia';
import { LST_DIMENSION_5 } from 'modulos/excelencia/constantes/ConstGenerales';

import Observaciones from './Observaciones';

import styles from '../../estilos/EstCuestionario.module.css';

import type { ContenidoType } from 'modulos/excelencia/types/ExcelenciaTypes';

const PreguntaEspecial = ({
  idPregunta,
  pregunta,
}: {
  idPregunta: string;
  pregunta: ContenidoType | undefined;
}) => {
  const determinarColor = (respuesta: number | undefined) => {
    if (respuesta === -1) {
      return 'normal';
    }

    if (respuesta === 0) {
      return 'no_aplica';
    }

    return 'cumple';
  };

  return (
    <section
      key={pregunta?.codigoPregunta}
      className={styles.seccion_cuestionario}
    >
      <details open className={styles.preguntas}>
        <summary className={styles.summary}>
          <h4 className={styles.estandar}>
            {pregunta?.requisito ?? 'sin información'}
          </h4>
          <div className={styles.contenedor_respuestas}>
            {LST_DIMENSION_5.map((res, index) => (
              <label
                key={index}
                className={styles[`${determinarColor(pregunta?.respuesta)}`]}
              >
                <input
                  value={res.puntaje}
                  name={nanoid(8)}
                  checked={res.puntaje === pregunta?.respuesta}
                  type='radio'
                  onChange={(e) =>
                    guardarRespuesta(
                      idPregunta,
                      'respuesta',
                      Number(e.target.value)
                    )
                  }
                />
                {res.titulo}
              </label>
            ))}
          </div>
        </summary>

        <Observaciones
          idCiclo={idPregunta}
          label='Observaciones'
          value={pregunta?.observaciones}
        />
      </details>
    </section>
  );
};

export default PreguntaEspecial;
