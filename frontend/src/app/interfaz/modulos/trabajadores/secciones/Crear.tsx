import usePermisos from 'hooks/Permisos';
import Toast from 'comunes/informativos/Notificaciones';
import FormModal from 'comunes/funcionales/forms/Form';
import { Button } from 'comunes/controles/Buttons';
// import correrInforme from 'appinterfaz/recursos/funciones/CorrerInforme';
import { useMutation } from '@apollo/client';

import { resetTrabajadores } from '../store/TrabStore';
import { agregarHistoria, resetOcupacional } from '../store/OcupacionalStore';
import { resetEmergencias } from '../store/EmergenciasStore';
import { prepararDatosTrab } from '../funciones/Funciones';
import Sociodemografico from './Sociodemografico';
import Ocupacional from './Ocupacional';
import CasoEmergencia from './CasoEmergencia';

import { SAVE_TRABAJADOR } from '../peticiones/Mutations';

const Crear = ({ cerrar }: { cerrar: () => void }) => {
  const { accesos } = usePermisos();
  const permisos = accesos.trabajadores;

  const [saveTrabajador, { loading }] = useMutation(SAVE_TRABAJADOR, {
    onCompleted: () => {
      // const fecha = new Date();
      Toast('Se ha registrado el trabajador', 'exitoso');
      resetOcupacional();
      resetTrabajadores();
      resetEmergencias();
      cerrar();

      // TODO: Se debe pasar los informes a un trigger de base de datos para generar a través de un workflow
      // correrInforme('state', {
      //   year: fecha.getFullYear(),
      //   gerencia: state.gerencia,
      // });
      // correrInforme('ocupacional', {
      //   year: fecha.getFullYear(),
      //   gerencia: state.gerencia,
      // });
    },
    onError: (error) => {
      Toast(
        `Ha ocurrido un error al registrar al trabajador, error: ${error}`,
        'error'
      );
    },
    refetchQueries: ['getTrabajadores'],
  });

  return (
    <div>
      <FormModal
        tittle='Registrar trabajador'
        close={() => {
          resetOcupacional();
          resetTrabajadores();
          resetEmergencias();
          cerrar();
        }}
        onSubmit={(e) => {
          e.preventDefault();
          saveTrabajador({
            variables: prepararDatosTrab(),
          });
        }}
        buttons={[
          <Button
            key='guardar'
            name='Registrar'
            type='submit'
            loading={loading}
            sizeBtn='small'
            typeBtn='primary'
            icon='new'
            id='botonRegistrarTrabajador'
            permisos={permisos}
          />,
          <Button
            key='agregar'
            name='Historia ocupacional'
            type='button'
            loading={loading}
            sizeBtn='small'
            typeBtn='secondary'
            icon='massive'
            permisos={permisos}
            permiso='crear'
            onClick={() => agregarHistoria()}
          />,
        ]}
      >
        <Sociodemografico />
        <Ocupacional />
        <CasoEmergencia />
      </FormModal>
    </div>
  );
};

export default Crear;
