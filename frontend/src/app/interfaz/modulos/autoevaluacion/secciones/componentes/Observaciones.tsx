import { useEffect, useState } from 'react';
import { guardarObs } from 'modulos/auditorias/store/AuditoriaStore';
import TextArea from 'comunes/controles/TextArea';
import { useDebounce } from '@uidotdev/usehooks';

import type { PregObject } from 'modulos/auditorias/types/AuditoriaTypes';

const Observaciones = ({
  pregunta,
  value,
}: {
  pregunta: PregObject;
  value: string;
}) => {
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const debouncedSearchTerm = useDebounce(searchTerm, 250);

  useEffect(() => {
    if (searchTerm !== undefined) {
      guardarObs(pregunta.codigoPregunta, searchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <TextArea
      label='Observaciones'
      value={searchTerm || value}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default Observaciones;
