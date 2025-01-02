import { useEffect } from 'react';
import { guardarCuestionario } from 'modulos/excelencia/store/StoreExcelencia';
import useListados from 'hooks/Listados';

import DimensionEspecial from './DimensionEspecial';
import Dimension from './Dimension';

import styles from '../../estilos/EstCuestionario.module.css';

const Cuestionario = () => {
  const { listas } = useListados();

  useEffect(() => {
    guardarCuestionario(Object.values(listas.excelencia));
  }, []);

  return (
    <>
      <h1 className={styles.ciclo_titulos}>Dimensión 1</h1>
      <Dimension tema='liderazgo' />

      <h1 className={styles.ciclo_titulos}>Dimensión 2</h1>
      <Dimension tema='proposito' />

      <h1 className={styles.ciclo_titulos}>Dimensión 3</h1>
      <Dimension tema='objetivos' />

      <h1 className={styles.ciclo_titulos}>Dimensión 4</h1>
      <Dimension tema='sst' />

      <h1 className={styles.ciclo_titulos}>Dimensión 5</h1>
      <DimensionEspecial tema='compromiso' />
    </>
  );
};

export default Cuestionario;
