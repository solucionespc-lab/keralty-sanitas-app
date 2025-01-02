import { Avisos, Parrafo } from 'comunes/estilos/EstComunes';

import styles from '../../estilos/EstFiltroAuditoria.module.css';

const FiltrosFechas = () => {
  // const { fechaFinAplicado, fechaInicioAplicado } = useFiltrosStore(
  //   ({ fechaInicioAplicado, fechaFinAplicado }) => ({
  //     fechaInicioAplicado,
  //     fechaFinAplicado,
  //   })
  // );

  return (
    <main className={styles.contenedor_filtro}>
      <Avisos>Nota: Filtrar un rango de fecha a la vez</Avisos>
      <Parrafo>Fecha</Parrafo>
      {/* <Date
          label='Desde:'
          value={fechaInicioAplicado}
          onChange={(e) => {
            guardarFiltro('fechaInicioAplicado', e.target.value ?? '');
          }}
        />
        <Date
            label='Hasta:
          min={fechaInicioAplicado}
          value={fechaFinAplicado}
          onChange={(e) =>
            guardarFiltro('fechaFinAplicado', e.target.value ?? '')
          }
        /> */}
    </main>
  );
};

export default FiltrosFechas;
