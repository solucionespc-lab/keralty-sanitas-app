import TablaNumerica from 'comunes/funcionales/tabla/TablaNumerica';
import { Bar } from 'comunes/funcionales/charts';
import { Titulo } from 'comunes/estilos/EstComunes';

import { opcionesGrafica2 } from '../constantes/ConstGenerales';

import styles from '../estilos/EstSeccionesInforme.module.css';

const InformeEstandar = () => {
  return (
    <>
      <Titulo style={{ textAlign: 'left' }}>
        {`Proporción de cumplimiento autoevaluación SG-SST según estándar, 2024.`}
      </Titulo>
      <main className={styles.contenedor_informe}>
        <Bar options={opcionesGrafica2} nameX='Estándar' nameY='Cumplimiento' />

        <TablaNumerica
          contenido={[
            { categoria: 'Recursos', datos: [10, 10, 100] },
            { categoria: 'Gestión integral', datos: [15, 15, 100] },
            { categoria: 'Gestión de la salud', datos: [18, 20, 90] },
            {
              categoria: 'Gestion de P y R',
              datos: [29, 30, 96],
            },
            { categoria: 'Gestión de amenazas', datos: [10, 10, 100] },
            { categoria: 'Verificación', datos: [4.75, 5, 95] },
            { categoria: 'Mejoramiento', datos: [10, 10, 100] },
          ]}
          encabezados={[
            'Estandar',
            'Resultado',
            'Puntaje máximo',
            '% obtenido',
          ]}
        />
      </main>
    </>
  );
};

export default InformeEstandar;
