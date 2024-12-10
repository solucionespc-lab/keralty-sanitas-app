export interface CrearFormProps {
  cerrar: () => void;
}

export interface EditarFormProps {
  cerrar: () => void;
  idAuditoria: string;
  idContratista: string;
  permisos: string[];
}
