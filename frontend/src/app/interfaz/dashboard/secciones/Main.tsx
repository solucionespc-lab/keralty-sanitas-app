import { useNavigate } from 'react-router-dom';
import usePermisos from 'hooks/Permisos';
import trabajadores from 'assets/main/trabajadores.svg';
import informes from 'assets/main/informes.svg';
import evaluaciones from 'assets/main/evaluaciones.svg';
import contratistas from 'assets/main/contratistas.svg';
import auditorias from 'assets/main/auditorias.svg';

import styles from '../estilos/EstTarjetas.module.css';

import type { ModulosParams } from '../types/DashboardTypes';

const imagenes = {
  trabajadores,
  contratistas,
  auditorias,
  evaluaciones,
  informes,
  trabajadoresContratista: trabajadores,
  planes: evaluaciones,
};

const PanelPrincipal = ({ modulos }: { modulos: ModulosParams[] }) => {
  const { accesoModulos } = usePermisos();
  const navigate = useNavigate();

  const modulosConPermiso = modulos.filter((modulo) =>
    accesoModulos.some((acceso) => modulo.llaveModulo === acceso)
  );

  return (
    <main className={styles.contenedor_dashboard}>
      {modulosConPermiso.map((item) => {
        if (item.estaActivo) {
          return (
            <section
              className={styles.dashboard_tarjetas}
              role='button'
              key={item.titulo}
              onClick={() => navigate(item.url)}
            >
              <h1 className={styles.titulo}>{item.titulo}</h1>
              <img
                className={styles.dashboard_imagenes}
                src={imagenes?.[item.llaveModulo]}
                alt='Ilustración coorporativa'
              />
            </section>
          );
        }
        return null;
      })}
    </main>
  );
};

export default PanelPrincipal;
