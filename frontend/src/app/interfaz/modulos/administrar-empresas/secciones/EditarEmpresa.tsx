import { useShallow } from 'zustand/react/shallow';
import { useEffect } from 'react';
import Toggle from 'comunes/controles/Toggle';
import Text from 'comunes/controles/Text';
import { useSuspenseQuery } from '@apollo/client';

import {
  actualizarDatosEmpresa,
  guardarEmpresa,
  useEmpresaStore,
} from '../store/StoreEmpresas';
import ResponComp from './componentes/Responsables';

import { GET_EMPRESA } from '../peticiones/Queries';

import type { QueryEmpType } from '../types/EmpresaTypes';

const EditarEmpresa = ({ id }: { id: string }) => {
  const { nit, nombre, activo } = useEmpresaStore(
    useShallow(({ nit, nombre, activo }) => ({ nit, nombre, activo }))
  );
  const { data, error } = useSuspenseQuery<QueryEmpType>(GET_EMPRESA, {
    variables: {
      idEmpresa: 'AOP4iSa7FgYV1ThlUEMw',
    },
  });

  useEffect(() => {
    actualizarDatosEmpresa(data.getEmpresa);
  }, []);

  if (error) return <p>Ocurrio un error</p>;

  return (
    <main>
      <section>
        <Text
          label='NIT'
          value={nit}
          onChange={(e) => guardarEmpresa('nit', e.target.value)}
        />
        <Text
          label='Nombre'
          value={nombre}
          onChange={(e) => guardarEmpresa('nombre', e.target.value)}
        />
        <Toggle
          label='Usuario activo'
          checked={activo}
          onChange={(e) => guardarEmpresa('activo', e.target.checked)}
        />
      </section>

      <ResponComp />
    </main>
  );
};

export default EditarEmpresa;
