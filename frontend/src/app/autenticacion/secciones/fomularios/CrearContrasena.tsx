import { useState } from 'react';
import { Auth, signInWithEmailLink, updatePassword } from 'firebase/auth';
import Toast from 'comunes/informativos/Notificaciones';
import { Parrafo } from 'comunes/estilos/EstComunes';
import Text from 'comunes/controles/Text';
import LOGO from 'assets/Logokeralty.png';

import { Contenedor, ContenedorGeneral, IMG } from '../../estilos/Estilos';

const CrearContrasena = ({
  location,
  auth,
}: {
  location: Location;
  auth: Auth;
}) => {
  const params = location.search.replace('?', '').split('&');
  const [password, setPassword] = useState<string>('');

  const [, email] = params[1].split('=');

  const onClickFunction = async () => {
    signInWithEmailLink(auth, email, window.location.href)
      .then((result) => {
        updatePassword(result.user, password)
          .then(() => {
            location.href = process.env?.VITE_APP_URL ?? '';
          })
          .catch((error) => Toast(error.message, 'error'));
      })
      .catch((error) => Toast(error.message, 'error'));
  };

  return (
    <ContenedorGeneral>
      <Contenedor>
        <IMG src={LOGO} />
        <Parrafo>Configure su nueva contraseña de ingreso</Parrafo>
        <Text label='Correo' readOnly value={email} />
        <Text
          label='Nueva contraseña'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => onClickFunction()}>Entrar</button>
      </Contenedor>
    </ContenedorGeneral>
  );
};

export default CrearContrasena;
