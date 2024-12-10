import { useState } from 'react';
import { guardarFiltro } from 'modulos/autoevaluacion/store/FiltrosAutoStore';
import { INDICE_ALGOLIA } from 'modulos/autoevaluacion/constantes/ConstAutoevaluaciones';
import { Parrafo } from 'comunes/estilos/EstComunes';
import SearchComponent from 'comunes/controles/buscador/SearchComponent';

import styles from '../../estilos/EstFiltroAuditoria.module.css';

const FiltrosGenerales = () => {
  const [empresa, setContratista] = useState('');

  return (
    <main className={styles.contenedor_filtro}>
      <SearchComponent
        algoliaIndex={INDICE_ALGOLIA}
        title='Buscar contratistas'
        closeModal={() => {
          console.log('cerrar');
        }}
        returnAlgoliaValue={(data) => {
          setContratista(data.objectID);
          guardarFiltro('idEmpresa', data.objectID);
        }}
      />

      <Parrafo>{empresa}</Parrafo>
    </main>
  );
};

export default FiltrosGenerales;
