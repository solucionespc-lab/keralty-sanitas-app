import { useCallback } from 'react';
import useListados from 'hooks/Listados';
import Toast from 'comunes/informativos/Notificaciones';
import Cargando from 'comunes/informativos/Cargando';
import FormModal from 'comunes/funcionales/forms/Form';
import Condicional from 'comunes/funcionales/Condicional';
import { Button } from 'comunes/controles/Buttons';
import { useMutation, useQuery } from '@apollo/client';

import {
  actualizarAuditoria,
  resetAuditoria,
} from '../../store/AuditoriaStore';
import { GET_AUDITORIA } from '../../peticiones/Queries';
import { SAVE_AUDITORIA } from '../../peticiones/Mutations';
import { prepararDatos } from '../../funciones/Funciones';
import CuestionarioComp from './CuestionarioComp';
import ResultadoAuditorias from './componentes/ResAuditorias';

import styles from '../../estilos/EstAuditorias.module.css';

import type { GetAudQueryType } from '../../types/AutoevaluacionTypes';
import type { EditarFormProps } from '../../types/AutoevaluacionForms';

const EditarAuditoria = ({
  idAuditoria,
  idContratista,
  cerrar,
  permisos,
}: EditarFormProps) => {
  const { listas } = useListados();
  const { loading: QueryLoading } = useQuery<GetAudQueryType>(GET_AUDITORIA, {
    fetchPolicy: 'cache-and-network',
    variables: {
      idContratista,
      getAuditoriaId: idAuditoria,
    },
    onCompleted: (data) => {
      actualizarAuditoria(data.getAuditoria, listas);
    },
  });
  const [saveAuditoria, { loading }] = useMutation(SAVE_AUDITORIA);

  const guardarAuditoria = useCallback(() => {
    saveAuditoria({
      variables: { auditoria: prepararDatos() },

      onError: () =>
        Toast('Se generó un error al actualizar la auditoría', 'error'),
      onCompleted: () => {
        Toast('Se actualizó la auditoría correctamente', 'exitoso');
        resetAuditoria();
        cerrar();
      },
      refetchQueries: ['GetAuditorias'],
    });
  }, []);

  return (
    <FormModal
      tittle='Actualizar auditoría de seguridad'
      close={() => {
        resetAuditoria();
        cerrar();
      }}
      onSubmit={(e) => {
        e.preventDefault();
        guardarAuditoria();
      }}
      buttons={[
        <Button
          key='button-1'
          icon='new'
          name='Actualizar'
          sizeBtn='normal'
          type='submit'
          id='actualizar'
          typeBtn='primary'
          permisos={permisos}
          loading={loading}
        />,
      ]}
    >
      <Condicional condicion={QueryLoading}>
        <Cargando mensaje='Cargando auditoria del contratista' />
      </Condicional>

      <main className={styles.contenedor_auditorias}>
        <div className={styles.contenedor_volver}>
          <ResultadoAuditorias />
        </div>

        <CuestionarioComp permisos={permisos} />
      </main>
    </FormModal>
  );
};

export default EditarAuditoria;
