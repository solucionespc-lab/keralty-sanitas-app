export interface DataProps {
  cedulaNit: string;
  id: string;
  nombreContratista: string;
  objectID: string;
  otroServicio: string;
}

export interface ResultProps {
  data: DataProps[];
  searchWord: string;
  loading: boolean;
  callback: (data: DataProps) => void;
}
