import { useUserStore } from 'store/PrincipalStore';
import { toast } from 'sonner';
import Cargando from 'comunes/informativos/Cargando';
import FormModal from 'comunes/funcionales/forms/Form';
import { Titulo } from 'comunes/estilos/EstComunes';
import TextArea from 'comunes/controles/TextArea';
import Text from 'comunes/controles/Text';
import Radio from 'comunes/controles/Radio';
import Numeric from 'comunes/controles/Numeric';
import Date from 'comunes/controles/Date';
import { Button } from 'comunes/controles/Buttons';
import { useMutation, useQuery } from '@apollo/client';

import { GET_ACTAS } from '../peticiones/Queries';
import { GUARDAR_ACTA } from '../peticiones/Mutations';
import styles from '../estilos/RevisarActas.module.css';

import type { CrearFormProps, QueryActa } from '../types/ActasTypes';

const DiligenciarActa = ({ cerrar, idActa }: CrearFormProps) => {
  const { usuario } = useUserStore();
  const [saveEvaluacion] = useMutation(GUARDAR_ACTA);
  const { data, loading } = useQuery<QueryActa>(GET_ACTAS, {
    variables: {
      idEmpresa: usuario?.claims.idEmpresa ?? '',
      idActa,
    },
  });

  const guardarEvaluacion = () => {
    saveEvaluacion({
      variables: {},
      onError: () => toast.error('Ocurrio un error al guardar el diagnóstico'),
      onCompleted: () => {
        toast.info('Se registró con éxito el diagnóstico');
        cerrar();
      },
      refetchQueries: ['GetExcelencia'],
    });
  };

  if (loading)
    return <Cargando mensaje='Consultando información de la empresa' />;

  console.log(data?.getActa);

  return (
    <FormModal
      tittle='Diligenciar acta de reunión'
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
          name='Aprobar acta'
          sizeBtn='normal'
          type='button'
          id='registrar'
          typeBtn='primary'
          permisos={['escribir']}
          permiso='escribir'
          onClick={() => console.log('guardar')}
        />,
        <Button
          key='button-2'
          icon='removeFilter'
          name='Rechazar acta'
          sizeBtn='normal'
          type='button'
          id='registrar'
          typeBtn='pdf'
          permisos={['escribir']}
          permiso='escribir'
          onClick={() => console.log('guardar')}
        />,
      ]}
    >
      <main className={styles.contenedor_evaluaciones}>
        <section className={styles.info_poliza}>
          <Text disabled label='Número de SDS' />
          <Text disabled label='Póliza' />
          <Date disabled label='Fecha de aprobación' />
        </section>

        <fieldset className={styles.fieldsets}>
          <legend>Datos del proveedor</legend>
          <Text disabled label='NIT' />
          <Text disabled label='Nombre de la empresa' />
          <Text disabled label='Dirección' />
          <Text disabled label='Teléfono' />
          <Text disabled label='Correo electrónico' />
          <Radio
            disabled
            label='Modalidad'
            name='modalidad'
            options={['Presencial', 'Virtual']}
            onChange={undefined}
          />
        </fieldset>

        <details open className={styles.seccion_agrupada}>
          <summary>
            <Titulo>Asistentes</Titulo>
          </summary>
          <div>
            <Text disabled label='Nombre' />
            <Text disabled label='Cargo' />
            <Text disabled label='Teléfono' />
          </div>
          <div>
            <Text disabled label='Nombre' />
            <Text disabled label='Cargo' />
            <Text disabled label='Teléfono' />
          </div>
        </details>

        <details open className={styles.seccion_agrupada}>
          <summary>
            <Titulo>Actividades</Titulo>
          </summary>
          <div>
            <Text disabled label='Nombre de la actividad' />
            <Numeric disabled label='Horas/unidades' />
            <Numeric disabled label='Horas informe' />
          </div>
        </details>

        <details open className={styles.seccion_agrupada}>
          <summary>
            <Titulo>Compromisos</Titulo>
          </summary>
          <div>
            <Text disabled label='Descripción' />
            <Text disabled label='Responsable' />
            <Date disabled label='Fecha del compromiso' />
          </div>
          <div>
            <Text disabled label='Descripción' />
            <Text disabled label='Responsable' />
            <Date disabled label='Fecha del compromiso' />
          </div>
        </details>

        <section>
          <Radio
            label='¿Requirió desplazamiento de acuerdo con políticas?'
            name='desplazamiento'
            options={['Si', 'No']}
            onChange={undefined}
          />
          <TextArea
            disabled
            label='En caso afirmativo, indique número de SDS asociada con el desplazamiento y describa recorridos y gastos generados'
          />
        </section>

        <fieldset className={styles.fieldsets}>
          <legend>Evaluación de la actividad</legend>
          <Radio
            disabled
            label='Resultado de la evaluación'
            name='desplazamiento'
            options={[
              '2. Cumplió totalmente las expectativas',
              '1. Cumplió medianamente las expectativas',
              '0. No cumplió las expectativas',
            ]}
            onChange={undefined}
          />
          <TextArea disabled label='Motivo del desplazamiento' />
        </fieldset>

        <fieldset className={styles.fieldsets}>
          <legend>Responsable de la empresa</legend>
          <Text disabled label='Nombre' />
          <Text disabled label='Cargo' />
          <Text disabled label='Firma' />
        </fieldset>

        <fieldset className={styles.fieldsets}>
          <legend>Responsable de la ARL</legend>
          <Text label='Nombre' />
          <Text label='Cargo' />
          <Text label='Firma' />
        </fieldset>
      </main>
    </FormModal>
  );
};

export default DiligenciarActa;
