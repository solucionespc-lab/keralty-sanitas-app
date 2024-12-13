import { useShallow } from 'zustand/react/shallow';
import { useUserStore } from 'store/PrincipalStore';
import { useEffect } from 'react';
import useListados from 'hooks/Listados';
import { SelectString } from 'comunes/controles/select';
import Radio from 'comunes/controles/Radio';
import Date from 'comunes/controles/Date';
import { useSuspenseQuery } from '@apollo/client';

import { QueryEmpresa } from '../types/AutoevaluacionTypes';
import {
  guardarCuestionario,
  guardarDatosBasicos,
  guardarDatosEmpresa,
  useAutoevaluacion,
} from '../store/AutoevaluacionStore';
import {
  tamanoEmpresa,
  tamanoEmpresa2,
} from '../constantes/ConstAutoevaluaciones';
import Cuestionario from './componentes/Cuestionario';

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
  const { empresa, fechaCreacion, annio } = useAutoevaluacion(
    useShallow(({ empresa, fechaCreacion, annio }) => ({
      empresa,
      fechaCreacion,
      annio,
    }))
  );

  useEffect(() => {
    guardarDatosEmpresa(data.getEmpresa, usuario?.claims.idEmpresa ?? '');
    guardarCuestionario(Object.values(listas.evaluaciones), data.getEmpresa);
  }, [data]);

  console.log(fechaCreacion);

  return (
    <section className={stCuestionario.cuestionario}>
      <div className={stCuestionario.cuestionario_info_container}>
        <div>
          <h4>Nombre de la empresa</h4>
          <p className={styles.info_nombres}>{empresa.nombre}</p>
        </div>

        <div style={{ display: 'flex', gap: '1em' }}>
          <Date
            label='Fecha de evaluación'
            value={fechaCreacion}
            onChange={(fecha) =>
              guardarDatosBasicos('fechaCreacion', fecha.target.value)
            }
          />
          <SelectString
            value={annio.toString()}
            onChange={(e) => guardarDatosBasicos('annio', Number(e))}
            optionsArray={[
              '2022',
              '2023',
              '2024',
              '2025',
              '2026',
              '2027',
              '2028',
            ]}
            label='Vigencia'
            name='viegencia'
          />
        </div>

        <div
          style={{
            display: 'flex',
            gap: '1em',
            justifyContent: 'space-between',
          }}
        >
          <Radio
            name='riesgo'
            label='Riesgo'
            onChange={(r) => {
              guardarDatosBasicos('riesgo', r.target.value);
            }}
            options={['I', 'II', 'III', 'IV', 'V']}
            value={empresa.riesgo}
          />

          <Radio
            name='tamano'
            label='Tamaño de la empresa'
            onChange={(t) => {
              guardarDatosBasicos(
                'tamano',
                tamanoEmpresa[t.target.value as keyof typeof tamanoEmpresa]
              );
            }}
            options={['10 o menos', 'Entre 11 y 50', 'Más de 50']}
            value={
              tamanoEmpresa2[empresa.tamano as keyof typeof tamanoEmpresa2]
            }
          />
        </div>
      </div>
      <Cuestionario />
    </section>
  );
};

export default CuestionarioComp;
