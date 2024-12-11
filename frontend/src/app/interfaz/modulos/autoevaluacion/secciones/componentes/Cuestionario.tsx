import { useMemo } from 'react';
import { useAutoevaluacion } from 'modulos/autoevaluacion/store/AutoevaluacionStore';
import useListados from 'hooks/Listados';

import Pregunta from './Pregunta';

const Cuestionario = () => {
  const { listas } = useListados();
  const { empresa } = useAutoevaluacion(({ empresa }) => ({ empresa }));

  const preguntasPorPrograma = useMemo(
    () =>
      Object.values(listas.evaluaciones).filter(
        (tema) =>
          tema.riesgo === empresa.riesgo &&
          tema.tamano === empresa.tamano &&
          Object.values(tema.tipoEmpresa).includes(empresa.tipoEmpresa)
      ),
    []
  );

  return (
    <>
      {preguntasPorPrograma.map((pregunta) => (
        <Pregunta key={pregunta.codigo} preguntas={pregunta.contenido} />
      ))}
    </>
  );
};

export default Cuestionario;
