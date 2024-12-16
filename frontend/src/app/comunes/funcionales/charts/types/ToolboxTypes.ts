import type { EChartsType } from 'echarts/core';

export interface IToolboxProps {
  data: string[];
  chartInstance: EChartsType | null | undefined;
}
