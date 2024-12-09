import helpersEvalDesempenoContratista from './helpers/EvalDesempenoContratista';
import helpersEvalResumenContra from './helpers/ResumenResultadosContra';

const getHelpersFile = (template: string) => {
  switch (template) {
    case 'EvalDesempenoContratista.hbs':
      return helpersEvalDesempenoContratista();

    case 'ResumenEvaluaciones.hbs':
      return helpersEvalResumenContra();

    default:
      return;
  }
};

export default getHelpersFile;
