export interface CodigoTema {
  Tema001: 'TEMA001';
  Tema002: 'TEMA002';
  Tema003: 'TEMA003';
  Tema004: 'TEMA004';
}

export type SessionType = {
  [key: string]: string | null;
};

interface CantidadTrabajadores {
  code: string;
  value: string;
}

interface Generico {
  id: string;
  value: string;
}

interface CategoriaCumplimiento {
  codigo: string;
  ponderado: number;
  tipo: string;
}

interface ClasificacionProveedor {
  codigo: string;
  tipo: string;
}

interface DiasHabilesSeguridad {
  diaHabil: number;
  ultimosDigitosA: number | string;
  ultimosDigitosB: number | string;
}

interface EvaluacionProveedores {
  codigo: string;
  codigoTema: keyof CodigoTema;
  descripcion: string;
  tema: string;
  numero?: number;
}

interface AuditoriaPregType {
  descripcion: string;
  respuesta: string;
  observaciones: string;
  codigoPregunta: string;
  puntaje: number;
  tema: string;
}

interface Meses {
  codigo: string;
  mes: number;
  tipo: string;
}

interface PuntajeEvaluar {
  codigo: string;
  puntaje: number;
  tipo: string;
}

interface TemasEvaluacione {
  codigoTema: CodigoTema;
  descripcion: string;
  ponderado: number;
}

interface Temas {
  codigo: string;
  periodoVigencia: string;
  tipo: string;
}
interface ListadoDane {
  ciudad: string;
  codigo: string;
  codigoDane: string;
  departamento: string;
}

export interface Listas {
  cantidadTrabajadores: Record<string, CantidadTrabajadores>;
  categoriaCumplimiento: Record<string, CategoriaCumplimiento>;
  clasificacionProveedor: Record<string, ClasificacionProveedor>;
  diasHabilesSeguridad: Record<string, DiasHabilesSeguridad>;
  estadoInduccion: Record<string, ClasificacionProveedor>;
  estados: Record<string, ClasificacionProveedor>;
  evaluacionProveedores: Record<string, EvaluacionProveedores>;
  listaOrigen: Record<string, ClasificacionProveedor>;
  listaOrigenPlanes: Record<string, ClasificacionProveedor>;
  meses: Record<string, Meses>;
  preguntasAuditoria: Record<string, AuditoriaPregType>;
  preguntasAudAmbiental: Record<string, AuditoriaPregType>;
  puntajeEvaluar: Record<string, PuntajeEvaluar>;
  servicios: Record<string, ClasificacionProveedor>;
  tipoEvaluacion: Record<string, ClasificacionProveedor>;
  temasAuditoria: Record<string, CategoriaCumplimiento>;
  tipoContratista: Record<string, ClasificacionProveedor>;
  temasEvaluaciones: Record<string, TemasEvaluacione>;
  temasEventos: Record<string, Temas>;
  temasHistorialTrabajador: Record<string, Temas>;
  temasPlan: Record<string, CategoriaCumplimiento>;
  tipoAuditoria: Record<string, ClasificacionProveedor>;
  tipoBien: Record<string, ClasificacionProveedor>;
  tipoCriterio: Record<string, ClasificacionProveedor>;
  tipoGenero: Record<string, ClasificacionProveedor>;
  tipoID: Record<string, ClasificacionProveedor>;
  tipoProveedor: Record<string, ClasificacionProveedor>;
  tipoRH: Record<string, ClasificacionProveedor>;
  tipoSangre: Record<string, ClasificacionProveedor>;
  RH: Record<string, string>;
  cargos: Record<string, Generico>;
  contratos: Record<string, Generico>;
  enumerador: Record<string, { [key: string]: string }>;
  estadoCivil: Record<string, Generico>;
  genero: Record<string, ListadoType>;
  gerencias: Record<string, ListadoType>;
  grupoSanguineo: Record<string, ListadoType>;
  nivelEducativo: Record<string, ListadoType>;
  procesos: Record<string, ListadoType>;
  profesiones: Record<string, ListadoType>;
  turnos: Record<string, ListadoType>;
  listaDane: Record<string, ListadoDane>;
}

export interface ListadosType {
  listas: Listas;
}
