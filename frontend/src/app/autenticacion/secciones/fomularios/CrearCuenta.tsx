import { toast } from 'sonner';
import { useRef, useTransition } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'configuraciones/Firebase';

import LoginButton from '../LoginButton';

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

const CrearCuenta = () => {
  const [autenticando, setAuth] = useTransition();
  const correoRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const autenticar = (e: formEventType) => {
    e.preventDefault();
    const correo = correoRef.current?.value ?? '';
    const password = passRef.current?.value ?? '';

    createUserWithEmailAndPassword(auth, correo, password)
      .then(() => toast.info('Se ha creado el acceso a la plataforma'))
      .catch((err) => toast.error(err.code));
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
          Diligencie los campos para solicitar permiso de ingreso a la
          herramienta, solo si no ha ingresado anteriormente, de lo contrario de
          clic en regresar y coloque sus credenciales
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
        <LoginLabels htmlFor='email'>Contraseña</LoginLabels>
        <Campos
          id='password'
          type='password'
          placeholder='Escriba la contraseña'
          ref={passRef}
          required
        />
      </ContainerData>

      <LoginButton name='Crear acceso' loading={autenticando} />
    </FormEstilo>
  );
};

export default CrearCuenta;
