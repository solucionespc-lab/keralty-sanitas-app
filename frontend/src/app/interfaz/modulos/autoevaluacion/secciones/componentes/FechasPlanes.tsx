import { useShallow } from 'zustand/react/shallow';
import { usePlan, guardarPlan } from 'modulos/auditorias/store/AuditoriaStore';
import {
  establecerFechaMinEjecucion,
  deshabilitarFecha,
} from 'modulos/auditorias/funciones/Funciones';
import Date from 'comunes/controles/Date';

import styles from '../../../estilos/EstPlanesPreg.module.css';

const FechasPlanes = () => {
  const planes = usePlan(useShallow((state) => state.planes));

  return (
    <>
      <div className={styles.contenedor_fechas}>
        <Date
          label='Fecha de asignación'
          value={planes?.fechaAsignacion ?? ''}
          onChange={(e) => guardarPlan('fechaAsignacion', e.target.value)}
        />
        <Date
          label='Fecha de compromiso'
          min={planes?.fechaAsignacion ?? ''}
          value={planes?.fechaCompromiso ?? ''}
          onChange={(e) => guardarPlan('fechaCompromiso', e.target.value)}
        />
        <Date
          label='Fecha de ejecución'
          min={establecerFechaMinEjecucion({
            fechaPrimerPlazo: planes?.fechaPrimerPlazo,
            fechaSegundoPlazo: planes?.fechaSegundoPlazo,
            fechaTercerPlazo: planes?.fechaTercerPlazo,
            fechaCompromiso: planes?.fechaCompromiso,
          })}
          value={planes?.fechaEjecucion ?? ''}
          disabled={deshabilitarFecha(planes?.fechaCompromiso)}
          onChange={(e) => guardarPlan('fechaEjecucion', e.target.value)}
        />
      </div>

      <div className={styles.contenedor_aplazamientos}>
        <h4 className={styles.informativa_titulo}>Aplazamientos</h4>
        <div className={styles.contenedor_fechas_aplazamiento}>
          <Date
            min={planes?.fechaCompromiso ?? ''}
            label='Primer plazo'
            value={planes?.fechaPrimerPlazo ?? ''}
            disabled={deshabilitarFecha(planes?.fechaCompromiso)}
            onChange={(e) => guardarPlan('fechaPrimerPlazo', e.target.value)}
          />
          <Date
            label='Segundo plazo'
            min={planes?.fechaPrimerPlazo ?? ''}
            value={planes?.fechaSegundoPlazo ?? ''}
            disabled={deshabilitarFecha(planes?.fechaPrimerPlazo)}
            onChange={(e) => guardarPlan('fechaSegundoPlazo', e.target.value)}
          />
          <Date
            label='Tercer plazo'
            min={planes?.fechaSegundoPlazo ?? ''}
            value={planes?.fechaTercerPlazo ?? ''}
            disabled={deshabilitarFecha(planes?.fechaSegundoPlazo)}
            onChange={(e) => guardarPlan('fechaTercerPlazo', e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default FechasPlanes;
