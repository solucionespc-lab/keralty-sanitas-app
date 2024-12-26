/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
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

  // TODO Separar la logica del guardado del listado para que no genere un render adicional y los controles pierdan el foco
  const { planear, hacer, verificar, actuar } = clasificarPreguntas(
    Object.values(cuestionario)
  );

  useEffect(() => {
    guardarCuestionario(Object.values(listas.evaluaciones), empresa);
  }, [empresa.riesgo, empresa.tamano]);

  return (
    <>
      <h1 className={styles.ciclo_titulos}>Planear</h1>
      {Object.entries(planear).map((estandar, indice) => (
        <fieldset
          key={`empresa-planear-info-${indice}`}
          className={styles.contenedor_ciclo}
        >
          <legend>
            <Titulo style={{ textAlign: 'left' }}>
              {listas.estandares[estandar[0]]}
            </Titulo>
          </legend>
          {estandar[1]?.map((pregunta) => (
            <Pregunta key={pregunta.item} pregunta={pregunta} />
          ))}
        </fieldset>
      ))}

      <h1 className={styles.ciclo_titulos}>Hacer</h1>
      {Object.entries(hacer).map((estandar, indice) => (
        <fieldset
          key={`empresa-hacer-info-${indice}`}
          className={styles.contenedor_ciclo}
        >
          <legend>
            <Titulo style={{ textAlign: 'left' }}>
              {listas.estandares[estandar[0]]}
            </Titulo>
          </legend>
          {estandar[1]?.map((pregunta) => (
            <Pregunta key={pregunta.item} pregunta={pregunta} />
          ))}
        </fieldset>
      ))}

      <h1 className={styles.ciclo_titulos}>Verificar</h1>
      {Object.entries(verificar).map((estandar, indice) => (
        <fieldset
          key={`empresa-verificar-info-${indice}`}
          className={styles.contenedor_ciclo}
        >
          <legend>
            <Titulo style={{ textAlign: 'left' }}>
              {listas.estandares[estandar[0]]}
            </Titulo>
          </legend>
          {estandar[1]?.map((pregunta) => (
            <Pregunta key={pregunta.item} pregunta={pregunta} />
          ))}
        </fieldset>
      ))}

      <h1 className={styles.ciclo_titulos}>Actuar</h1>
      {Object.entries(actuar).map((estandar, indice) => (
        <fieldset
          key={`empresa-actuar-info-${indice}`}
          className={styles.contenedor_ciclo}
        >
          <legend>
            <Titulo style={{ textAlign: 'left' }}>
              {listas.estandares[estandar[0]]}
            </Titulo>
          </legend>
          {estandar[1]?.map((pregunta) => (
            <Pregunta key={pregunta.item} pregunta={pregunta} />
          ))}
        </fieldset>
      ))}
    </>
  );
};

export default Cuestionario;
