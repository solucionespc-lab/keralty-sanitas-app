import { useEffect, useState } from 'react';
import { guardarDatosActa } from 'modulos/actas/store/ActasStore';
import TextArea from 'comunes/controles/TextArea';
import { useDebounce } from '@uidotdev/usehooks';

const Observaciones = ({
  campo,
  value,
  label,
  disabled = false,
}: {
  campo: string;
  value?: string;
  label: string;
  disabled?: boolean;
}) => {
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const debouncedSearchTerm = useDebounce(searchTerm, 250);

  useEffect(() => {
    if (searchTerm !== undefined) {
      guardarDatosActa(campo, searchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <TextArea
      disabled={disabled}
      label={label}
      value={searchTerm || value}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default Observaciones;
