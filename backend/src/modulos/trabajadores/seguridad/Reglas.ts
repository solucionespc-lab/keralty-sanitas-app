import { allow } from 'graphql-shield';

const trabajadoresQueries = {
  getTrabajadores: allow,
  getTrabajador: allow,
  getInformeOcupacional: allow,
  getInformeSociodemografico: allow,
  getResumen: allow,
};

const trabajadoresMutations = {
  saveTrabajador: allow,
  trabajadoresAlistas: allow,
  importTrabajadores: allow,
  updateTrabajador: allow,
};

export { trabajadoresMutations, trabajadoresQueries };
