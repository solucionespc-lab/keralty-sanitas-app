import * as React from 'react';
import Select from 'react-select';
import { removeAccents } from '../../importarPrincipal/funciones/FuncionesImport';

export const SelectView = ({ cell, listado, errorWord }) => {
  const OPTIONS = listado ?? [{ value: '', label: '' }];
  const validar = OPTIONS?.find(
    (option1) => removeAccents(option1.value) === removeAccents(cell.value)
  );
  const option = React.useMemo(() => cell && validar, [cell]);
  return (
    <Select
      style={{
        control: (baseStyles) => ({
          ...baseStyles,
          borderTop: errorWord ? '1px solid red' : 'unset',
          borderBottom: errorWord ? '1px solid red' : 'unset',
          borderLeft: 'unset',
          borderRight: 'unset',
          height: '100%',
        }),
      }}
      value={option}
      options={OPTIONS}
    />
  );
};

export const SelectEdit = ({
  cell,
  onChange,
  exitEditMode,
  listado,
  errorWord,
}) => {
  const OPTIONS = listado ?? [{ value: '', label: '' }];
  const validar = OPTIONS.find(
    (option1) => removeAccents(option1.value) === removeAccents(cell.value)
  );
  const handleChange = React.useCallback(
    (selection) => {
      onChange({ ...cell, value: selection ? selection.value : null });
    },
    [cell, onChange]
  );
  const option = React.useMemo(() => cell && validar, [cell]);

  return (
    <Select
      style={{
        borderTop: errorWord ? '1px solid red' : 'unset',
        borderBottom: errorWord ? '1px solid red' : 'unset',
        borderLeft: 'unset',
        borderRight: 'unset',
        height: '100%',
      }}
      value={option}
      onChange={handleChange}
      options={OPTIONS}
      autoFocus
      defaultMenuIsOpen
      onMenuClose={() => exitEditMode()}
    />
  );
};
