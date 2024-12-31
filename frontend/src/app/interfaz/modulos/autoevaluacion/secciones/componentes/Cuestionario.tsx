/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useShallow } from 'zustand/react/shallow';
import { useEffect } from 'react';
import {
  guardarCuestionario,
  useAutoevaluacion,
  useCuestionario,
} from 'modulos/autoevaluacion/store/AutoevaluacionStore';
import useListados from 'hooks/Listados';

import Ciclo from './Ciclo';

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

  useEffect(() => {
    guardarCuestionario(Object.values(listas.evaluaciones), empresa);
  }, [empresa.riesgo, empresa.tamano]);

  return (
    <>
      <h1 className={styles.ciclo_titulos}>Planear</h1>
      <Ciclo tema='Planear' cuestionario={cuestionario} />

      <h1 className={styles.ciclo_titulos}>Hacer</h1>
      <Ciclo tema='Hacer' cuestionario={cuestionario} />

      <h1 className={styles.ciclo_titulos}>Verificar</h1>
      <Ciclo tema='Verificar' cuestionario={cuestionario} />

      <h1 className={styles.ciclo_titulos}>Actuar</h1>
      <Ciclo tema='Actuar' cuestionario={cuestionario} />
    </>
  );
};

export default Cuestionario;
