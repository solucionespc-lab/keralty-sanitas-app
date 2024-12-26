import { KeyFormat } from 'autenticacion/types/LoginTypes';

import FormLogin from './fomularios/FormLogin';
import CrearCuenta from './fomularios/CrearCuenta';

const component = {
  login: <FormLogin />,
  nuevo: <CrearCuenta />,
};

const Forms = ({ name }: { name: string }) => (
  <>{component[name as KeyFormat]}</>
);

export default Forms;
