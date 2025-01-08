import { toast } from 'sonner';
import { Suspense, useState } from 'react';
import usePermisos from 'hooks/Permisos';
import Cargando from 'comunes/informativos/Cargando';
import FormModal from 'comunes/funcionales/forms/Form';
import Condicional from 'comunes/funcionales/Condicional';
import { Button } from 'comunes/controles/Buttons';
import { useMutation } from '@apollo/client';

import { prepararEvaluacion } from '../store/AutoevaluacionStore';
import CuestionarioComp from './CuestionarioComp';
import ResultadoAuditorias from './componentes/ResAuditorias';

import { SAVE_EVALUACION } from '../peticiones/Mutations';
import styles from '../estilos/EstAutoevaluaciones.module.css';

import type { CrearFormProps } from '../types/AutoevaluacionForms';

const CrearAuditoria = ({ cerrar }: CrearFormProps) => {
  const { accesos } = usePermisos();
  const [saveEvaluacion, { loading }] = useMutation(SAVE_EVALUACION);
  const [estaIncompleto, setIncompleto] = useState(false);
  const guardarEvaluacion = () => {
    saveEvaluacion({
      variables: { evaluacion: prepararEvaluacion() },
      onError: () =>
        toast.error('Ocurrio un error al guardar la autoevaluación'),
      onCompleted: () => {
        toast.info('Se registró con éxito la autoevaluación');
        cerrar();
      },
      refetchQueries: ['GetEvaluaciones', 'GetEmpresa'],
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
          type='button'
          id='registrar'
          typeBtn='primary'
          permisos={accesos.autoevaluacion}
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
                Recuerde que el diligenciamiento de la autoevaluación del SG-SST
                no admite guardar de forma parcial. De clic en el botón
                “Guardar” únicamente cuando haya respondido todos los ítems que
                le aplican según el tamaño y la clase de riesgo de la empresa.
              </p>
              <p style={{ color: 'var(--color-primary-text)' }}>
                En caso de tener requisitos sin diligenciar se afectará la
                calificación, ¿está seguro de guardar la autoevaluación?
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

export default CrearAuditoria;
