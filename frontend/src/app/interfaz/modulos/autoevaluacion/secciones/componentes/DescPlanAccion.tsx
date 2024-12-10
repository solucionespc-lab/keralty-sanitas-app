import { useEffect, useState } from 'react';
import { guardarPlan } from 'modulos/auditorias/store/AuditoriaStore';
import TextArea from 'comunes/controles/TextArea';
import { useDebounce } from '@uidotdev/usehooks';

const DescPlanAccion = ({ value }: { value: string }) => {
  const [descripcion, setSearchTerm] = useState<string | undefined>(undefined);
  const debouncedTerm = useDebounce(descripcion, 250);

  useEffect(() => {
    if (descripcion !== undefined) {
      guardarPlan('descripcion', descripcion);
    }
  }, [debouncedTerm]);

  return (
    <TextArea
      label='Descripción'
      value={descripcion || value}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default DescPlanAccion;
