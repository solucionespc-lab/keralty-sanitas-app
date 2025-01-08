import TablaNumerica from 'comunes/funcionales/tabla/TablaNumerica';
import Radar from 'comunes/funcionales/charts/secciones/Catalog/Radar';

import { opcionesGraficaRadar } from '../constantes/ConstGenerales';

import styles from '../estilos/EstSeccionesInforme.module.css';

const InformeEstandar = () => {
  return (
    <>
      <main className={styles.contenedor_informe}>
        <Radar
          title='Resultados de autoevaluación excelencia según dimensión'
          options={opcionesGraficaRadar}
          nameX='Estándar'
          nameY='Cumplimiento'
        />

        <TablaNumerica
          contenido={[
            { categoria: 'Liderazgo', datos: [100, 100] },
            { categoria: 'Objetivos', datos: [100, 100] },
            { categoria: 'Propósito', datos: [110, 90] },
            {
              categoria: 'SST',
              datos: [100, 100],
            },
            {
              categoria: 'Compromiso',
              datos: [100, 70],
            },
          ]}
          encabezados={[
            'Dimensiones',
            'Resultado esperado',
            'Resultado obtenido',
          ]}
        />
      </main>
    </>
  );
};

export default InformeEstandar;
