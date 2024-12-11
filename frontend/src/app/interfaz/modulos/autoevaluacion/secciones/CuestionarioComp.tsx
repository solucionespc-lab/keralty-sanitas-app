import { useShallow } from 'zustand/react/shallow';
import { useUserStore } from 'store/PrincipalStore';
import { useEffect } from 'react';
import useListados from 'hooks/Listados';
import { useSuspenseQuery } from '@apollo/client';

import { QueryEmpresa } from '../types/AutoevaluacionTypes';
import {
  guardarCuestionario,
  guardarDatosEmpresa,
  useAutoevaluacion,
} from '../store/AutoevaluacionStore';
import Cuestionario from './componentes/Cuestionario';
import { tamanoEmpresa } from '../constantes/ConstAutoevaluaciones';

import { GET_EMPRESA_AUTOEVALUACION } from '../peticiones/Queries';
import stCuestionario from '../estilos/EstCuestionario.module.css';
import styles from '../estilos/EstAutoevaluaciones.module.css';

const CuestionarioComp = () => {
  const { listas } = useListados();
  const { usuario } = useUserStore();
  const { data } = useSuspenseQuery<QueryEmpresa>(GET_EMPRESA_AUTOEVALUACION, {
    variables: {
      idEmpresa: usuario?.claims.idEmpresa ?? '',
    },
  });
  const { empresa } = useAutoevaluacion(
    useShallow(({ empresa }) => ({
      empresa,
    }))
  );

  useEffect(() => {
    guardarDatosEmpresa(data.getEmpresa, usuario?.claims.idEmpresa ?? '');
    guardarCuestionario(Object.values(listas.evaluaciones), data.getEmpresa);
  }, [data]);

  return (
    <section className={stCuestionario.cuestionario}>
      <div className={stCuestionario.cuestionario_info_container}>
        <div>
          <h4>Nombre de la empresa</h4>
          <p className={styles.info_nombres}>{empresa.nombre}</p>
        </div>
        <div>
          <h4>Tipo de riesgo</h4>
          <p className={styles.info_nombres}>{`Riesgo ${empresa.riesgo}`}</p>
        </div>
        <div>
          <h4>Tamaño de la empresa</h4>
          <p className={styles.info_nombres}>
            {tamanoEmpresa[empresa.tamano as keyof typeof tamanoEmpresa]}
          </p>
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
