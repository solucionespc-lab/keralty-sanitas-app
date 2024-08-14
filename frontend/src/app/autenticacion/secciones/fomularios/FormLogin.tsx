import { useRef, useTransition } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'configuraciones/Firebase';

import LoginButton from '../LoginButton';
import { validarEmail, validarErrores } from '../../funciones/Validaciones';

import {
  Campos,
  ContainerData,
  ContainerFlex,
  Descripcion,
  FormEstilo,
  LoginLabels,
  TituloHerramienta,
} from '../../estilos/EstilosLogin';

import type { formEventType } from '../../types/LoginTypes';

const FormLogin = () => {
  const [autenticando, setAuth] = useTransition();
  const correoRef = useRef<HTMLInputElement>(null);
  const contrasenaRef = useRef<HTMLInputElement>(null);

  const autenticar = (e: formEventType) => {
    e.preventDefault();
    const esCorrectoCorreo = validarEmail(correoRef.current?.value ?? '');
    const correo = correoRef.current ?? { value: '' };
    const contrasena = contrasenaRef.current ?? { value: '' };

    if (esCorrectoCorreo) {
      signInWithEmailAndPassword(auth, correo.value, contrasena.value).catch(
        (err) => {
          validarErrores(err.code);
        }
      );
    } else {
      validarErrores('email/company-invalid');
    }
  };

  return (
    <FormEstilo
      onSubmit={(e) => {
        setAuth(() => autenticar(e));
      }}
    >
      <ContainerFlex>
        <TituloHerramienta>
          {import.meta.env.VITE_WEBSITE_NAME}
        </TituloHerramienta>
        <Descripcion>
          Diligencie las credenciales para ingresar en la herramienta, si no
          recuerda la contraseña comuníquese a través del correo
          soporte@pcsoluciones.com.co
        </Descripcion>
      </ContainerFlex>

      <ContainerData>
        <LoginLabels htmlFor='email'>Correo electrónico</LoginLabels>
        <Campos
          id='email'
          type='email'
          placeholder='Escriba el correo electrónico'
          required
          ref={correoRef}
        />
      </ContainerData>

      <ContainerData>
        <LoginLabels htmlFor='pass-id'>Contraseña</LoginLabels>
        <Campos
          id='pass-id'
          type='password'
          placeholder='Escriba la contraseña'
          ref={contrasenaRef}
          required
          onKeyDown={(e) => e.key === 'enter' && autenticar}
        />
      </ContainerData>

      <LoginButton name='Ingresar' loading={autenticando} />
    </FormEstilo>
  );
};

export default FormLogin;
