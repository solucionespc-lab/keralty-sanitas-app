import { toast } from 'sonner';
import { Suspense, useState } from 'react';
import Cargando from 'comunes/informativos/Cargando';
import FormModal from 'comunes/funcionales/forms/Form';
import Condicional from 'comunes/funcionales/Condicional';
import { Button } from 'comunes/controles/Buttons';
import { useMutation } from '@apollo/client';

import CuestionarioComp from './CuestionarioComp';
import ResultadoAuditorias from './componentes/ResExcelencia';
import { prepararEvaluacion } from '../store/StoreExcelencia';

import { SAVE_EVALUACION } from '../peticiones/Mutations';
import styles from '../estilos/EstAutoevaluaciones.module.css';

import type { CrearFormProps } from '../types/ExcelenciaTypes';

const CrearExcelencia = ({ cerrar }: CrearFormProps) => {
  const [saveEvaluacion, { loading }] = useMutation(SAVE_EVALUACION);
  const [estaIncompleto, setIncompleto] = useState(false);

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
          type='button'
          id='registrar'
          typeBtn='primary'
          permisos={['escribir']}
          permiso='escribir'
          onClick={() => setIncompleto(true)}
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

        <Condicional condicion={estaIncompleto}>
          <dialog className={styles.seccion_advertencia}>
            <section className={styles.seccion_informativa}>
              <p style={{ color: 'var(--color-primary-text)' }}>
                Recuerde que el diligenciamiento del diagnóstico de excelencia
                no admite guardar de forma parcial. De clic en el botón
                “Guardar” únicamente cuando haya respondido todos los ítems que
                le aplican.
              </p>
              <p style={{ color: 'var(--color-primary-text)' }}>
                En caso de tener requisitos sin diligenciar se afectará la
                calificación, ¿está seguro de guardar el diagnóstico de
                excelencia organizacional?
              </p>
              <div
                style={{ alignSelf: 'flex-end', marginTop: '1em' }}
                className={styles.contenedor_flex}
              >
                <button
                  type='button'
                  className={styles.boton_cancelar}
                  onClick={() => setIncompleto(false)}
                >
                  Cancelar
                </button>
                {loading ? (
                  <button
                    type='button'
                    className={styles.boton_cancelar}
                    disabled
                  >
                    Guardando...
                  </button>
                ) : (
                  <button type='submit' className={styles.boton_confirmar}>
                    Si, guardar
                  </button>
                )}
              </div>
            </section>
          </dialog>
        </Condicional>
      </main>
    </FormModal>
  );
};

export default CrearExcelencia;
