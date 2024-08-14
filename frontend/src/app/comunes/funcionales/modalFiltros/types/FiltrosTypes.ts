export interface FuncionesBotonesProps {
	close: () => void;
	apply: () => void;
	delete: () => void;
}
export interface FuncionesBotones extends FuncionesBotonesProps {
	dates: () => void;
	next: () => void;
	before: () => void;
}

export type IconoFiltrosTypes = Record<keyof FuncionesBotones, JSX.Element[]>;
export type AnimacionBotonTypes = Record<keyof FuncionesBotones, string>;

export interface ModalButtonsFilterProps {
	functions: FuncionesBotonesProps;
}
export interface ModalFilterProps extends ModalButtonsFilterProps {
	children: React.ReactNode | React.ReactNode[];
	functions: FuncionesBotonesProps;
	nota?: string;
	pageDates?: number;
}

// estilos
export interface butonsTypes {
	func: keyof FuncionesBotones;
	readonly disabled?: boolean;
}

// contexto
export interface InitialStateType {
	pageFecha: number;
	pagina: number;
	nPages: number;
}
export interface ActionType {
	type: string;
	payload: any;
	name: string;
}

export type StateType = InitialStateType;
export type DispatchType = React.Dispatch<any>;

export type ContextParamType = [state: InitialStateType, dispatch: React.Dispatch<ActionType>];

export interface ProviderType {
	children: React.ReactNode;
}
