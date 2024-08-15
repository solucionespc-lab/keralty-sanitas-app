import * as React from 'react';

export const InputView = ({ cell, typeWord, errorWord }) => {
  const validarTipoDato =
    typeWord === 'number' ? Number(cell.value) ?? 0 : cell.value ?? '';
  const option = React.useMemo(() => cell && validarTipoDato, [cell]);

  return (
    <input
      style={{
        borderTop: errorWord ? '1px solid red' : 'unset',
        borderBottom: errorWord ? '1px solid red' : 'unset',
        borderLeft: 'unset',
        borderRight: 'unset',
        height: '100%',
        width: '100%',
      }}
      type={typeWord === 'number' ? 'number' : 'text'}
      defaultValue={option}
    />
  );
};

export const InputEdit = ({ cell, onChange, typeWord, errorWord }) => {
  const handleChange = React.useCallback(
    (selection) => {
      const validarTipoDato =
        typeWord === 'number'
          ? Number(selection.target.value) ?? 0
          : selection.target.value ?? '';
      onChange({
        ...cell,
        value: selection ? validarTipoDato : cell.value,
      });
    },
    [cell, onChange]
  );

  const option = React.useMemo(() => cell && cell.value, [cell]);

  return (
    <input
      style={{
        borderTop: errorWord ? '1px solid red' : 'unset',
        borderBottom: errorWord ? '1px solid red' : 'unset',
        borderLeft: 'unset',
        borderRight: 'unset',
        height: '100%',
        width: '100%',
      }}
      type={typeWord === 'number' ? 'number' : 'text'}
      defaultValue={option}
      onChange={handleChange}
    />
  );
};
