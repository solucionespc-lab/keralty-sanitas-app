// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { CicloPropsType } from 'modulos/autoevaluacion/types/AutoevaluacionForms';
import { clasificarPreguntas } from 'modulos/autoevaluacion/funciones/Funciones';
import useListados from 'hooks/Listados';
import { Titulo } from 'comunes/estilos/EstComunes';

import Pregunta from './Pregunta';

import styles from '../../estilos/EstCuestionario.module.css';

const Ciclo = ({ cuestionario, tema }: CicloPropsType) => {
  const { listas } = useListados();
  const preguntas = clasificarPreguntas(
    Object.values(cuestionario).flat(),
    tema
  );

  return (
    <>
      {Object.entries(preguntas[tema]).map((estandar, indice) => (
        <fieldset
          key={`empresa-planear-info-${indice}`}
          className={styles.contenedor_ciclo}
        >
          <legend>
            <Titulo style={{ textAlign: 'left' }}>
              {listas.estandares[estandar[0]]}
            </Titulo>
          </legend>
          <Pregunta preguntas={estandar[1]} />
        </fieldset>
      ))}
    </>
  );
};

export default Ciclo;
