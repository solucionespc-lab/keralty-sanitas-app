export interface Colores {
  primario: string;
  secundario: string;
  advertencia: string;
  error: string;
  informacion: string;
  exitoso: string;
  desactivado: string;
}

export interface PropsAvisos {
  fontColor?: keyof Colores;
}

export interface ToastType {
  advertencia: string;
  error: string;
  informacion: string;
  exitoso: string;
  notificacion: string;
}

export type TipoToast = keyof ToastType;
