import Formulario from './secciones/Principal';
import useAutenticacion from './hooks/Auth';

import { ContenedorLogin } from './estilos/EstilosPrincipal';

const Login = () => {
  useAutenticacion();

  return (
    <ContenedorLogin>
      <Formulario />
    </ContenedorLogin>
  );
};

export default Login;
