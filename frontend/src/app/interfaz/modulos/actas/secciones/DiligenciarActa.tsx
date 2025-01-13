import { toast } from 'sonner';
import Cargando from 'comunes/informativos/Cargando';
import FormModal from 'comunes/funcionales/forms/Form';
import TextArea from 'comunes/controles/TextArea';
import Text from 'comunes/controles/Text';
import Radio from 'comunes/controles/Radio';
import Numeric from 'comunes/controles/Numeric';
import Date from 'comunes/controles/Date';
import { Button } from 'comunes/controles/Buttons';
import { useMutation, useQuery } from '@apollo/client';

import { actualizarDatosActa } from '../store/ActasStore';

import { GET_ACTA } from '../peticiones/Queries';
import { GUARDAR_ACTA } from '../peticiones/Mutations';
import styles from '../estilos/RevisarActas.module.css';

import type { FormProveedorProps, QueryActa } from '../types/ActasTypes';

const DiligenciarActa = ({ cerrar, idActa, idEmpresa }: FormProveedorProps) => {
  const [updateActa] = useMutation(GUARDAR_ACTA);
  const { loading } = useQuery<QueryActa>(GET_ACTA, {
    variables: {
      idEmpresa: idEmpresa ?? '',
      idActa,
    },
    onCompleted: (data) => {
      actualizarDatosActa(data?.getActa);
    },
  });

  const actualizarActa = () => {
    updateActa({
      variables: {},
      onCompleted: () => {
        toast.info('Se registró con éxito el acta');
        cerrar();
      },
      onError: () => toast.error('Ocurrio un error al actualizar el acta'),
      refetchQueries: ['GetExcelencia'],
    });
  };

  if (loading)
    return <Cargando mensaje='Consultando información de la empresa' />;

  return (
    <FormModal
      tittle='Diligenciar acta de reunión'
      close={() => {
        cerrar();
      }}
      onSubmit={(e) => {
        e.preventDefault();
        actualizarActa();
      }}
      buttons={[
        <Button
          key='button-1'
          icon='new'
          name='Guardar registro'
          sizeBtn='normal'
          type='button'
          id='registrar'
          typeBtn='primary'
          permisos={['escribir']}
          permiso='escribir'
          onClick={() => console.log('guardar')}
        />,
      ]}
    >
      <main className={styles.contenedor_evaluaciones}>
        <section className={styles.info_poliza}>
          <Text label='Número de SDS' />
          <Text label='Póliza' />
          <Date label='Fecha de aprobación' />
        </section>

        <fieldset className={styles.fieldsets}>
          <legend>Datos del proveedor</legend>
          <Text label='NIT' />
          <Text label='Nombre de la empresa' />
          <Text label='Dirección' />
          <Text label='Teléfono' />
          <Text label='Correo electrónico' />
          <Radio
            label='Modalidad'
            name='modalidad'
            options={['Presencial', 'Virtual']}
            onChange={undefined}
          />
        </fieldset>

        <details className={styles.seccion_agrupada}>
          <summary>
            <p>Asistentes</p>
            <Button
              name={'Agregar'}
              type={'button'}
              sizeBtn={'small'}
              typeBtn={'pendings'}
              icon={'add'}
              permiso='registrar'
              permisos={['registrar']}
            />
          </summary>
          <div>
            <Text label='Nombre' />
            <Text label='Cargo' />
            <Text label='Teléfono' />
          </div>
          <div>
            <Text label='Nombre' />
            <Text label='Cargo' />
            <Text label='Teléfono' />
          </div>
        </details>

        <details className={styles.seccion_agrupada}>
          <summary>
            <p>Actividades</p>
            <Button
              name={'Agregar'}
              type={'button'}
              sizeBtn={'small'}
              typeBtn={'pendings'}
              icon={'add'}
              permiso='registrar'
              permisos={['registrar']}
            />
          </summary>
          <div>
            <Text label='Nombre de la actividad' />
            <Numeric label='Horas/unidades' />
            <Numeric label='Horas informe' />
          </div>
        </details>

        <details className={styles.seccion_agrupada}>
          <summary>
            <p>Compromisos</p>
            <Button
              name={'Agregar'}
              type={'button'}
              sizeBtn={'small'}
              typeBtn={'pendings'}
              icon={'add'}
              permiso='registrar'
              permisos={['registrar']}
            />
          </summary>
          <div>
            <Text label='Descripción' />
            <Text label='Responsable' />
            <Date label='Fecha del compromiso' />
          </div>
          <div>
            <Text label='Descripción' />
            <Text label='Responsable' />
            <Date label='Fecha del compromiso' />
          </div>
        </details>

        <section>
          <Radio
            label='¿Requirió desplazamiento de acuerdo con políticas?'
            name='desplazamiento'
            options={['Si', 'No']}
            onChange={undefined}
          />
          <TextArea label='En caso afirmativo, indique número de SDS asociada con el desplazamiento y describa recorridos y gastos generados' />
        </section>

        <fieldset className={styles.fieldsets}>
          <legend>Evaluación de la actividad</legend>
          <Radio
            label='Resultado de la evaluación'
            name='desplazamiento'
            options={[
              '2. Cumplió totalmente las expectativas',
              '1. Cumplió medianamente las expectativas',
              '0. No cumplió las expectativas',
            ]}
            onChange={undefined}
          />
          <TextArea label='Motivo del desplazamiento' />
        </fieldset>

        <fieldset className={styles.fieldsets}>
          <legend>Responsable de la empresa</legend>
          <Text label='Nombre' />
          <Text label='Cargo' />
          <Text label='Firma' />
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
