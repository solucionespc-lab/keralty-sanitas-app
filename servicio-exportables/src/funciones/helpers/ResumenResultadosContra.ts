import Handlebars from 'handlebars';

const helpersEvalResumenContra = () => {
  const calcularProp = (ptsArray: number[]) => {
    const maxPuntaje = ptsArray.length;
    const numerador = ptsArray.reduce((a, b) => a + b);
    const denominador = maxPuntaje === 0 ? 1 : maxPuntaje;
    const total = (numerador / denominador).toFixed(1);

    return Number(total);
  };

  const calcularTotalProp = (ptsContra: number[], ptsComer: number[]) => {
    const totalContra = ptsContra.reduce((a, b) => a + b) / ptsContra.length;
    const totalComer = ptsComer.reduce((a, b) => a + b) / ptsComer.length;

    const numerador = totalContra + totalComer;
    const denominador = 2;
    const total = numerador / denominador;

    return Number(total.toFixed(1));
  };

  Handlebars.registerHelper('totalContra', (ptsArray) =>
    calcularProp(ptsArray)
  );
  Handlebars.registerHelper('totalComer', (ptsArray) => calcularProp(ptsArray));
  Handlebars.registerHelper('totalSst', (ptsArray) => calcularProp(ptsArray));
  Handlebars.registerHelper('totalAmb', (ptsArray) => calcularProp(ptsArray));
  Handlebars.registerHelper('totalGeneral', (ptsContra, ptsComer) =>
    calcularTotalProp(ptsContra, ptsComer)
  );
};

export default helpersEvalResumenContra;
