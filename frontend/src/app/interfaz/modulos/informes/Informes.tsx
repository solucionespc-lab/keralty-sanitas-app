// import { useUserStore } from 'store/PrincipalStore';
import { Suspense, useState } from 'react';
import { nanoid } from 'nanoid';
import Condicional from 'comunes/funcionales/Condicional';
// import { useSuspenseQuery } from '@apollo/client';

import InformePlanes from './secciones/InformePlanes';
import InformeExcelencia from './secciones/InformeExcelencia';
import InformeEstandar from './secciones/InformeEstandar';
import InformeCiclo from './secciones/InformeCiclo';
import { SECCIONES } from './constantes/ConstGenerales';

// import { GET_INFORME_AUTOEVALUACION } from './peticiones/Queries';
import styles from './estilos/Generales.module.css';

// import type { QueryInforme } from './types/InformesTypes';

const Informes = () => {
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

      <Condicional condicion={seleccionado === 'informe'}>
        <div className={styles.informe}>
          <InformeCiclo />
          <InformeEstandar />
        </div>
      </Condicional>

      <Condicional condicion={seleccionado === 'planes'}>
        <Suspense fallback={<div>Cargando planes de acción</div>}>
          <InformePlanes />
        </Suspense>
      </Condicional>

      <Condicional condicion={seleccionado === 'excelencia'}>
        <div className={styles.informe}>
          <InformeExcelencia />
        </div>
      </Condicional>
    </>
  );
};

export default Informes;
