import { toast } from 'sonner';
import { Suspense } from 'react';
import usePermisos from 'hooks/Permisos';
import Cargando from 'comunes/informativos/Cargando';
import FormModal from 'comunes/funcionales/forms/Form';
import { Button } from 'comunes/controles/Buttons';
import { useMutation } from '@apollo/client';

import CuestionarioComp from './CuestionarioComp';
import ResultadoAuditorias from './componentes/ResAuditorias';
// import { prepararDatos } from '../funciones/Funciones';

import { SAVE_EVALUACION } from '../peticiones/Mutations';
import styles from '../estilos/EstAutoevaluaciones.module.css';

import type { CrearFormProps } from '../types/AutoevaluacionForms';

const CrearAuditoria = ({ cerrar }: CrearFormProps) => {
  const { accesos } = usePermisos();
  const [saveEvaluacion, { loading }] = useMutation(SAVE_EVALUACION);

  const guardarEvaluacion = () => {
    saveEvaluacion({
      variables: { evaluacion: {} },
      onError: () =>
        toast.error('Ocurrio un error al guardar la autoevaluación'),
      onCompleted: () => {
        toast.info('Se registró con éxito la autoevaluación');
        cerrar();
      },
      refetchQueries: ['GetEvaluaciones'],
    });
  };

  return (
    <FormModal
      tittle='Registrar autoevaluación'
      close={() => {
        cerrar();
      }}
      onSubmit={(e) => {
        e.preventDefault();
        guardarEvaluacion();
      }}
      buttons={[
        <Button
          key='button-1'
          icon='new'
          name='Guardar'
          sizeBtn='normal'
          type='submit'
          id='registrar'
          typeBtn='primary'
          permisos={accesos.autoevaluacion}
          permiso='escribir'
          loading={loading}
        />,
      ]}
    >
      <main className={styles.contenedor_auditorias}>
        <div className={styles.contenedor_volver}>
          <ResultadoAuditorias />
        </div>
        <Suspense
          fallback={
            <Cargando mensaje='Consultando información de la empresa' />
          }
        >
          <CuestionarioComp />
        </Suspense>
      </main>
    </FormModal>
  );
};

export default CrearAuditoria;