import Handlebars from 'handlebars';
import { fechaColombiana } from '../Funciones';

const helpersEvalDesempenoContratista = () => {
  Handlebars.registerHelper('fechaMA', (value) => fechaColombiana(value));
};

export default helpersEvalDesempenoContratista;
