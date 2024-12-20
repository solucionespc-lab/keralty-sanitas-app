import { useUserStore } from 'store/PrincipalStore';
import { Suspense, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Condicional from 'comunes/funcionales/Condicional';
import { useSuspenseQuery } from '@apollo/client';

import { QueryEmpresa } from './types/InformesTypes';
import { useEmpresa } from './store/StoreInformes';
import { useFiltrosStore } from './store/FiltrosInformeStore';
import InformePlanes from './secciones/InformePlanes';
import InformeEstandar from './secciones/InformeEstandar';
import InformeCiclo from './secciones/InformeCiclo';
import { SECCIONES } from './constantes/ConstGenerales';

import { GET_EMPRESA } from './peticiones/Queries';
import styles from './estilos/Generales.module.css';

const Informes = () => {
  const [seleccionado, setSeleccionado] = useState('Informe');
  const { usuario } = useUserStore();
  const { data } = useSuspenseQuery<QueryEmpresa>(GET_EMPRESA, {
    variables: {
      idEmpresa: usuario?.claims.idEmpresa ?? '',
    },
  });

  useEffect(() => {
    useEmpresa.setState({ empresa: data.getEmpresa });
    useFiltrosStore.setState({
      idEmpresa: data.getEmpresa.nit,
      annio: new Date().getFullYear(),
    });
  }, []);

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
