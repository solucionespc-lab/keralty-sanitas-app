import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { db } from 'configuraciones/Firebase';

const useListaTrabajadores = () => {
  const [lista, setLista] = useState({});

  const listasQuery = ref(db, 'listasTrabajadores');

  useEffect(() => {
    onValue(listasQuery, (listado) => {
      if (JSON.stringify(listado.val()) !== JSON.stringify(lista)) {
        setLista(listado.val() ?? {});
      }
    });
  }, [lista]);

  return lista;
};

export default useListaTrabajadores;
