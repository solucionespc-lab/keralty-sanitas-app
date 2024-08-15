import usePermisos from 'hooks/Permisos';
import Text from 'comunes/controles/Text';
import { SelectString } from 'comunes/controles/select';
import Radio from 'comunes/controles/Radio';
import Phone from 'comunes/controles/Phone';

import {
  guardarInfoEmergencia,
  useEmergenciaStore,
} from '../store/EmergenciasStore';

import styles from '../estilos/EstEmergencias.module.css';

const CasoEmergencia = () => {
  const { accesos } = usePermisos();
  const { nombreContacto, numContacto, grupoSanguineo, rh } =
    useEmergenciaStore(
      ({ nombreContacto, numContacto, grupoSanguineo, rh }) => ({
        nombreContacto,
        numContacto,
        grupoSanguineo,
        rh,
      })
    );
  const permisosCrear = !accesos.trabajadores.includes('crear');

  return (
    <fieldset className={styles.contenedor_emergencias}>
      <legend className={styles.legenda}>
        Información para casos de emergencias
      </legend>
      <Text
        disabled={permisosCrear}
        value={nombreContacto}
        label='Nombre del contacto'
        id='nombreContacto'
        required
        onChange={(e) => {
          guardarInfoEmergencia(e.target.value, e.target.id);
        }}
      />
      <Phone
        disabled={permisosCrear}
        value={numContacto}
        label='Número del contacto'
        id='numContacto'
        required
        onChange={(e) => {
          guardarInfoEmergencia(e.target.value, e.target.id);
        }}
      />
      <SelectString
        disabled={permisosCrear}
        value={grupoSanguineo}
        label='Grupo sanguineo'
        name='grupoSanguineo'
        required
        optionsArray={['A', 'O', 'AB', 'B']}
        onChange={(e) => {
          guardarInfoEmergencia(e, 'grupoSanguineo');
        }}
      />
      <Radio
        disabled={permisosCrear}
        value={rh}
        id='rh'
        label='RH'
        required
        onChange={(e) => guardarInfoEmergencia(e.target.value, 'rh')}
        options={['+', '-']}
      />
    </fieldset>
  );
};

export default CasoEmergencia;
