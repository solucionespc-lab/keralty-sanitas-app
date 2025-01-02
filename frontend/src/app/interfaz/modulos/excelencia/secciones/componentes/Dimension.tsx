import { useShallow } from 'zustand/react/shallow';
import { DimensionPropsType } from 'modulos/excelencia/types/ExcelenciaTypes';
import { useCuestionario } from 'modulos/excelencia/store/StoreExcelencia';
import { CONVENCION_TEMAS } from 'modulos/excelencia/constantes/ConstGenerales';
import { Titulo } from 'comunes/estilos/EstComunes';

import Pregunta from './Pregunta';

import styles from '../../estilos/EstCuestionario.module.css';

const Dimension = ({ tema }: DimensionPropsType) => {
  const { cuestionario } = useCuestionario(
    useShallow(({ cuestionario }) => ({
      cuestionario,
    }))
  );

  const preguntas = Object.entries(cuestionario)
    .map((pregunta) => ({ ...pregunta[1], codigoPregunta: pregunta[0] }))
    .filter((pregunta) => pregunta.tema === tema);

  return (
    <>
      <fieldset className={styles.contenedor_ciclo}>
        <legend>
          <Titulo style={{ textAlign: 'left' }}>
            {CONVENCION_TEMAS[tema as keyof typeof CONVENCION_TEMAS]}
          </Titulo>
        </legend>
        {preguntas.map((dimension) => (
          <Pregunta
            key={dimension.codigoPregunta}
            idPregunta={dimension.codigoPregunta}
            pregunta={dimension}
          />
        ))}
      </fieldset>
    </>
  );
};

export default Dimension;
