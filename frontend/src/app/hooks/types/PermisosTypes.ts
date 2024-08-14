import { IdTokenResult } from 'firebase/auth';

interface IUserState {
  year: number;
  usuario: IdTokenResult | null;
  autorizado: boolean;
  token: string;
  appCheckToken: string;
  iam: IIAM;
  external: boolean;
}

export type TModKey = keyof IIAM['modulos'];
export interface IObjetoPermiso {
  [key: string]: string[];
}

export type IArbolPermiso = (
  usuario: IUserState['usuario'],
  iam: IUserState['iam']
) => IObjetoPermiso[];
