import { KeyFormat } from 'autenticacion/types/LoginTypes';
import { TYPE_OF_DEVICE } from 'app/store/constantes/ContextoConst';

import MainInfo from './informacion/MainInfo';

const component = {
  login: <MainInfo />,
};

const Informativos = ({ name }: { name: string }) => {
  const isDevice = TYPE_OF_DEVICE.test(navigator.userAgent);

  if (isDevice) return null;

  return <>{component[name as KeyFormat]}</>;
};

export default Informativos;
