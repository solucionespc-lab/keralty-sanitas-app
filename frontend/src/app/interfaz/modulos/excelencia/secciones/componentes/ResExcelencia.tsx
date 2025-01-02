import { useState, useEffect } from 'react';
import { interpretaciones } from 'modulos/excelencia/utilidades/Funciones';
import { useExcelencia } from 'modulos/excelencia/store/StoreExcelencia';
import { EQUIVALENCIAS_CINTURONES } from 'modulos/excelencia/constantes/ConstGenerales';

import styles from '../../estilos/EstAutoevaluaciones.module.css';

const ResultadoAuditorias = () => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const unSubs = useExcelencia.subscribe(({ puntajeTotal }) => {
      setTotal(Number(puntajeTotal));
    });

    return unSubs;
  }, []);

  const interpretacion = interpretaciones(total);

  return (
    <main>
      <section
        style={{ alignItems: 'center', padding: '0.5em 0' }}
        className={styles.contenedor_flex}
      >
        <h4>Grado de cinturón - </h4>
        <div className={`${styles.calificacion} ${styles[interpretacion]}`}>
          <span>
            {
              EQUIVALENCIAS_CINTURONES[
                interpretacion as keyof typeof EQUIVALENCIAS_CINTURONES
              ]
            }
          </span>
        </div>
      </section>
    </main>
  );
};

export default ResultadoAuditorias;
