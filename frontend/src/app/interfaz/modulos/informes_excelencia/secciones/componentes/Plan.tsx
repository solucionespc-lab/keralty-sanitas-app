import { useShallow } from 'zustand/react/shallow';
import { useUserStore } from 'store/PrincipalStore';
import { toast } from 'sonner';
import { Fragment } from 'react/jsx-runtime';
import {
  guardarInfoPlan,
  usePlanesAccionEvaluaciones,
} from 'modulos/informes/store/StoreInformes';
import { GUARDAR_PLAN } from 'modulos/informes/peticiones/Mutations';
import { Titulo } from 'comunes/estilos/EstComunes';
import Date from 'comunes/controles/Date';
import { Button } from 'comunes/controles/Buttons';
import { useMutation } from '@apollo/client';

import Responsables from './Responsables';

import styles from '../../estilos/EstInformePlanes.module.css';

import type {
  MutationResponse,
  PlanesInputArgs,
} from 'modulos/informes/types/InformesTypes';

const Plan = () => {
  const { usuario } = useUserStore();
  const { planesAccion } = usePlanesAccionEvaluaciones(
    useShallow((state) => state)
  );

  const [guardarPlan, { loading }] = useMutation<
    MutationResponse,
    PlanesInputArgs
  >(GUARDAR_PLAN, {
    onCompleted: ({ savePlanesAccion }) => toast.info(savePlanesAccion),
    onError: ({ message }) => toast.error(message),
    refetchQueries: ['GetPlanesAccion'],
  });

  return (
    <>
      {planesAccion.map((plan, indice) => (
        <Fragment key={indice}>
          <section className={styles.contenedor_plan}>
            <Titulo style={{ textAlign: 'left' }}>
              Descripción del plan de acción
            </Titulo>
            <p style={{ textWrap: 'stable' }}>{plan.descripcion}</p>

            <section className={styles.contenedor_informacion}>
              <Date
                value={plan.fechaCompromiso}
                label='Fecha de compromiso'
                onChange={(fecha) =>
                  guardarInfoPlan('fechaCompromiso', fecha.target.value, indice)
                }
              />
              <Date
                value={plan.fechaEjecucion}
                label='Fecha de ejecución'
                onChange={(fecha) =>
                  guardarInfoPlan('fechaEjecucion', fecha.target.value, indice)
                }
              />
            </section>

            <Responsables
              value={plan.responsables}
              label='Responsable(s)'
              indice={indice}
            />

            <Button
              style={{ width: 'fit-content', alignSelf: 'flex-end' }}
              name='Guardar plan'
              type='button'
              sizeBtn='normal'
              typeBtn='primary'
              icon='new'
              permiso='registrar'
              permisos={['registrar']}
              loading={loading}
              onClick={() =>
                guardarPlan({
                  variables: {
                    planesAccionInput: {
                      ...plan,
                      idEmpresa: usuario?.claims.idEmpresa ?? '',
                    },
                  },
                })
              }
            />
          </section>
        </Fragment>
      ))}
    </>
  );
};

export default Plan;
