import '../../estilos/GraphStyles.css';

import React from 'react';
import { nanoid } from 'nanoid';
import Cargando from 'comunes/informativos/Cargando';

import type { TagcloudProps } from 'comunes/funcionales/charts/types/ChartsTypes';

const TagWord = ({ loading = false, title, data }: TagcloudProps) => {
  // const totalDatos = Object.keys(data).length;

  // const calcularPesos = (value: number) => value / totalDatos;

  if (loading) return <Cargando mensaje='Cargando nube de palabras' />;

  return (
    <main className='charts-component'>
      <h4 className='label-title'>{title}</h4>
      <ul className='cloud' role='navigation' aria-label='Webdev tag cloud'>
        {Object.entries(data).map((values, index) => {
          const style = { '--size': index } as React.CSSProperties;

          return (
            <li key={nanoid()}>
              <p data-weight={values[1]} style={style}>
                {values[0]}
              </p>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default TagWord;
