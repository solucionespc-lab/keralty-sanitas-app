import { nanoid } from 'nanoid';

import { ITablaProps } from './types/TablaTypes';
import Totales from './secciones/Totales';
import FilaDatos from './secciones/FilaDatos';

import styles from './estilos/EstilosTablas.module.css';

const TablaNumerica = ({ encabezados, contenido, titulo }: ITablaProps) => {
  return (
    <table className={styles.table_container}>
      <caption className='title'>{titulo}</caption>
      <thead>
        <tr className={styles.table_row_container}>
          {encabezados.map((nombre) => (
            <th key={nanoid()}>{nombre}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {contenido.map((dato) => {
          return (
            <tr className={styles.table_data_container} key={nanoid()}>
              <td>{dato.categoria}</td>
              <FilaDatos datos={dato.datos} />
            </tr>
          );
        })}
      </tbody>

      <Totales contenido={contenido} />
    </table>
  );
};

export default TablaNumerica;
