import { useUserStore } from 'store/PrincipalStore';

import ActasProveedor from './secciones/ActasProveedor';
import ActasCliente from './secciones/ActasCliente';

const Actas = () => {
  const { usuario } = useUserStore();

  return (
    <>
      {usuario?.claims.tipo === 'proveedor' ? (
        <ActasProveedor />
      ) : (
        <ActasCliente />
      )}
    </>
  );
};

export default Actas;
