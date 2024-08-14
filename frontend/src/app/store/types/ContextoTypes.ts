import { IdTokenResult } from 'firebase/auth';
import { LoggedUser } from 'configuraciones/types/SeguridadTypes';

export interface IOpcionesConfig {
	name: string;
	version: number;
}

export interface IUserState {
	year: number;
	usuario: LoggedUser | null;
	autorizado: boolean;
	token: string;
	appCheckToken: string;
	iam: IIAM;
	external: boolean;
}

interface IListados {
	[key: string]: unknown;
}

interface IEventosUser {
	guardarUsuario: (usuario: IdTokenResult) => void;
}

interface IEventosConfig {
	obtenerConfiguraciones: () => Promise<void>;
}

export type TStoreUser = IUserState & IEventosUser;
export type TStoreConfig = IListados & IEventosConfig;
