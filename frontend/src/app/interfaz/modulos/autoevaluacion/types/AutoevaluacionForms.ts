export interface CrearFormProps {
  cerrar: () => void;
}

export interface EditarFormProps {
  cerrar: () => void;
  idAuditoria: string;
  idContratista: string;
  permisos: string[];
}

interface PreguntaEvaluacionType {
  codigo: string;
  ciclo: string;
  estandar: string;
  item: string;
  criterio: string;
  modo: string;
  ponderacion: number;
  orden?: number;
  respuesta?: string;
  planes?: string[];
  observaciones: string;
}

export type CicloPropsType = {
  cuestionario: Record<string, PreguntaEvaluacionType[]>;
  tema: string;
};
