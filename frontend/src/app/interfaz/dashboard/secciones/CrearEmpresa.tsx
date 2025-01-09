import { useUserStore } from 'store/PrincipalStore';
import { toast } from 'sonner';
import { useCallback } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from 'configuraciones/Firebase';
import Condicional from 'comunes/funcionales/Condicional';
import { Titulo } from 'comunes/estilos/EstComunes';
import Text from 'comunes/controles/Text';
import { Button } from 'comunes/controles/Buttons';
import SearchComponent from 'comunes/controles/buscador/SearchComponent';
import { useMutation } from '@apollo/client';

import {
  actualizarDatos,
  actualizarEmpresa,
  reiniciarEmpresa,
  useUsuarioEmpresaStore,
} from '../store/UsuarioStore';
import { INDICE_ALGOLIA } from '../constantes/ContextoConst';

import { ACTUALIZAR_EMPRESA } from '../peticiones/Mutations';
import styles from '../estilos/EstEmpresa.module.css';

const CrearEmpresa = () => {
  const { usuario } = useUserStore();
  const datosEmpresa = useUsuarioEmpresaStore((state) => state);

  const desconectarse = useCallback(() => {
    signOut(auth);
    // window.location.reload();
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
    <form
      className={styles.contenedor}
      onSubmit={(e) => {
        e.preventDefault();
        guardarDatos();
      }}
    >
      <Titulo>{datosEmpresa.nombreEmpresa}</Titulo>
      <Condicional condicion={datosEmpresa.nit === ''}>
        <SearchComponent
          algoliaIndex={INDICE_ALGOLIA}
          title='Digite el nombre o NIT de la empresa registrada'
          returnAlgoliaValue={(e) =>
            actualizarEmpresa({
              nit: e.nit,
              nombreEmpresa: e.nombre,
            })
          }
        />
      </Condicional>

      <Condicional condicion={datosEmpresa.nit !== ''}>
        <Text
          required
          label='Ingrese su nombre completo'
          onChange={(e) => actualizarDatos('nombreUsuario', e.target.value)}
          value={datosEmpresa.nombreUsuario}
        />

        <small style={{ color: 'var(--color-placeholder)' }}>
          Una vez de clic en el botón guardar, la herramienta le pedirá
          autenticarse de nuevo
        </small>

        <section className={styles.botones_container}>
          <button
            className={styles.cancelar_boton}
            onClick={() => reiniciarEmpresa()}
          >
            Cancelar
          </button>
          <Button
            style={{ width: 'fit-content' }}
            name='Registrarse'
            type='submit'
            sizeBtn='normal'
            onClick={() => guardarDatos()}
            typeBtn={'primary'}
            icon={'new'}
            permiso='escribir'
            permisos={['escribir']}
            loading={loading}
          />
        </section>
      </Condicional>
    </form>
  );
};

export default CrearEmpresa;
