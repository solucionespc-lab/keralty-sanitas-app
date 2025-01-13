import { toast } from 'sonner';
import { Fragment } from 'react/jsx-runtime';
import Cargando from 'comunes/informativos/Cargando';
import FormModal from 'comunes/funcionales/forms/Form';
import Condicional from 'comunes/funcionales/Condicional';
import TextArea from 'comunes/controles/TextArea';
import Text from 'comunes/controles/Text';
import Radio from 'comunes/controles/Radio';
import Date from 'comunes/controles/Date';
import { Button } from 'comunes/controles/Buttons';
import { useMutation, useQuery } from '@apollo/client';

import {
  actualizarDatosActa,
  guardarDatosActa,
  useActasStore,
} from '../store/ActasStore';
import Textos from './componentes/Textos';

import { GET_ACTA } from '../peticiones/Queries';
import { GUARDAR_ACTA } from '../peticiones/Mutations';
import styles from '../estilos/RevisarActas.module.css';

import type { FormProveedorProps, QueryActa } from '../types/ActasTypes';

const DiligenciarActa = ({ cerrar, idActa, idEmpresa }: FormProveedorProps) => {
  const datos = useActasStore((state) => state);

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
          <Text
            label='Número de SDS'
            onChange={(e) => guardarDatosActa('numeroSds', e.target.value)}
          />
          <Text
            label='Póliza'
            onChange={(e) => guardarDatosActa('poliza', e.target.value)}
          />
          <Date
            label='Fecha de aprobación'
            onChange={(e) => guardarDatosActa('numeroSds', e.target.value)}
          />
        </section>

        <fieldset className={styles.fieldsets}>
          <legend>Datos del proveedor</legend>
          <Text
            label='NIT'
            onChange={(e) => guardarDatosActa('numeroSds', e.target.value)}
          />
          <Text
            label='Nombre de la empresa'
            onChange={(e) => guardarDatosActa('numeroSds', e.target.value)}
          />
          <Text
            label='Dirección'
            onChange={(e) => guardarDatosActa('numeroSds', e.target.value)}
          />
          <Text
            label='Teléfono'
            onChange={(e) => guardarDatosActa('numeroSds', e.target.value)}
          />
          <Text
            label='Correo electrónico'
            onChange={(e) => guardarDatosActa('numeroSds', e.target.value)}
          />
          <Radio
            label='Modalidad'
            name='modalidad'
            options={['Presencial', 'Virtual']}
            onChange={(e) => guardarDatosActa('numeroSds', e.target.value)}
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
          {datos.asistentes.map((asistente) => (
            <Fragment key={asistente.nombre}>
              <Textos
                value={asistente.nombre}
                label='Nombre'
                campo='responsableProveedor'
              />
              <Textos
                value={asistente.cargo}
                label='Cargo'
                campo='responsableProveedor'
              />
              <Textos
                value={asistente.telefono}
                label='Teléfono'
                campo='responsableProveedor'
              />
            </Fragment>
          ))}
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
          {datos.actividades.map((actvidad) => (
            <Fragment key={actvidad.nombre}>
              <div style={{ padding: 'var(--gaps-2)' }}>
                <h6>Nombre de la actividad</h6>
                <p>{actvidad.nombre}</p>
              </div>
              <section
                key={actvidad.nombre}
                className={styles.contendor_informacion}
              >
                <div style={{ padding: 'var(--gaps-2)' }}>
                  <h6>Horas/unidades</h6>
                  <p>{actvidad.horas}</p>
                </div>
                <div style={{ padding: 'var(--gaps-2)' }}>
                  <h6>Horas informe</h6>
                  <p>{actvidad.horasInforme}</p>
                </div>
                <div style={{ padding: 'var(--gaps-2)' }}>
                  <h6>Horas totales</h6>
                  <p>{actvidad.total}</p>
                </div>
              </section>
            </Fragment>
          ))}
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
          {datos.compromisos.map((compromiso) => (
            <Fragment key={compromiso.descripcion}>
              <Textos
                value={compromiso.responsable}
                label='Responsable'
                campo='responsableProveedor'
              />
              <Textos
                value={compromiso.descripcion}
                label='descripcion'
                campo='responsableProveedor'
              />
              <Textos
                value={compromiso.fecha}
                label='fecha de compromiso'
                campo='responsableProveedor'
              />
            </Fragment>
          ))}
        </details>

        <section>
          <Radio
            label='¿Requirió desplazamiento de acuerdo con políticas?'
            name='desplazamiento'
            options={['Si', 'No']}
            onChange={(e) => guardarDatosActa('numeroSds', e.target.value)}
          />
          <Condicional condicion={datos.desplazamiento}>
            <TextArea
              label='En caso afirmativo, indique número de SDS asociada con el desplazamiento y describa recorridos y gastos generados'
              onChange={(e) => guardarDatosActa('numeroSds', e.target.value)}
            />
          </Condicional>
        </section>

        <fieldset className={styles.fieldsets}>
          <legend>Responsable de la empresa</legend>
          <Textos label='Nombre' campo='responsableProveedor' />
          <Textos label='Cargo' campo='cargoProveedor' />
          <Textos label='Firma' campo='firmaPrveedor' />
        </fieldset>
      </main>
    </FormModal>
  );
};

export default DiligenciarActa;
