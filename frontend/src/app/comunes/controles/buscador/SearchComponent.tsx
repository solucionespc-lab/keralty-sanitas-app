import { useEffect, useState } from 'react';
import useAlgolia from 'hooks/Algolia';
import { useDebounce } from '@uidotdev/usehooks';

import Results from './Results';
import { CloseModalIcon, EraserIcon } from './recursos/Iconografia';

import styles from './estilos/StylesSearch.module.css';

import type { SearchProps } from './types/SearchTypes';

const SearchComponent = ({
  algoliaIndex,
  title,
  returnAlgoliaValue,
  closeModal,
}: SearchProps) => {
  const { loading, datos, consulta } = useAlgolia({
    indexName: algoliaIndex,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 350);

  useEffect(() => {
    if (searchTerm !== '') {
      consulta(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <main className={styles.search_container}>
      <div className={styles.header_container}>
        <h1 className={styles.search_title}>{title}</h1>
        <CloseModalIcon onClick={closeModal} />
      </div>
      <section className={styles.search_input_container}>
        <input
          value={searchTerm}
          placeholder='Escriba una palabra clave'
          className={styles.search_input}
          type='text'
          onChange={(text) => setSearchTerm(text.target.value)}
        />
        <EraserIcon onClick={() => setSearchTerm('')} />
      </section>
      <Results
        data={datos}
        searchWord={searchTerm}
        loading={loading}
        callback={returnAlgoliaValue}
      />
    </main>
  );
};

export default SearchComponent;
