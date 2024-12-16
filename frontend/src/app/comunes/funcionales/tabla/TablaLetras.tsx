import { nanoid } from 'nanoid';

import { ITablaLetraProps } from './types/TablaTypes';
import FilaDatos from './secciones/FilaDatos';

import './estilos/EstilosTablas.css';

const TablaLetras = ({ encabezados, contenido, titulo }: ITablaLetraProps) => {
  return (
    <table>
      <caption className='title'>{titulo}</caption>
      <thead>
        <tr className='table-row-container'>
          {encabezados.map((nombre) => (
            <th key={nanoid()}>{nombre}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {contenido.map((dato) => {
          return (
            <tr className='table-data-container' key={nanoid()}>
              <td>{dato.categoria}</td>
              <FilaDatos datos={dato.datos} />
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TablaLetras;
