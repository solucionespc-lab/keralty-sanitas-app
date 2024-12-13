// @ts-nocheck
import { buscarCodigoDeLista } from 'utilidades/FuncionesApp';
import { useState } from 'react';
import useListados from 'hooks/Listados';
import ModalFiltro from 'comunes/funcionales/modalFiltros/ModalFiltro';
import { SelectObject } from 'comunes/controles/select';
import Radio from 'comunes/controles/Radio';
import Numeric from 'comunes/controles/Numeric';

import {
  aplicarFiltro,
  resetFiltros,
  useFiltrosStore,
} from '../store/FiltrosStore';

import styles from '../estilos/EstFiltros.module.css';

const FiltrosTrabajadores = ({ close }: { close: () => void }) => {
  const { listas } = useListados();
  const { ...filtros } = useFiltrosStore((state) => state);
  const [filtrosState, setFiltros] = useState(filtros);

  return (
    <ModalFiltro
      functions={{
        close,
        apply: () => {
          aplicarFiltro(filtrosState);
          close();
        },
        delete: () => {
          resetFiltros();
          close();
        },
      }}
      pageDates={0}
      nota='Recuerde que puede realizar uno o varios según lo requiera'
    >
      <main className={styles.contenedor_filtros}>
        <legend className={styles.legenda}>Trabajador</legend>
        <Numeric
          value={filtrosState.cedula}
          label='Cédula'
          id='cedula'
          onChange={(e) => {
            setFiltros({ ...filtrosState, cedula: Number(e.target.value) });
          }}
        />
        <Radio
          id='genero'
          style={{ width: '100%' }}
          label='Género'
          value={filtrosState.genero}
          onChange={(e) =>
            setFiltros({ ...filtrosState, genero: e.target.value })
          }
          options={['Masculino', 'Femenino']}
        />
        <SelectObject
          value={buscarCodigoDeLista(
            listas,
            'nivelEducativo',
            'id',
            filtrosState.nivelEducativo,
            'value'
          )}
          label='Nivel educativo'
          name='nivelEducativo'
          target='value'
          optionsArray={Object.values(listas.nivelEducativo)}
          onChange={(e) => {
            setFiltros({ ...filtrosState, nivelEducativo: e?.id ?? '' });
          }}
        />
        <SelectObject
          value={buscarCodigoDeLista(
            listas,
            'profesiones',
            'id',
            filtrosState.profesion,
            'value'
          )}
          label='Profesión'
          target='value'
          name='profesion'
          optionsArray={Object.values(listas.profesiones)}
          onChange={(e) => {
            setFiltros({ ...filtrosState, profesion: e.id ?? '' });
          }}
        />
      </main>

      <main className={styles.contenedor_filtros}>
        <legend className={styles.legenda}>Ocupacionales</legend>
        <SelectObject
          value={buscarCodigoDeLista(
            listas,
            'cargos',
            'id',
            filtrosState.cargoActual,
            'value'
          )}
          target='value'
          label='Cargo'
          name='cargo'
          optionsArray={Object.values(listas.cargos)}
          onChange={(e) => {
            setFiltros({ ...filtrosState, cargoActual: e?.id ?? '' });
          }}
        />
        <SelectObject
          value={buscarCodigoDeLista(
            listas,
            'gerencias',
            'id',
            filtrosState.gerencia,
            'value'
          )}
          target='value'
          label='Gerencia'
          name='gerencia'
          optionsArray={Object.values(listas.gerencias)}
          onChange={(e) => {
            setFiltros({ ...filtrosState, gerencia: e.id ?? '' });
          }}
        />
        <SelectObject
          value={buscarCodigoDeLista(
            listas,
            'procesos',
            'id',
            filtrosState.procesoActual,
            'value'
          )}
          target='value'
          label='Proceso'
          name='proceso'
          optionsArray={Object.values(listas.procesos)}
          onChange={(e) => {
            setFiltros({ ...filtrosState, procesoActual: e?.id ?? '' });
          }}
        />
        <SelectObject
          value={buscarCodigoDeLista(
            listas,
            'turnos',
            'id',
            filtrosState.turnoActual,
            'value'
          )}
          target='value'
          label='Turno'
          name='turno'
          optionsArray={Object.values(listas.turnos)}
          onChange={(e) => {
            setFiltros({ ...filtrosState, turnoActual: e?.id ?? '' });
          }}
        />
      </main>
    </ModalFiltro>
  );
};

export default FiltrosTrabajadores;
