import { Workbook } from 'exceljs';

import type { PreguntaEvaluacionType } from '../types/InformesTypes';

export async function exportarPlanes(planes: PreguntaEvaluacionType[]) {
  const wookbook = new Workbook();
  const hoja = wookbook.addWorksheet('planes de acción');
  const nombre = `Planes de acción - ${new Date().toISOString().split('T')[0]}.xlsx`;

  const planesTemporales = planes.map((plan) => ({
    ...plan,
    fechaCompromiso: '',
    fechaEjecucion: '',
    responsable: '',
  }));

  hoja.columns = [
    { key: 'plan', header: 'Descripción del plan de acción', width: 45 },
    { key: 'fechaCompromiso', header: 'Fecha de compromiso', width: 15 },
    { key: 'fechaEjecucion', header: 'Fecha de ejecución', width: 15 },
    { key: 'resposable', header: 'Responsable(s)', width: 15 },
  ];

  planesTemporales.forEach((plan) => hoja.addRow(plan));
  hoja.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
    cell.alignment = {
      horizontal: 'center',
      vertical: 'middle',
      wrapText: true,
    };
  });

  const buffer = await wookbook.xlsx.writeBuffer();
  const archivo = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  return { archivo, nombre };
}
