import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { db } from 'configuraciones/Firebase';

const useListaResponsables = () => {
  const [lista, setLista] = useState([]);

  const listasQuery = ref(db, 'responsablesPlan');

  useEffect(() => {
    onValue(listasQuery, (listado) => {
      if (JSON.stringify(listado.val()) !== JSON.stringify(lista)) {
        setLista(listado.val() ?? []);
      }
    });
  }, [lista]);

  return lista;
};

export default useListaResponsables;
