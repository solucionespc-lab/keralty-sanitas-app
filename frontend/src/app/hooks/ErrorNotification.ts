import { useEffect } from 'react';

import type { ErrorHookType } from './types/HookErrorTypes';

const useErrorNotification = ({ error }: ErrorHookType): string => {
  const moduloLocal = localStorage.getItem('modulo') ?? '';
  const esDesarrollo =
    import.meta.env.DEV && error.message !== 'No se encuentra autorizado';

  useEffect(() => {
    if (!esDesarrollo) {
      fetch(import.meta.env.VITE_SLACK_SUPPORT, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({
          text: JSON.stringify({
            herramienta: import.meta.env.VITE_WEBSITE_NAME,
            modulo: [moduloLocal].join(' - '),
            ...error,
          }),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }, []);

  return 'Se ha enviado al equipo de soporte el error generado.';
};

export default useErrorNotification;
