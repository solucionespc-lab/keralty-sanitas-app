import { useShallow } from 'zustand/react/shallow';
import { buscarCodigoDeLista } from 'utilidades/FuncionesApp';
import usePermisos from 'hooks/Permisos';
import useListados from 'hooks/Listados';
import Condicional from 'comunes/funcionales/Condicional';
import Toggle from 'comunes/controles/Toggle';
import Text from 'comunes/controles/Text';
import { SelectObject } from 'comunes/controles/select';
import Fecha from 'comunes/controles/Date';

import {
  guardarInfoSocio,
  useSociodemograficosStore,
} from '../store/TrabStore';
import {
  eliminarHistoria,
  guardar,
  useOcupacionalesStore,
} from '../store/OcupacionalStore';
import { iconografia } from '../recursos/Iconografia';
import { numeroOrdinal } from '../funciones/Funciones';
import TextDebounce from './componentes/TextDebounce';

import styles from '../estilos/EstOcupacional.module.css';
import { Icono } from '../estilos/EstGenerales';

const Ocupacional = () => {
  const { accesos } = usePermisos();
  const { listas } = useListados();
  const { historiaOcupacional } = useOcupacionalesStore((state) => state);
  const { esBrigadista, temaBrigada } = useSociodemograficosStore(
    useShallow(({ esBrigadista, temaBrigada }) => ({
      esBrigadista,
      temaBrigada,
    }))
  );

  const fechaActual = new Date()?.toISOString()?.slice(0, 10);
  const permisosCrear = !accesos.trabajadores.includes('crear');

  return (
    <fieldset className={styles.contenedor_ocupacional}>
      <legend className={styles.legenda}>Información ocupacional</legend>
      {historiaOcupacional.map((ocupacional, index) => {
        return (
          <div className={styles.seccion_historia} key={index}>
            <h3 className={styles.subtitulo_seccion}>
              {numeroOrdinal(index + 1, 'o', listas.enumerador)} cargo
              <Condicional
                condicion={!ocupacional.id && historiaOcupacional.length > 1}
              >
                <Icono onClick={() => eliminarHistoria(index)}>
                  {iconografia.eliminar.path}
                </Icono>
              </Condicional>
            </h3>

            <Fecha
              disabled={permisosCrear}
              value={ocupacional.fechaIngresoCargo}
              required
              label='Fecha de ingreso al cargo'
              id='fechaIngresoCargo'
              min={
                index === 0
                  ? ocupacional.fechaIngresoEmp
                  : historiaOcupacional[index - 1].fechaRetiroCargo
              }
              max={fechaActual}
              onChange={(e) => {
                guardar(e.target.value, e.target.id, index);
              }}
            />
            <Fecha
              value={ocupacional.fechaRetiroCargo}
              label='Fecha de retiro del cargo'
              id='fechaRetiroCargo'
              disabled={
                (ocupacional?.fechaRetiroEmp !== '9999-12-31' &&
                  historiaOcupacional.length === index + 1) ||
                permisosCrear
              }
              required={historiaOcupacional.length > index + 1}
              min={ocupacional?.fechaIngresoCargo ?? ''}
              max={fechaActual}
              onChange={(e) => {
                guardar(e.target.value, e.target.id, index);
              }}
            />
            <SelectObject
              value={buscarCodigoDeLista(
                listas,
                'cargos',
                'id',
                ocupacional.cargo,
                'value'
              )}
              disabled={permisosCrear}
              target='value'
              label='Cargo'
              name={`cargo_${index}`}
              required
              optionsArray={Object.values(listas?.cargos)}
              onChange={(e) => {
                guardar(e?.id ?? '', 'cargo', index);
                if (historiaOcupacional.length - 1 === index) {
                  guardarInfoSocio(e?.id ?? '', 'cargoActual');
                }
              }}
            />
            <SelectObject
              value={buscarCodigoDeLista(
                listas,
                'gerencias',
                'id',
                ocupacional.gerencia,
                'value'
              )}
              disabled={permisosCrear}
              target='value'
              label='Gerencia'
              name={`gerencia_${index}`}
              required
              optionsArray={Object.values(listas?.gerencias)}
              onChange={(e) => {
                guardar(e?.id ?? '', 'gerencia', index);
                if (historiaOcupacional.length - 1 === index) {
                  guardarInfoSocio(e?.id ?? '', 'gerencia');
                }
              }}
            />
            <SelectObject
              value={buscarCodigoDeLista(
                listas,
                'procesos',
                'id',
                ocupacional.proceso,
                'value'
              )}
              disabled={permisosCrear}
              label='Proceso'
              name={`proceso_${index}`}
              target='value'
              required
              optionsArray={Object.values(listas?.procesos)}
              onChange={(e) => {
                guardar(e?.id ?? '', 'proceso', index);
                if (historiaOcupacional.length - 1 === index) {
                  guardarInfoSocio(e?.id ?? '', 'procesoActual');
                }
              }}
            />
            <SelectObject
              value={buscarCodigoDeLista(
                listas,
                'turnos',
                'id',
                ocupacional.turno,
                'value'
              )}
              disabled={permisosCrear}
              target='value'
              label='Turno'
              name={`turno_${index}`}
              optionsArray={Object.values(listas?.turnos)}
              onChange={(e) => {
                guardar(e?.id ?? '', 'turno', index);
                if (historiaOcupacional.length - 1 === index) {
                  guardarInfoSocio(e?.id ?? '', 'turnoActual');
                }
              }}
            />

            <TextDebounce
              label='Jefe inmediato'
              value={ocupacional.jefeInmediato}
              id='jefeInmediato'
              index={index}
              disabled={permisosCrear}
            />
            <TextDebounce
              label='Correo electrónico'
              value={ocupacional.correo}
              id='correo'
              index={index}
              disabled={permisosCrear}
            />
            <SelectObject
              value={buscarCodigoDeLista(
                listas,
                'contratos',
                'id',
                ocupacional.tipoContrato,
                'value'
              )}
              disabled={permisosCrear}
              target='value'
              label='Tipo de contrato'
              name={`tipoContrato_${index}`}
              required
              optionsArray={Object.values(listas?.contratos)}
              onChange={(e) => {
                guardar(e?.id ?? '', 'tipoContrato', index);
              }}
            />
            <Toggle
              label='¿El trabajador es brigadista?'
              checked={esBrigadista}
              onChange={(check) =>
                guardarInfoSocio(check.target.checked, 'esBrigadista')
              }
            />
            <Text
              label='Tema de brigada'
              value={temaBrigada}
              onChange={(e) => guardarInfoSocio(e.target.value, 'temaBrigada')}
            />
          </div>
        );
      })}
    </fieldset>
  );
};

export default Ocupacional;
