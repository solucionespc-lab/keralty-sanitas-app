import TablaNumerica from 'comunes/funcionales/tabla/TablaNumerica';
import { Bar } from 'comunes/funcionales/charts';
import { Titulo } from 'comunes/estilos/EstComunes';

import { optionesTabla1 } from '../constantes/ConstGenerales';

import styles from '../estilos/EstSeccionesInforme.module.css';

const InformeCiclo = () => {
  return (
    <>
      <Titulo style={{ textAlign: 'left' }}>
        {`Proporción de cumplimiento autoevaluación SG-SST según ciclo, 2024.`}
      </Titulo>
      <main className={styles.contenedor_informe}>
        <Bar options={optionesTabla1} nameX='Ciclo' nameY='Cumplimiento' />

        <TablaNumerica
          contenido={[
            { categoria: 'Planear', datos: [23, 25, 92] },
            { categoria: 'Hacer', datos: [60, 60, 100] },
            { categoria: 'Verificar', datos: [3.75, 5, 75] },
            { categoria: 'Actuar', datos: [10, 10, 100] },
          ]}
          encabezados={['Ciclo', 'Resultado', 'Puntaje máximo', '% obtenido']}
        />
      </main>
    </>
  );
};

export default InformeCiclo;
