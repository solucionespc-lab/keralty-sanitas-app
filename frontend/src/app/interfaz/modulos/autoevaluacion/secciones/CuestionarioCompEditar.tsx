import { useShallow } from 'zustand/react/shallow';
import { SelectString } from 'comunes/controles/select';
import Radio from 'comunes/controles/Radio';
import Date from 'comunes/controles/Date';

import {
  guardarDatosBasicos,
  useAutoevaluacion,
} from '../store/AutoevaluacionStore';
import { establecerAnnios } from '../funciones/Funciones';
import {
  tamanoEmpresa,
  tamanoEmpresa2,
} from '../constantes/ConstAutoevaluaciones';
import CuestionarioEditar from './componentes/CuestionarioEditar';

import stCuestionario from '../estilos/EstCuestionario.module.css';
import styles from '../estilos/EstAutoevaluaciones.module.css';

const CuestionarioCompEditar = () => {
  const { empresa, fechaCreacion, annio } = useAutoevaluacion(
    useShallow(({ empresa, fechaCreacion, annio }) => ({
      empresa,
      fechaCreacion,
      annio,
    }))
  );

  return (
    <section className={stCuestionario.cuestionario}>
      <div className={stCuestionario.cuestionario_info_container}>
        <div>
          <h4>Nombre de la empresa</h4>
          <p className={styles.info_nombres}>{empresa.nombre}</p>
        </div>

        <div style={{ display: 'flex', gap: '1em' }}>
          <Date
            disabled
            label='Fecha de evaluación'
            value={fechaCreacion}
            onChange={(fecha) =>
              guardarDatosBasicos('fechaCreacion', fecha.target.value)
            }
          />
          <SelectString
            disabled
            value={annio.toString()}
            onChange={(e) => guardarDatosBasicos('annio', Number(e))}
            optionsArray={establecerAnnios()}
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
            disabled
            name='riesgo'
            label='Riesgo'
            onChange={(r) => {
              guardarDatosBasicos('riesgo', r.target.value);
            }}
            options={['I', 'II', 'III', 'IV', 'V']}
            value={empresa.riesgo}
          />

          <Radio
            disabled
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
      <CuestionarioEditar />
    </section>
  );
};

export default CuestionarioCompEditar;
