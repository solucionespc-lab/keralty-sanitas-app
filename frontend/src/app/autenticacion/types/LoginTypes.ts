import React from 'react';

export interface FormatType {
  login: JSX.Element;
}

export type KeyFormat = keyof FormatType;
export type formEventType = React.FormEvent<HTMLFormElement>;

export interface IChangeFormat {
  changeFormat: (tipo: KeyFormat) => void;
}

export type TokenType = {
  tipo: string;
  regional: string[];
  centro: string[];
  grupo: string;
  rol: string;
  organizacion: string;
  permisos: string;
};

export interface ButtonProps {
  id?: string;
  name: string;
  style?: React.CSSProperties | undefined;
  loading?: boolean;
}
