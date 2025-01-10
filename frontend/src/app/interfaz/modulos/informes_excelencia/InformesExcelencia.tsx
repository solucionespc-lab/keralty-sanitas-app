// import { useUserStore } from 'store/PrincipalStore';
import { useState } from 'react';
import { nanoid } from 'nanoid';
// import { useSuspenseQuery } from '@apollo/client';

import InformeExcelencia from './secciones/InformeExcelencia';
import { SECCIONES } from './constantes/ConstGenerales';

// import { GET_INFORME_AUTOEVALUACION } from './peticiones/Queries';
import styles from './estilos/Generales.module.css';

// import type { QueryInforme } from './types/InformesTypes';

const InformesExcelencia = () => {
  // const { usuario } = useUserStore();
  // const { data } = useSuspenseQuery<QueryInforme>(GET_INFORME_AUTOEVALUACION, {
  //   variables: {
  //     idEmpresa: usuario?.claims.idEmpresa ?? '',
  //     annio: 2024,
  //   },
  // });
  const [seleccionado, setSeleccionado] = useState('informe');

  return (
    <>
      <section className={styles.tableros_contenedor}>
        <h1 className='titulo_modulos'>Informes de resultados</h1>
        <section className={styles.temas_contenedor}>
          {SECCIONES.map((seccion) => (
            <label key={nanoid(6)} className={styles.tema}>
              <input
                value={seccion.id}
                checked={seccion.id === seleccionado}
                name='tema'
                type='radio'
                onChange={(e) => setSeleccionado(e.target.value)}
              />
              <span>{seccion.titulo}</span>
            </label>
          ))}
        </section>
      </section>

      <div className={styles.informe}>
        <InformeExcelencia />
      </div>
    </>
  );
};

export default InformesExcelencia;
