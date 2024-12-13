// @ts-nocheck
import { useShallow } from 'zustand/react/shallow';
import { calcularEdad } from 'utilidades/FuncionesGenerales';
import { buscarCodigoDeLista } from 'utilidades/FuncionesApp';
import usePermisos from 'hooks/Permisos';
import useListados from 'hooks/Listados';
import Toggle from 'comunes/controles/Toggle';
import Text from 'comunes/controles/Text';
import { SelectObject } from 'comunes/controles/select';
import Radio from 'comunes/controles/Radio';
import Numeric from 'comunes/controles/Numeric';
import Fecha from 'comunes/controles/Date';

import {
  guardarInfoSocio,
  useSociodemograficosStore,
} from '../store/TrabStore';
import { cambiarDatoEnArray } from '../store/OcupacionalStore';
import { datosOcupacionales } from '../constantes/ConstGenerales';

import styles from '../estilos/EstSociodemografico.module.css';

const Sociodemografico = () => {
  const { accesos } = usePermisos();
  const { listas } = useListados();
  const {
    cedula,
    nombre,
    fechaNacimiento,
    genero,
    estadoCivil,
    numHijos,
    nivelEducativo,
    profesion,
    fechaIngresoEmp,
    fechaRetiroEmp,
    activo,
  } = useSociodemograficosStore(
    useShallow(
      ({
        cedula,
        nombre,
        fechaNacimiento,
        genero,
        estadoCivil,
        numHijos,
        nivelEducativo,
        profesion,
        fechaIngresoEmp,
        fechaRetiroEmp,
        activo,
      }) => ({
        cedula,
        nombre,
        fechaNacimiento,
        genero,
        estadoCivil,
        numHijos,
        nivelEducativo,
        profesion,
        fechaIngresoEmp,
        fechaRetiroEmp,
        activo,
      })
    )
  );

  const hoySinAno = new Date()?.toISOString()?.slice(4, 10);
  const anoActual = new Date()?.toISOString()?.slice(0, 4);
  const fechaActual = new Date()?.toISOString()?.slice(0, 10);
  const permisosCrear = !accesos.trabajadores.includes('crear');

  return (
    <fieldset className={styles.contenedor_sociodemografico}>
      <legend className={styles.legenda}>Información del trabajador</legend>
      <Numeric
        disabled={permisosCrear}
        value={cedula}
        label='Documento de identidad'
        required
        id='cedula'
        onChange={(e) => {
          guardarInfoSocio(Number(e.target.value), e.target.id);
        }}
      />
      <Text
        disabled={permisosCrear}
        value={nombre}
        label='Nombre completo'
        name='nombre'
        required
        onChange={(e) => {
          guardarInfoSocio(e.target.value, 'nombre');
        }}
      />

      <div className={styles.fecha_interpretacion}>
        <Fecha
          disabled={permisosCrear}
          value={fechaNacimiento}
          label='Fecha de nacimiento'
          name='fechaNacimiento'
          max={`${Number(anoActual) - 16}${hoySinAno}`}
          required
          onChange={(e) => {
            guardarInfoSocio(e.target.value, 'fechaNacimiento');
          }}
        />
        <small>Edad de {calcularEdad(fechaNacimiento)} año(s)</small>
      </div>

      <Radio
        id='genero'
        label='Género'
        required
        disabled={permisosCrear}
        value={genero}
        onChange={(e) => {
          guardarInfoSocio(e.target.value, 'genero');
          cambiarDatoEnArray(e.target.value, 'genero');
          datosOcupacionales.genero = e.target.value;
        }}
        options={['Masculino', 'Femenino']}
      />
      <SelectObject
        value={buscarCodigoDeLista(
          listas,
          'estadoCivil',
          'id',
          estadoCivil,
          'value'
        )}
        disabled={permisosCrear}
        target='value'
        label='Estado civil'
        name='estadoCivil'
        required
        optionsArray={Object.values(listas?.estadoCivil)}
        onChange={(e) => {
          guardarInfoSocio(e?.id ?? '', 'estadoCivil');
        }}
      />
      <Numeric
        value={numHijos}
        label='Número de hijos'
        required
        disabled={permisosCrear}
        id='numHijos'
        onChange={(e) => {
          guardarInfoSocio(Number(e.target.value), e.target.id);
        }}
      />
      <SelectObject
        value={buscarCodigoDeLista(
          listas,
          'nivelEducativo',
          'id',
          nivelEducativo,
          'value'
        )}
        disabled={permisosCrear}
        target='value'
        label='Nivel educativo'
        name='nivelEducativo'
        required
        optionsArray={Object.values(listas?.nivelEducativo)}
        onChange={(e) => {
          guardarInfoSocio(e?.id ?? '', 'nivelEducativo');
        }}
      />
      <SelectObject
        value={buscarCodigoDeLista(
          listas,
          'profesiones',
          'id',
          profesion,
          'value'
        )}
        disabled={permisosCrear}
        label='Profesión'
        name='profesion'
        required
        target='value'
        optionsArray={Object.values(listas?.profesiones)}
        onChange={(e) => {
          guardarInfoSocio(e.id ?? '', 'profesion');
        }}
      />
      <div className={styles.fecha_interpretacion}>
        <Fecha
          disabled={permisosCrear}
          value={fechaIngresoEmp}
          label='Fecha de ingreso a la empresa'
          name='fechaIngresoEmp'
          max={fechaActual}
          required
          onChange={(e) => {
            guardarInfoSocio(e.target.value, 'fechaIngresoEmp');
            cambiarDatoEnArray(e.target.value, 'fechaIngresoEmp');
            datosOcupacionales.fechaIngresoEmp = e.target.value;
          }}
        />
        <small>Antigüedad de {calcularEdad(fechaIngresoEmp)} año(s)</small>
      </div>

      <Fecha
        value={fechaRetiroEmp === '9999-12-31' ? '' : fechaRetiroEmp}
        disabled={permisosCrear}
        label='Fecha de retiro de la empresa'
        name='fechaRetiroEmp'
        onChange={(e) => {
          guardarInfoSocio(e.target.value, 'fechaRetiroEmp');
          cambiarDatoEnArray(
            e.target.value ? e.target.value : '9999-12-31',
            'fechaRetiroEmp'
          );
          datosOcupacionales.fechaRetiroEmp = e.target.value;
        }}
      />
      <Toggle
        label='¿El trabajador está activo?'
        checked={activo}
        onChange={(check) => guardarInfoSocio(check.target.checked, 'activo')}
      />
    </fieldset>
  );
};

export default Sociodemografico;
