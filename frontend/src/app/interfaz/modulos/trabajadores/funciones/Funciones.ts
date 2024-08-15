import { InfoQueryTrabajadores } from '../types/TrabajadoresTypes';
import { enumeradorFunc } from '../types/FuncionesType';
import { estadoTrabajadores } from '../store/TrabStore';
import { estadoOcupacionales } from '../store/OcupacionalStore';
import { estadoEmergencias } from '../store/EmergenciasStore';

export const numeroOrdinal: enumeradorFunc = (
  number,
  terminacion,
  enumerador
) => {
  let outputEumn = '';
  let rest = number;
  const c = Math.trunc(number / 100);
  rest = rest % 100;
  const d = Math.trunc(rest / 10);
  const u = rest % 10;

  const listaAux = { ...enumerador };

  if (c) outputEumn += `${listaAux[`${c * 100}`]}${terminacion} `;
  if (d) outputEumn += `${listaAux[`${d * 10}`]}${terminacion} `;
  if (u)
    outputEumn += `${listaAux[`${u}`]}${u === 1 || u === 3 ? '' : terminacion}`;

  return outputEumn;
};

export const organizarData = (data: InfoQueryTrabajadores) => {
  const {
    nombreContacto,
    numContacto,
    grupoSanguineo,
    rh,
    historiaOcupacional,
    ...sociodemografico
  } = data;
  const emergencia = { nombreContacto, numContacto, grupoSanguineo, rh };

  return {
    sociodemografico,
    emergencia,
    historiaOcupacional,
  };
};

export const prepararDatosTrab = (tipoEvento?: string) => {
  const sociodemografico = estadoTrabajadores();
  const { historiaOcupacional } = estadoOcupacionales();
  const emergencias = estadoEmergencias();

  const { idTrabajador, ...socio } = sociodemografico;
  const seRetira = socio.fechaRetiroEmp !== '9999-12-31';

  if (seRetira) {
    historiaOcupacional[historiaOcupacional.length - 1].fechaRetiroCargo =
      socio.fechaRetiroEmp;
  }

  if (tipoEvento === 'actualizar') {
    return {
      idTrabajador,
      input: {
        ...socio,
        ...emergencias,
        historiaOcupacional,
      },
    };
  }

  return {
    input: {
      idTrabajador,
      ...socio,
      ...emergencias,
      historiaOcupacional,
    },
  };
};
