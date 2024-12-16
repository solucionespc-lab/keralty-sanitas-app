import { nanoid } from 'nanoid';

import { IdatosProps } from '../types/TablaTypes';
import useTablaDatos from '../hooks/TablaHook';

import styles from '../estilos/EstilosTablas.module.css';

const Totales = ({ contenido }: IdatosProps) => {
  const { totales } = useTablaDatos({ contenido });

  return (
    <tfoot>
      <tr className={styles.table_foot_container}>
        <td>Total</td>
        {totales.map((total) => (
          <td key={nanoid()}>{total}</td>
        ))}
      </tr>
    </tfoot>
  );
};

export default Totales;
