interface DataProps {
  nombre: string;
  nit: string;
  objectID: string;
}

export interface SearchProps {
  algoliaIndex: string;
  title: string;
  returnAlgoliaValue: (data: DataProps) => void;
}

export interface DataSearchStore {
  nit: string;
  nombre: string;
  objectID: string;
  setItem: (itemSelected: DataProps) => void;
}
