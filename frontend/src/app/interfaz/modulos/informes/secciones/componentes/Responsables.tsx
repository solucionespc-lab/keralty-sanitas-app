import { useEffect, useState } from 'react';
import { guardarInfoPlan } from 'modulos/informes/store/StoreInformes';
import Text from 'comunes/controles/Text';
import { useDebounce } from '@uidotdev/usehooks';

const Responsables = ({
  value = '',
  label,
  disabled = false,
  indice,
}: {
  value?: string;
  label: string;
  disabled?: boolean;
  indice: number;
}) => {
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const debouncedSearchTerm = useDebounce(searchTerm, 250);

  useEffect(() => {
    if (searchTerm !== undefined) {
      guardarInfoPlan('responsables', searchTerm, indice);
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

export default Responsables;
