export const CONVENCION_RESULTADOS = {
  totalmente: '2. Cumplió totalmente las expectativas',
  parcialmente: '1. Cumplió medianamente las expectativas',
  no_cumple: '0. No cumplió las expectativas',
};

export const CONVENCION_ESTADOS = {
  aprobado: 'Aprobado',
  sin_aprobar: 'Sin aprobación',
};

export const ACTA_INICIAL = {
  id: '',
  idEmpresa: '',
  numeroSds: '',
  poliza: '',
  fechaEjecucion: '',
  nombreEmpresa: '',
  nit: '',
  direccion: '',
  telefono: '',
  correo: '',
  modalidad: '',
  asistentes: [
    {
      nombre: '',
      cargo: '',
      telefono: '',
    },
  ],
  actividades: [
    {
      total: 0,
      nombre: '',
      horas: 0,
      horasInforme: 0,
    },
  ],
  compromisos: [
    {
      descripcion: '',
      responsable: '',
      fecha: '',
    },
  ],
  desplazamiento: false,
  descDesplazamiento: '',
  evaluacionActividad: '',
  motivoIncumplimiento: '',
  responsableCliente: '',
  cargoCliente: '',
  firmaCliente: '',
  responsableProveedor: '',
  cargoProveedor: '',
  firmaProveedor: '',
  estado: '',
  resultado: '',
};
