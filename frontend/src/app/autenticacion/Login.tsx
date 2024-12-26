import { isSignInWithEmailLink } from 'firebase/auth';
import { auth } from 'configuraciones/Firebase';

import Formulario from './secciones/Principal';
import CrearContrasena from './secciones/fomularios/CrearContrasena';
import useAutenticacion from './hooks/Auth';

import { ContenedorLogin } from './estilos/EstilosPrincipal';

const Login = () => {
  useAutenticacion();

  if (isSignInWithEmailLink(auth, window.location.href)) {
    return <CrearContrasena location={window.location} auth={auth} />;
  }

  return (
    <ContenedorLogin>
      <Formulario />
    </ContenedorLogin>
  );
};

export default Login;
