import { useShallow } from 'zustand/react/shallow';
import { Fragment } from 'react/jsx-runtime';
import { nanoid } from 'nanoid';
import {
  guardarResponsable,
  useEmpresaStore,
} from 'modulos/administrar-empresas/store/StoreEmpresas';
import Toggle from 'comunes/controles/Toggle';
import Text from 'comunes/controles/Text';

const ResponComp = () => {
  const { responsables } = useEmpresaStore(
    useShallow(({ responsables }) => ({ responsables }))
  );

  return (
    <fieldset>
      <legend>Responsables</legend>
      {responsables.map((responsable, index) => (
        <Fragment key={nanoid(10)}>
          <Text
            label='Nombre'
            value={responsable.nombre}
            onChange={(e) =>
              guardarResponsable('nombre', e.target.value, index)
            }
          />
          <Text
            label='Cargo'
            value={responsable.cargo}
            onChange={(e) => guardarResponsable('cargo', e.target.value, index)}
          />
          <Text
            label='Teléfono'
            value={responsable.telefono}
            onChange={(e) =>
              guardarResponsable('telefono', e.target.value, index)
            }
          />
          <Text
            label='Correo electrónico'
            value={responsable.correo}
            onChange={(e) =>
              guardarResponsable('correo', e.target.value, index)
            }
          />
          <Toggle
            label='Usuario activo'
            checked={responsable.usuarioActivo}
            onChange={(e) =>
              guardarResponsable('correo', e.target.checked, index)
            }
          />
        </Fragment>
      ))}
    </fieldset>
  );
};

export default ResponComp;
