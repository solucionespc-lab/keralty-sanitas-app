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
import { PieChart } from 'echarts/charts';
import '../../estilos/GraphStyles.css';

import ToolBox from '../ToolBox';
import { LOADING_STYLE } from '../../constantes/ChartConst';

import type { IChartConfig } from 'comunes/funcionales/charts/types/ChartsTypes';

echarts.use([
  PieChart,
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

const Donut = ({ options, theme, loading = false, title }: IChartConfig) => {
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
      <h4 className='label-title'>{title}</h4>
      <ToolBox chartInstance={chart} data={['']} />
      <section
        ref={containerRef}
        className='charts-container'
        id={nanoid(9)}
      ></section>
    </main>
  );
};

export default Donut;
