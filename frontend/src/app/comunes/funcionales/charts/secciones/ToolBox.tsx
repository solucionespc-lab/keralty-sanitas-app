import { useState } from 'react';
import { Icon } from 'comunes/controles/Buttons/estilos/Estilos';

import { Iconografia } from '../recursos/Iconografia';
import { DOWNLOAD_IMAGE_OPTIONS } from '../constantes/ChartConst';

import type { IToolboxProps } from '../types/ToolboxTypes';

const ToolBox = ({ data, chartInstance }: IToolboxProps) => {
  const [image, setImage] = useState('');

  return (
    <section className='tool-box-container'>
      <a
        href={image}
        download
        onClick={() => {
          if (chartInstance) {
            setImage(chartInstance.getDataURL(DOWNLOAD_IMAGE_OPTIONS));
          }
        }}
      >
        <Icon>{Iconografia.descargar.path}</Icon>
      </a>
      <div>{data}</div>
    </section>
  );
};

export default ToolBox;
