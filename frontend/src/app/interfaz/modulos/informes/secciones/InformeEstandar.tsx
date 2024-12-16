import { useShallow } from 'zustand/react/shallow';
import TablaNumerica from 'comunes/funcionales/tabla/TablaNumerica';
import { Bar } from 'comunes/funcionales/charts';
import { Titulo } from 'comunes/estilos/EstComunes';

import { useEmpresa } from '../store/StoreInformes';
import { opcionesGrafica2 } from '../constantes/ConstGenerales';

import styles from '../estilos/EstSeccionesInforme.module.css';

const InformeEstandar = () => {
  const { empresa } = useEmpresa(
    useShallow(({ empresa }) => ({
      empresa,
    }))
  );

  return (
    <>
      <Titulo style={{ textAlign: 'left' }}>
        {`Proporción de cumplimiento autoevaluación SG-SST según estándar.
          ${empresa.nombre}, 2024.`}
      </Titulo>
      <main className={styles.contenedor_informe}>
        <Bar options={opcionesGrafica2} nameX='Estándar' nameY='Cumplimiento' />

        <TablaNumerica
          contenido={[
            { categoria: 'Recursos', datos: [6, 10, 60] },
            { categoria: 'Gestión integral', datos: [8, 15, 53.3] },
            { categoria: 'Gestión de la salud', datos: [18, 20, 90] },
            {
              categoria: 'Gestion de P y R',
              datos: [23, 30, 76.6],
            },
            { categoria: 'Gestión de amenazas', datos: [8, 10, 80] },
            { categoria: 'Verificación', datos: [2.5, 5, 50] },
            { categoria: 'Mejoramiento', datos: [7.5, 10, 75] },
          ]}
          encabezados={['Ciclo', 'Resultado', 'Puntaje máximo', '% obtenido']}
        />
      </main>
    </>
  );
};

export default InformeEstandar;
