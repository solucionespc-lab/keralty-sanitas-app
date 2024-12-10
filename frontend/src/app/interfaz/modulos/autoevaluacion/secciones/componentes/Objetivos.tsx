import { useEffect, useState } from 'react';
import { guardar } from 'modulos/auditorias/store/AuditoriaStore';
import TextArea from 'comunes/controles/TextArea';
import { useDebounce } from '@uidotdev/usehooks';

const Objetivo = ({ value }: { value: string }) => {
  const [objetivo, setSearchTerm] = useState<string | undefined>(undefined);
  const debouncedTerm = useDebounce(objetivo, 250);

  useEffect(() => {
    if (objetivo !== undefined) {
      guardar('objetivo', objetivo);
    }
  }, [debouncedTerm]);

  return (
    <TextArea
      label='Objetivo'
      value={objetivo || value}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default Objetivo;
