interface DataProps {
  cedulaNit: string;
  id: string;
  nombreContratista: string;
  objectID: string;
  servicio?: string;
}

export interface SearchProps {
  algoliaIndex: string;
  title: string;
  returnAlgoliaValue: (data: DataProps) => void;
  closeModal: () => void;
}

export interface DataSearchStore {
  cedulaNit: string;
  id: string;
  nombreContratista: string;
  objectID: string;
  servicio: string;
  setItem: (itemSelected: DataProps) => void;
}
