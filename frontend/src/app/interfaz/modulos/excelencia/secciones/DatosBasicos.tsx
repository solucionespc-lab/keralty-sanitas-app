import { useShallow } from 'zustand/react/shallow';
import Text from 'comunes/controles/Text';
import { SelectString } from 'comunes/controles/select';
import Date from 'comunes/controles/Date';

import { establecerAnnios } from '../utilidades/Funciones';
import { guardarDatosBasicos, useExcelencia } from '../store/StoreExcelencia';

import stCuestionario from '../estilos/EstCuestionario.module.css';
import styles from '../estilos/EstAutoevaluaciones.module.css';

const DatosBasicos = () => {
  const { empresa, fechaCreacion, annio, evaluador, area } = useExcelencia(
    useShallow(({ empresa, fechaCreacion, annio, evaluador, area }) => ({
      empresa,
      fechaCreacion,
      annio,
      evaluador,
      area,
    }))
  );

  return (
    <>
      <section
        className={styles.contenedor_flex}
        style={{ justifyContent: 'space-evenly' }}
      >
        <div>
          <h4>Nombre de la empresa</h4>
          <p className={styles.info_nombres}>{empresa.nombre}</p>
        </div>
        <div>
          <h4>Tipo de riesgo</h4>
          <p>{`Riesgo ${empresa.riesgo}`}</p>
        </div>
      </section>
      <div className={stCuestionario.cuestionario_info_container}>
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
            value={annio.toString()}
            onChange={(e) => guardarDatosBasicos('annio', Number(e))}
            optionsArray={establecerAnnios()}
            label='Vigencia'
            name='viegencia'
          />
        </div>

        <div style={{ display: 'flex', gap: '1em' }}>
          <Text
            label='Sede / Área'
            value={area}
            onChange={(texto) =>
              guardarDatosBasicos('area', texto.target.value)
            }
          />
          <Text
            label='Nombre del evaluador'
            value={evaluador}
            onChange={(texto) =>
              guardarDatosBasicos('evaluador', texto.target.value)
            }
          />
        </div>
      </div>
    </>
  );
};

export default DatosBasicos;
