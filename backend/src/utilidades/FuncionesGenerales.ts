import { FiltrosQuery } from '../backend-def';

export const dbDataType = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) =>
    snap.data() as T,
});

export const aplicarFiltros = <T, F extends object>(
  ref: FirebaseFirestore.Query<T>,
  filtros: F,
  consultas: FiltrosQuery
) => {
  const parametrosDeFiltrado = Object.entries(filtros)
    .filter((filtro) => filtro[1] !== '')
    .map((filtro) => filtro[0]);

  parametrosDeFiltrado
    .filter((filtro) => filtro !== '')
    .forEach((parametro) => {
      const [campo, operador, valor] =
        consultas[parametro as keyof typeof consultas];

      ref = ref.where(campo, operador, valor);
    });

  return ref;
};
