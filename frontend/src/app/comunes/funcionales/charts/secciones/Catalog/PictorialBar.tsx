import { useEffect, useRef, useState } from 'react';
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
import { PictorialBarChart } from 'echarts/charts';
import '../../estilos/GraphStyles.css';

import ToolBox from '../ToolBox';
import Labels from '../Labels';
import {
  DOWNLOAD_IMAGE_OPTIONS,
  LOADING_STYLE,
} from '../../constantes/ChartConst';

import type { IChartConfig } from 'comunes/funcionales/charts/types/ChartsTypes';

echarts.use([
  PictorialBarChart,
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

const PictorialBar = ({
  options,
  theme,
  loading = false,
  title,
  nameX,
  nameY,
}: IChartConfig) => {
  const containerRef = useRef(null);
  const [urlImage, setUrlImage] = useState('');

  useEffect(() => {
    if (containerRef.current && containerRef !== undefined) {
      const chart = echarts.init(containerRef.current, theme);
      chart.resize({ width: 'auto', height: 'auto' });
      chart.setOption(options);

      if (loading) {
        chart.showLoading(LOADING_STYLE);
      } else {
        chart.hideLoading();
      }

      setUrlImage(chart.getDataURL(DOWNLOAD_IMAGE_OPTIONS));
    }
  }, [loading]);

  return (
    <main className='charts-component'>
      <h4 className='label-title'>{title}</h4>
      <ToolBox chartImage={urlImage} data={['']} />
      <section ref={containerRef} className='charts-container'></section>
      <Labels nameX={nameX} nameY={nameY} />
    </main>
  );
};

export default PictorialBar;
