import { IOpcionesConfig, IUserState } from '../types/ContextoTypes';
import { version } from '../../../../package.json';

export const estadoInicialPrincipal: IUserState = {
	year: new Date().getFullYear(),
	usuario: null,
	autorizado: false,
	token: '',
	appCheckToken: '',
	external: false,
	iam: {
		version: '1.2.0',
		modulos: {
			0: {
				descripcion: 'Ninguna',
				titulo: 'Módulo sin datos',
				url: '/',
				subGrupo: 'Submodulo',
				responsable: 'Sin responsable',
				imagen: '',
				estaActivo: true,
				llaveModulo: 'trabajadores',
			},
		},
		acciones: {
			aplicacion: [],
			infraestructura: [],
		},
	},
};

export const listados = {};

export const opcionesConfig: IOpcionesConfig = {
	name: 'listados',
	version: Number(version),
};

export const TYPE_OF_DEVICE = /\b(iPad|iPhone|iPod|Android)\b/;
