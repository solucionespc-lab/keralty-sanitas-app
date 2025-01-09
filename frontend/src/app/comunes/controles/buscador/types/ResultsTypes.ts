export interface DataProps {
  nombre: string;
  nit: string;
  objectID: string;
}

export interface ResultProps {
  data: DataProps[];
  searchWord: string;
  loading: boolean;
  callback: (data: DataProps) => void;
}
