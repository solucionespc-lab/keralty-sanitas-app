import { toast } from 'sonner';
import { Suspense } from 'react';
import Cargando from 'comunes/informativos/Cargando';
import FormModal from 'comunes/funcionales/forms/Form';
import { Button } from 'comunes/controles/Buttons';
import { useMutation } from '@apollo/client';

import CuestionarioComp from './CuestionarioComp';
import ResultadoAuditorias from './componentes/ResExcelencia';
import { prepararEvaluacion } from '../store/StoreExcelencia';

import { SAVE_EVALUACION } from '../peticiones/Mutations';
import styles from '../estilos/EstAutoevaluaciones.module.css';

import type { CrearFormProps } from '../types/ExcelenciaTypes';

const CrearExcelencia = ({ cerrar }: CrearFormProps) => {
  const [saveEvaluacion] = useMutation(SAVE_EVALUACION);

  const guardarEvaluacion = () => {
    saveEvaluacion({
      variables: { cuestionario: prepararEvaluacion() },
      onError: () => toast.error('Ocurrio un error al guardar el diagnóstico'),
      onCompleted: () => {
        toast.info('Se registró con éxito el diagnóstico');
        cerrar();
      },
      refetchQueries: ['GetExcelencia'],
    });
  };

  return (
    <FormModal
      tittle='Registrar evaluacion de excelencia'
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
          permisos={['escribir']}
          permiso='escribir'
        />,
      ]}
    >
      <main className={styles.contenedor_evaluaciones}>
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

export default CrearExcelencia;
