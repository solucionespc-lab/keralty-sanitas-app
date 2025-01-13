import { useEffect, useState } from 'react';
import { guardarDatosActa } from 'modulos/actas/store/ActasStore';
import Text from 'comunes/controles/Text';
import { useDebounce } from '@uidotdev/usehooks';

const Textos = ({
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
    <Text
      disabled={disabled}
      label={label}
      value={searchTerm || value}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default Textos;
