import { useShallow } from 'zustand/react/shallow';
import { useUserStore } from 'store/PrincipalStore';
import Cargando from 'comunes/informativos/Cargando';
import { useQuery } from '@apollo/client';

import Cuestionario from './componentes/Cuestionario';
import { QueryEmpresa } from '../types/AutoevaluacionTypes';
import {
  guardarDatosEmpresa,
  useAutoevaluacion,
} from '../store/AutoevaluacionStore';

import { GET_EMPRESA_AUTOEVALUACION } from '../peticiones/Queries';
import stCuestionario from '../estilos/EstCuestionario.module.css';
import styles from '../estilos/EstAutoevaluaciones.module.css';

const CuestionarioComp = () => {
  const { usuario } = useUserStore();
  const { empresa } = useAutoevaluacion(
    useShallow(({ empresa }) => ({
      empresa,
    }))
  );
  const { loading } = useQuery<QueryEmpresa>(GET_EMPRESA_AUTOEVALUACION, {
    variables: {
      idEmpresa: usuario?.claims.idEmpresa ?? '',
    },
    onCompleted: ({ getEmpresa }) => {
      guardarDatosEmpresa(getEmpresa, usuario?.claims.idEmpresa ?? '');
    },
    onError: (err) => console.log(err),
  });

  if (loading)
    return <Cargando mensaje='Consultando información de la empresa' />;

  return (
    <section className={stCuestionario.cuestionario}>
      <div className={stCuestionario.cuestionario_info_container}>
        <div>
          <h4>Nombre de la empresa</h4>
          <p className={styles.info_nombres}>{empresa.tipoEmpresa}</p>
        </div>
        <div>
          <h4>Riesgo</h4>
          <p className={styles.info_nombres}>{empresa.riesgo}</p>
        </div>
        <div>
          <h4>Tamaño de la empresa</h4>
          <p className={styles.info_nombres}>{empresa.tamano}</p>
        </div>
        <div>
          <h4>Tipo de empresa</h4>
          <p className={styles.info_nombres}>{empresa.tipoEmpresa}</p>
        </div>
      </div>

      <Cuestionario />
    </section>
  );
};

export default CuestionarioComp;
