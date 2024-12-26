import { Suspense, useState } from 'react';
import { nanoid } from 'nanoid';
import Condicional from 'comunes/funcionales/Condicional';

import InformePlanes from './secciones/InformePlanes';
import InformeEstandar from './secciones/InformeEstandar';
import InformeCiclo from './secciones/InformeCiclo';
import { SECCIONES } from './constantes/ConstGenerales';

import styles from './estilos/Generales.module.css';

const Informes = () => {
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
