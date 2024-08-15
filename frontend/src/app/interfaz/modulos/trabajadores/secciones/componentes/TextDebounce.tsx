import { useEffect, useState } from 'react';
import { guardar } from 'modulos/trabajadores/store/OcupacionalStore';
import Text from 'comunes/controles/Text';
import { useDebounce } from '@uidotdev/usehooks';

const TextDebounce = ({
  label,
  id,
  value,
  index,
  disabled,
}: {
  label: string;
  id: string;
  value: string;
  index: number;
  disabled: boolean;
}) => {
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const debouncedSearchTerm = useDebounce(searchTerm, 250);

  useEffect(() => {
    if (searchTerm !== undefined) {
      guardar(searchTerm, id, index);
    }
  }, [debouncedSearchTerm]);

  return (
    <Text
      label={label}
      value={searchTerm || value}
      disabled={disabled}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default TextDebounce;
