import { Workbook } from 'exceljs';

import { COLUMNAS_PLANES } from '../constantes/ConstExportar';

import type { PlanesType } from '../types/InformesTypes';

export async function exportarPlanes(planes: PlanesType[]) {
  const wookbook = new Workbook();
  const hoja = wookbook.addWorksheet('planes de acción');
  const nombre = `Planes de acción - ${new Date().toISOString().split('T')[0]}.xlsx`;

  hoja.columns = COLUMNAS_PLANES;
  planes.forEach((plan) => hoja.addRow(plan));

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
