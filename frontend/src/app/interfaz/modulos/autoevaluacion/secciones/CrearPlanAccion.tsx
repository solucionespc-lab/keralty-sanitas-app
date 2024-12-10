import Toggle from 'comunes/controles/Toggle';
import { SelectObject } from 'comunes/controles/select';
import useListados from 'hooks/Listados';
import { buscarCodigoDeLista } from 'utilidades/FuncionesApp';

import { deshabilitarFecha } from '../../funciones/Funciones';
import { guardarPlan, usePlan } from '../../store/AuditoriaStore';
import DescPlanAccion from './componentes/DescPlanAccion';
import FechasPlanes from './componentes/FechasPlanes';

import styles from '../../estilos/EstPlanesPreg.module.css';

const CrearPlanAccion = () => {
  const { responsables, listas } = useListados();
  const planes = usePlan((state) => state.planes);

  return (
    <section className={styles.contenedor_planes_preg}>
      <div className={styles.seccion_informativa}>
        <div className={styles.tag}>
          <small className={styles.tag_estado}>
            {buscarCodigoDeLista(
              listas,
              'estados',
              'codigo',
              planes?.estado ?? 'E01',
              'tipo'
            )}
          </small>
          <small className={styles.tag_descripcion}>
            {planes?.aprobacion ? 'Aprobado' : 'Sin aprobar'}
          </small>
        </div>
        <Toggle
          label='Aprobar plan'
          checked={planes?.aprobacion ?? false}
          disabled={deshabilitarFecha(planes?.fechaEjecucion)}
          onChange={(e) => guardarPlan('aprobacion', e.target.checked)}
        />
      </div>
      <SelectObject
        value={planes?.responsable ?? ''}
        label='Responsable del seguimiento'
        target='value'
        onChange={(e) => guardarPlan('responsable', e.nombre)}
        optionsArray={Object.values(responsables)}
        name='responsable'
      />
      <DescPlanAccion value={planes?.descripcion ?? ''} />
      <FechasPlanes />
    </section>
  );
};

export default CrearPlanAccion;
