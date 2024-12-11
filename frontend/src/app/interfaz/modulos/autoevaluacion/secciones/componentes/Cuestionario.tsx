import { useShallow } from 'zustand/react/shallow';
import { useCuestionario } from 'modulos/autoevaluacion/store/AutoevaluacionStore';
import { clasificarPreguntas } from 'modulos/autoevaluacion/funciones/Funciones';
import { Titulo } from 'comunes/estilos/EstComunes';

import Pregunta from './Pregunta';

const Cuestionario = () => {
  const { cuestionario } = useCuestionario(
    useShallow(({ cuestionario }) => ({
      cuestionario,
    }))
  );

  const preguntasPorPrograma = Object.values(cuestionario);

  const { planear, hacer, verificar, actuar } =
    clasificarPreguntas(preguntasPorPrograma);

  return (
    <>
      <Titulo style={{ textAlign: 'left' }}>Planear</Titulo>
      {planear.map((pregunta, index) => (
        <Pregunta key={index} pregunta={pregunta} />
      ))}

      <Titulo style={{ textAlign: 'left' }}>Hacer</Titulo>
      {hacer.map((pregunta, index) => (
        <Pregunta key={index} pregunta={pregunta} />
      ))}

      <Titulo style={{ textAlign: 'left' }}>Verificar</Titulo>
      {verificar.map((pregunta, index) => (
        <Pregunta key={index} pregunta={pregunta} />
      ))}

      <Titulo style={{ textAlign: 'left' }}>Actuar</Titulo>
      {actuar.map((pregunta, index) => (
        <Pregunta key={index} pregunta={pregunta} />
      ))}
    </>
  );
};

export default Cuestionario;
