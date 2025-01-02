import { useEffect, useState } from 'react';
import { guardarObservaciones } from 'modulos/excelencia/store/StoreExcelencia';
import TextArea from 'comunes/controles/TextArea';
import { useDebounce } from '@uidotdev/usehooks';

const Observaciones = ({
  idCiclo,
  value,
  label,
  disabled = false,
}: {
  idCiclo: string;
  value?: string;
  label: string;
  disabled?: boolean;
}) => {
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const debouncedSearchTerm = useDebounce(searchTerm, 250);

  useEffect(() => {
    if (searchTerm !== undefined) {
      guardarObservaciones(idCiclo, searchTerm);
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
