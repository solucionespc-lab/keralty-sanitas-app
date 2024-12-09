const fechaCompletaStr = Intl.DateTimeFormat('es-CO', {
  timeZone: 'America/Bogota',
  year: 'numeric',
  month: 'long',
}).format;

module.exports = {
  fechaMA: (value) => fechaCompletaStr(value)
};
