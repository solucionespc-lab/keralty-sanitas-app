import { useEffect } from 'react';
import { type User } from 'firebase/auth';
import { auth } from 'configuraciones/Firebase';
import Toast from 'comunes/informativos/Notificaciones';
import { useUserStore } from 'app/store/PrincipalStore';

const useAutenticacion = () => {
  const guardarUsuario = useUserStore(({ guardarUsuario }) => guardarUsuario);
  let autorizado = false;

  const autorizarIngreso = (user: User): void => {
    const userToken = user.getIdTokenResult();

    userToken
      .then((userData) => {
        autorizado = true;
        guardarUsuario(userData);
      })
      .catch((err) => {
        Toast(err, 'error');
      });
  };

  useEffect(() => {
    const unSubscribe = auth.onIdTokenChanged((user) => {
      if (user === null) {
        return;
      }
      autorizarIngreso(user);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  return {
    autorizado,
  };
};

export default useAutenticacion;
