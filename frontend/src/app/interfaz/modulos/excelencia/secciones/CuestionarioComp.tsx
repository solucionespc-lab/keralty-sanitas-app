import DatosBasicos from './DatosBasicos';
import Cuestionario from './componentes/Cuestionario';

import stCuestionario from '../estilos/EstCuestionario.module.css';

const CuestionarioComp = () => {
  return (
    <section className={stCuestionario.cuestionario}>
      <DatosBasicos />
      <Cuestionario />
    </section>
  );
};

export default CuestionarioComp;
