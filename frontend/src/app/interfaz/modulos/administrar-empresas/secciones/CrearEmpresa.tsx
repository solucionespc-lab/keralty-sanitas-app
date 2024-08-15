import { useShallow } from 'zustand/react/shallow';
import Toggle from 'comunes/controles/Toggle';
import Text from 'comunes/controles/Text';

import { guardarEmpresa, useEmpresaStore } from '../store/StoreEmpresas';
import ResponComp from './componentes/Responsables';

const CrearEmpresa = () => {
  const { nit, nombre, activo } = useEmpresaStore(
    useShallow(({ nit, nombre, activo }) => ({ nit, nombre, activo }))
  );

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

export default CrearEmpresa;
