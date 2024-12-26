import { useUserStore } from 'store/PrincipalStore';
import { useEffect } from 'react';
import { saveAs } from 'file-saver';
import { useSuspenseQuery } from '@apollo/client';

import { exportarPlanes } from '../utilidades/Exportar';
import { useFiltrosStore } from '../store/FiltrosInformeStore';
import { DescargarExcelIcon } from '../recursos/Iconografia';
import Plan from './componentes/Plan';
import { actualizarPlanes } from '../store/StoreInformes';

import { GET_PLANES } from '../peticiones/Queries';
import styles from '../estilos/EstInformePlanes.module.css';

import type { PlanesArgs, Query } from '../types/InformesTypes';

const InformePlanes = () => {
  const { usuario } = useUserStore();
  const { fechaInicio, fechaFin } = useFiltrosStore((state) => state);

  const { data } = useSuspenseQuery<Query, PlanesArgs>(GET_PLANES, {
    variables: {
      filtros: { fechaInicio, fechaFin },
      idEmpresa: usuario?.claims.idEmpresa ?? '',
    },
  });

  useEffect(() => {
    actualizarPlanes(data.getPlanesAccion);
  }, []);

  return (
    <main className={styles.contenedor_planes}>
      <button
        className={styles.boton_exportar}
        onClick={async () => {
          const { archivo, nombre } = await exportarPlanes(
            data.getPlanesAccion
          );
          saveAs(archivo, nombre);
        }}
      >
        <DescargarExcelIcon />
        <span>Exportar a Excel</span>
      </button>

      <Plan />
    </main>
  );
};

export default InformePlanes;
