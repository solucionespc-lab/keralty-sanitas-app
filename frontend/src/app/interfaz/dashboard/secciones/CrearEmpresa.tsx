import { useUserStore } from 'store/PrincipalStore';
import { toast } from 'sonner';
import { useCallback } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from 'configuraciones/Firebase';
import { Parrafo, Titulo } from 'comunes/estilos/EstComunes';
import Text from 'comunes/controles/Text';
import { Button } from 'comunes/controles/Buttons';
import { useMutation } from '@apollo/client';

import { actualizarDatos, useUsuarioEmpresaStore } from '../store/UsuarioStore';

import { ACTUALIZAR_EMPRESA } from '../peticiones/Mutations';
import styles from '../estilos/EstEmpresa.module.css';

const CrearEmpresa = () => {
  const { usuario } = useUserStore();
  const datosEmpresa = useUsuarioEmpresaStore((state) => state);

  const desconectarse = useCallback(() => {
    signOut(auth);
    window.location.reload();
  }, []);

  const [guadar, { loading }] = useMutation(ACTUALIZAR_EMPRESA, {
    onCompleted: ({ updateCuenta }) => {
      toast.info(updateCuenta);
      desconectarse();
    },
    onError: ({ message }) => toast.error(message),
  });

  const guardarDatos = () => {
    guadar({
      variables: {
        cuentaInput: {
          correo: usuario?.claims.email ?? '',
          nit: datosEmpresa.nit,
          nombreEmpresa: datosEmpresa.nombreEmpresa,
          nombreUsuario: datosEmpresa.nombreUsuario,
          uid: usuario?.claims.user_id ?? '',
        },
      },
    });
  };

  return (
    <div className={styles.contenedor}>
      <Titulo>Actualizar datos de la empresa</Titulo>
      <Parrafo>
        Una vez de clic en el botón guardar, la herramienta le pedirá
        autenticarse de nuevo
      </Parrafo>
      <Text
        label='Ingrese el número de NIT de la empresa'
        onChange={(e) => actualizarDatos('nit', e.target.value)}
        value={datosEmpresa.nit}
      />
      <Text
        label='Ingrese el nombre de la empresa'
        onChange={(e) => actualizarDatos('nombreEmpresa', e.target.value)}
        value={datosEmpresa.nombreEmpresa}
      />
      <Text
        label='Ingrese su nombre completo'
        onChange={(e) => actualizarDatos('nombreUsuario', e.target.value)}
        value={datosEmpresa.nombreUsuario}
      />
      <Button
        name='Actualizar datos'
        type='button'
        sizeBtn='normal'
        onClick={() => guardarDatos()}
        typeBtn={'primary'}
        icon={'new'}
        permiso='escribir'
        permisos={['escribir']}
        loading={loading}
      />
    </div>
  );
};

export default CrearEmpresa;
