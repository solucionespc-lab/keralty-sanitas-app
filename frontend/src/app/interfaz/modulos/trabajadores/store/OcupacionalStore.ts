import { devtools } from 'zustand/middleware';
import { create } from 'zustand';
import { DEV_MODE } from 'configuraciones/VariablesEstaticasGlobales';

import { IOcupacionalesTrab } from '../types/TrabajadoresTypes';
import { datosOcupacionales } from '../constantes/ConstGenerales';

export const useOcupacionalesStore = create(
  devtools(
    () => ({
      historiaOcupacional: [{ ...datosOcupacionales }],
    }),
    { enabled: DEV_MODE, name: 'Ocupacionales' }
  )
);

// Funciones para modificar el Store
export const guardar = (valor: string, key: string, index: number) => {
  const estado = [...useOcupacionalesStore.getState().historiaOcupacional];
  const nuevoArray = estado?.map((item, idx) => {
    if (index === idx) return { ...item, [key]: `${valor}` };
    return item;
  });

  useOcupacionalesStore.setState(() => ({
    historiaOcupacional: nuevoArray,
  }));
};

export const agregarHistoria = () => {
  const estado = [...useOcupacionalesStore.getState().historiaOcupacional];

  estado.push({ ...datosOcupacionales });
  useOcupacionalesStore.setState({ historiaOcupacional: estado });
};

export const eliminarHistoria = (index: number) => {
  const estado = [...useOcupacionalesStore.getState().historiaOcupacional];

  estado.splice(index, 1);
  useOcupacionalesStore.setState(() => ({
    historiaOcupacional: estado,
  }));
};

export const cambiarDatoEnArray = (valor: string, key: string) => {
  const estado = [...useOcupacionalesStore.getState().historiaOcupacional];
  const nuevaHistoria = estado.map((historia) => ({
    ...historia,
    [key]: valor,
  }));

  useOcupacionalesStore.setState(() => ({
    historiaOcupacional: nuevaHistoria,
  }));
};

export const actualizarInfoOcup = (datos: IOcupacionalesTrab[]) => {
  useOcupacionalesStore.setState({ historiaOcupacional: datos });
};

export const resetOcupacional = () => {
  useOcupacionalesStore.setState(() => ({
    historiaOcupacional: [{ ...datosOcupacionales }],
  }));
};

export const estadoOcupacionales = () => useOcupacionalesStore.getState();
