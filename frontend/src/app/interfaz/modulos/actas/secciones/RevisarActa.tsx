import { useUserStore } from 'store/PrincipalStore';
import { toast } from 'sonner';
import { Fragment } from 'react/jsx-runtime';
import Cargando from 'comunes/informativos/Cargando';
import FormModal from 'comunes/funcionales/forms/Form';
import Condicional from 'comunes/funcionales/Condicional';
import { Titulo } from 'comunes/estilos/EstComunes';
import Radio from 'comunes/controles/Radio';
import { Button } from 'comunes/controles/Buttons';
import { useMutation, useQuery } from '@apollo/client';

import {
  actualizarDatosActa,
  guardarDatosActa,
  useActasStore,
} from '../store/ActasStore';
import { CONVENCION_RESULTADOS } from '../constantes/ConstGenerales';
import Textos from './componentes/Textos';
import Observaciones from './componentes/Observaciones';
import { extraerValorResultado } from '../utilidades/Funciones';

import { GET_ACTA } from '../peticiones/Queries';
import { GUARDAR_ACTA } from '../peticiones/Mutations';
import styles from '../estilos/RevisarActas.module.css';

import type { CrearFormProps, QueryActa } from '../types/ActasTypes';

const RevisarActa = ({ cerrar, idActa }: CrearFormProps) => {
  const { usuario } = useUserStore();
  const datos = useActasStore((state) => state);

  const [updateActa] = useMutation(GUARDAR_ACTA);
  const { loading } = useQuery<QueryActa>(GET_ACTA, {
    variables: {
      idEmpresa: usuario?.claims.idEmpresa ?? '',
      idActa,
    },
    onCompleted: (data) => {
      actualizarDatosActa(data?.getActa);
    },
  });

  const actualizarActa = () => {
    updateActa({
      variables: {},
      onError: () => toast.error('Ocurrio un error al guardar el diagnóstico'),
      onCompleted: () => {
        toast.info('Se registró con éxito el diagnóstico');
        cerrar();
      },
      refetchQueries: ['GetActas'],
    });
  };

  if (loading)
    return <Cargando mensaje='Consultando información de la empresa' />;

  return (
    <FormModal
      tittle='Revisar acta de reunión'
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
        <fieldset className={styles.fieldsets}>
          <legend>Datos del cliente</legend>
          <section className={styles.contendor_informacion}>
            <div>
              <h6>Número de SDS</h6>
              <p>{datos.numeroSds}</p>
            </div>

            <div>
              <h6>Póliza</h6>
              <p>{datos.poliza}</p>
            </div>

            <div>
              <h6>Fecha de aprobación</h6>
              <p>{datos.fechaEjecucion}</p>
            </div>
          </section>
        </fieldset>

        <fieldset className={styles.fieldsets}>
          <legend>Datos del proveedor</legend>
          <section className={styles.contendor_informacion}>
            <div>
              <h6>NIT</h6>
              <p>{datos.nit}</p>
            </div>
            <div>
              <h6>Nombre de la empresa</h6>
              <p>{datos.nombreEmpresa}</p>
            </div>
            <div>
              <h6>Dirección</h6>
              <p>{datos.direccion}</p>
            </div>
            <div>
              <h6>Teléfono</h6>
              <p>{datos.telefono}</p>
            </div>
            <div>
              <h6>Correo electrónico</h6>
              <p>{datos.correo}</p>
            </div>
            <div>
              <h6>Modalidad</h6>
              <p>{datos.modalidad}</p>
            </div>
          </section>
        </fieldset>

        <details open className={styles.seccion_agrupada}>
          <summary>
            <Titulo>Asistentes</Titulo>
          </summary>
          {datos.asistentes.map((asistente) => (
            <section
              key={asistente.nombre}
              className={styles.contendor_informacion}
            >
              <div style={{ padding: 'var(--gaps-2)' }}>
                <h6>Nombre</h6>
                <p>{asistente.nombre}</p>
              </div>
              <div style={{ padding: 'var(--gaps-2)' }}>
                <h6>Cargo</h6>
                <p>{asistente.cargo}</p>
              </div>
              <div style={{ padding: 'var(--gaps-2)' }}>
                <h6>Teléfono</h6>
                <p>{asistente.telefono}</p>
              </div>
            </section>
          ))}
        </details>

        <details open className={styles.seccion_agrupada}>
          <summary>
            <Titulo>Actividades</Titulo>
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

        <details open className={styles.seccion_agrupada}>
          <summary>
            <Titulo>Compromisos</Titulo>
          </summary>
          {datos.compromisos.map((compromiso) => (
            <Fragment key={compromiso.descripcion}>
              <div style={{ padding: 'var(--gaps-2)' }}>
                <h6>Descripción</h6>
                <p>{compromiso.descripcion}</p>
              </div>
              <section
                key={compromiso.descripcion}
                className={styles.contendor_informacion}
              >
                <div style={{ padding: 'var(--gaps-2)' }}>
                  <h6>Responsable</h6>
                  <p>{compromiso.responsable}</p>
                </div>
                <div style={{ padding: 'var(--gaps-2)' }}>
                  <h6>Fecha de compromiso</h6>
                  <p>{compromiso.fecha}</p>
                </div>
              </section>
            </Fragment>
          ))}
        </details>

        <section>
          <div style={{ padding: 'var(--gaps-2)' }}>
            <h6>¿Requirió desplazamiento de acuerdo con políticas?</h6>
            <p>{datos.desplazamiento ? 'Si' : 'No'}</p>
          </div>
          <Condicional condicion={datos.desplazamiento}>
            <div style={{ padding: 'var(--gaps-2)' }}>
              <h6>
                En caso afirmativo, indique número de SDS asociada con el
                desplazamiento y describa recorridos y gastos generados
              </h6>
              <p>{datos.descDesplazamiento}</p>
            </div>
          </Condicional>
        </section>

        <fieldset className={styles.fieldsets}>
          <legend>Responsable del proveedor</legend>
          <section
            key={datos.responsableProveedor}
            className={styles.contendor_informacion}
          >
            <div style={{ padding: 'var(--gaps-2)' }}>
              <h6>Responsable</h6>
              <p>{datos.responsableProveedor}</p>
            </div>
            <div style={{ padding: 'var(--gaps-2)' }}>
              <h6>Cargo</h6>
              <p>{datos.cargoProveedor}</p>
            </div>
            <div style={{ padding: 'var(--gaps-2)' }}>
              <h6>Firma</h6>
              <p>{datos.firmaProveedor}</p>
            </div>
          </section>
        </fieldset>

        <fieldset className={styles.fieldsets}>
          <legend>Evaluación de la actividad</legend>
          <Radio
            label='Resultado de la evaluación'
            name='desplazamiento'
            value={
              CONVENCION_RESULTADOS[
                datos.resultado as keyof typeof CONVENCION_RESULTADOS
              ]
            }
            options={[
              '2. Cumplió totalmente las expectativas',
              '1. Cumplió medianamente las expectativas',
              '0. No cumplió las expectativas',
            ]}
            onChange={(e) =>
              guardarDatosActa(
                'resultado',
                extraerValorResultado(e.target.value)
              )
            }
          />
          <Condicional condicion={datos.resultado === 'no_cumple'}>
            <Observaciones
              label='Motivo del incumplimiento'
              campo='motivoIncumplimiento'
            />
          </Condicional>
        </fieldset>

        <fieldset className={styles.fieldsets}>
          <legend>Responsable de la empresa</legend>
          <Textos label='Nombre' campo='responsableCliente' />
          <Textos label='Cargo' campo='cargoCliente' />
          <Textos label='Firma' campo='firmaCliente' />
        </fieldset>
      </main>
    </FormModal>
  );
};

export default RevisarActa;
