import { toast } from 'sonner';
// import { useEffect } from 'react';
import usePermisos from 'hooks/Permisos';
import useListados from 'hooks/Listados';
import Cargando from 'comunes/informativos/Cargando';
import FormModal from 'comunes/funcionales/forms/Form';
import { Button } from 'comunes/controles/Buttons';
import { useMutation, useQuery } from '@apollo/client';

import {
  actualizarEvaluacion,
  prepararEvaluacionEditar,
} from '../store/AutoevaluacionStore';
import CuestionarioCompEditar from './CuestionarioCompEditar';
import ResultadoAuditorias from './componentes/ResAuditorias';

import { GET_EVALUACION } from '../peticiones/Queries';
import { UPDATE_EVALUACION } from '../peticiones/Mutations';
import styles from '../estilos/EstAutoevaluaciones.module.css';

import type { QueryEditar } from '../types/AutoevaluacionTypes';
import type { CrearFormProps } from '../types/AutoevaluacionForms';

const EditarAutoevaluacion = ({
  cerrar,
  idEmpresa,
  annioConsulta,
  idEvaluacion,
}: CrearFormProps) => {
  const { accesos } = usePermisos();
  const { listas } = useListados();
  const { loading: loadingQuery } = useQuery<QueryEditar>(GET_EVALUACION, {
    variables: {
      filtros: {
        annio: annioConsulta,
        idEmpresa,
        idEvaluacion,
      },
    },
    onCompleted: (data) => {
      actualizarEvaluacion(
        listas?.evaluaciones[2].contenido,
        data?.getEvaluacion
      );
    },
    onError: () =>
      toast.error('Ocurrio un error al consultar la autoevaluación'),
  });

  const [saveEvaluacion, { loading }] = useMutation(UPDATE_EVALUACION);
  const guardarEvaluacion = () => {
    saveEvaluacion({
      variables: { evaluacion: prepararEvaluacionEditar() },
      onError: () =>
        toast.error('Ocurrio un error al guardar la autoevaluación'),
      onCompleted: () => {
        toast.info('Se registró con éxito la autoevaluación');
        cerrar();
      },
      refetchQueries: ['GetEvaluaciones'],
    });
  };

  if (loadingQuery) return <Cargando mensaje='Consultando información' />;

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
          name='Actualizar'
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
      <main className={styles.contenedor_evaluaciones}>
        <div className={styles.contenedor_volver}>
          <ResultadoAuditorias />
        </div>
        <CuestionarioCompEditar />
      </main>
    </FormModal>
  );
};

export default EditarAutoevaluacion;
