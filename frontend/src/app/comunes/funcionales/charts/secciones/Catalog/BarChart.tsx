/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import { CanvasRenderer } from 'echarts/renderers';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  DataZoomComponent,
  BrushComponent,
  VisualMapComponent,
  AxisPointerComponent,
  LegendComponent,
} from 'echarts/components';
import { BarChart, LineChart } from 'echarts/charts';
import '../../estilos/GraphStyles.css';

import ToolBox from '../ToolBox';
import Labels from '../Labels';
import { LOADING_STYLE } from '../../constantes/ChartConst';

import type { IChartConfig } from 'comunes/funcionales/charts/types/ChartsTypes';

echarts.use([
  BarChart,
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  DataZoomComponent,
  BrushComponent,
  VisualMapComponent,
  AxisPointerComponent,
  LegendComponent,
]);

const Bar = ({
  options,
  theme,
  loading = false,
  title,
  nameX,
  nameY,
}: IChartConfig) => {
  const containerRef = useRef(null);
  let chart = containerRef.current
    ? echarts.getInstanceByDom(containerRef.current)
    : null;

  useEffect(() => {
    if (chart === null) {
      chart = echarts.init(containerRef.current, theme);
    }

    chart?.setOption(options);
    chart?.resize({ width: 'auto', height: 'auto' });

    if (loading) {
      chart?.showLoading(LOADING_STYLE);
    } else {
      chart?.hideLoading();
    }
  }, [loading]);

  return (
    <main className='charts-component'>
      {title && <h4 className='label-title'>{title}</h4>}
      <ToolBox chartInstance={chart} data={['']} />
      <section
        id={nanoid()}
        ref={containerRef}
        className='charts-container'
      ></section>
      <Labels nameX={nameX} nameY={nameY} />
    </main>
  );
};

export default Bar;
