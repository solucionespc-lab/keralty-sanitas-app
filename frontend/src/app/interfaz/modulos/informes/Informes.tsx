// import { useUserStore } from 'store/PrincipalStore';
import { Suspense, useState } from 'react';
import { nanoid } from 'nanoid';
import Condicional from 'comunes/funcionales/Condicional';
// import { useSuspenseQuery } from '@apollo/client';

import InformePlanes from './secciones/InformePlanes';
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
  const [seleccionado, setSeleccionado] = useState('Informe');

  return (
    <>
      <section className={styles.tableros_contenedor}>
        <h1 className='titulo_modulos'>Informes autoevaluación</h1>
        <section className={styles.temas_contenedor}>
          {SECCIONES.map((seccion) => (
            <label key={nanoid(6)} className={styles.tema}>
              <input
                value={seccion}
                checked={seccion === seleccionado}
                name='tema'
                type='radio'
                onChange={(e) => setSeleccionado(e.target.value)}
              />
              <span>{seccion}</span>
            </label>
          ))}
        </section>
      </section>

      <Condicional condicion={seleccionado === 'Informe'}>
        <div className={styles.informe}>
          <InformeCiclo />
          <InformeEstandar />
        </div>
      </Condicional>

      <Condicional condicion={seleccionado === 'Planes de acción'}>
        <Suspense fallback={<div>Cargando planes de acción</div>}>
          <InformePlanes />
        </Suspense>
      </Condicional>
    </>
  );
};

export default Informes;
