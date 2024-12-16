import { useShallow } from 'zustand/react/shallow';
import { useEffect } from 'react';
import {
  guardarCuestionario,
  useAutoevaluacion,
  useCuestionario,
} from 'modulos/autoevaluacion/store/AutoevaluacionStore';
import { clasificarPreguntas } from 'modulos/autoevaluacion/funciones/Funciones';
import useListados from 'hooks/Listados';
import { Titulo } from 'comunes/estilos/EstComunes';

import Pregunta from './Pregunta';

import styles from '../../estilos/EstCuestionario.module.css';

const Cuestionario = () => {
  const { listas } = useListados();
  const { empresa } = useAutoevaluacion(
    useShallow(({ empresa }) => ({
      empresa,
    }))
  );
  const { cuestionario } = useCuestionario(
    useShallow(({ cuestionario }) => ({
      cuestionario,
    }))
  );

  const preguntasPorPrograma = Object.values(cuestionario);

  const { planear, hacer, verificar, actuar } =
    clasificarPreguntas(preguntasPorPrograma);

  useEffect(() => {
    guardarCuestionario(Object.values(listas.evaluaciones), empresa);
  }, [empresa.riesgo, empresa.tamano]);

  return (
    <>
      <h1 className={styles.ciclo_titulos}>Planear</h1>
      {Object.entries(planear).map((estandar, index) => (
        <fieldset key={index} className={styles.contenedor_ciclo}>
          <legend>
            <Titulo style={{ textAlign: 'left' }}>
              {listas.estandares[estandar[0]]}
            </Titulo>
          </legend>
          {estandar[1]?.map((pregunta, index) => (
            <Pregunta key={index} pregunta={pregunta} />
          ))}
        </fieldset>
      ))}

      <h1 className={styles.ciclo_titulos}>Hacer</h1>
      {Object.entries(hacer).map((estandar, index) => (
        <fieldset key={index} className={styles.contenedor_ciclo}>
          <legend>
            <Titulo style={{ textAlign: 'left' }}>
              {listas.estandares[estandar[0]]}
            </Titulo>
          </legend>
          {estandar[1]?.map((pregunta, index) => (
            <Pregunta key={index} pregunta={pregunta} />
          ))}
        </fieldset>
      ))}

      <h1 className={styles.ciclo_titulos}>Verificar</h1>
      {Object.entries(verificar).map((estandar, index) => (
        <fieldset key={index} className={styles.contenedor_ciclo}>
          <legend>
            <Titulo style={{ textAlign: 'left' }}>
              {listas.estandares[estandar[0]]}
            </Titulo>
          </legend>
          {estandar[1]?.map((pregunta, index) => (
            <Pregunta key={index} pregunta={pregunta} />
          ))}
        </fieldset>
      ))}

      <h1 className={styles.ciclo_titulos}>Actuar</h1>
      {Object.entries(actuar).map((estandar, index) => (
        <fieldset key={index} className={styles.contenedor_ciclo}>
          <legend>
            <Titulo style={{ textAlign: 'left' }}>
              {listas.estandares[estandar[0]]}
            </Titulo>
          </legend>
          {estandar[1]?.map((pregunta, index) => (
            <Pregunta key={index} pregunta={pregunta} />
          ))}
        </fieldset>
      ))}
    </>
  );
};

export default Cuestionario;
