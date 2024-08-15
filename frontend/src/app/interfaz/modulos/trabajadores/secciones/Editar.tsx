import { useEffect } from 'react';
import usePermisos from 'hooks/Permisos';
import Toast from 'comunes/informativos/Notificaciones';
import FormModal from 'comunes/funcionales/forms/Form';
import { Button } from 'comunes/controles/Buttons';
import { useMutation, useSuspenseQuery } from '@apollo/client';

import { QueryTrabType } from '../types/TrabajadoresTypes';
import { actualizarInfoSocio, resetTrabajadores } from '../store/TrabStore';
import {
  actualizarInfoOcup,
  agregarHistoria,
  resetOcupacional,
} from '../store/OcupacionalStore';
import { actualizarInfoEme, resetEmergencias } from '../store/EmergenciasStore';
import { organizarData, prepararDatosTrab } from '../funciones/Funciones';
import { datosOcupacionales } from '../constantes/ConstGenerales';
import Sociodemografico from './Sociodemografico';
import Ocupacional from './Ocupacional';
import CasoEmergencia from './CasoEmergencia';

import { GET_TRABAJADOR } from '../peticiones/Queries';
import { UPDATE_TRABAJADOR } from '../peticiones/Mutations';

const EditarTrabajador = ({
  cerrar,
  idTrabajador,
}: {
  cerrar: () => void;
  idTrabajador: string;
}) => {
  const { accesos } = usePermisos();
  const { data } = useSuspenseQuery<QueryTrabType>(GET_TRABAJADOR, {
    variables: { id: idTrabajador },
  });

  const [updateTrabajador, { loading }] = useMutation(UPDATE_TRABAJADOR, {
    onCompleted: () => {
      Toast('Se ha actualizado el trabajador', 'exitoso');
      resetOcupacional();
      resetTrabajadores();
      resetEmergencias();
      cerrar();
    },
    onError: (error) => {
      Toast(
        `Ha ocurrido un error al registrar al trabajador, error: ${error}`,
        'error'
      );
    },
    refetchQueries: ['getTrabajadores'],
  });

  useEffect(() => {
    if (data?.getTrabajador) {
      const datos = organizarData(data?.getTrabajador);
      datosOcupacionales.fechaIngresoEmp =
        datos?.sociodemografico?.fechaIngresoEmp;
      datosOcupacionales.genero = datos?.sociodemografico?.genero;

      actualizarInfoSocio(datos?.sociodemografico ?? {});
      actualizarInfoEme(datos?.emergencia ?? {});
      actualizarInfoOcup(datos?.historiaOcupacional ?? []);
    }
  }, []);

  return (
    <div>
      <FormModal
        tittle='Actualizar trabajador'
        close={() => {
          resetOcupacional();
          resetTrabajadores();
          resetEmergencias();
          cerrar();
        }}
        onSubmit={(e) => {
          e.preventDefault();
          updateTrabajador({
            variables: prepararDatosTrab('actualizar'),
          });
        }}
        buttons={[
          <Button
            key='button-1'
            name='Actualizar'
            type='submit'
            loading={loading}
            sizeBtn='small'
            typeBtn='primary'
            icon='new'
            permiso='editar'
            permisos={accesos.trabajadores}
          />,
          <Button
            key='button-2'
            name='Historia ocupacional'
            type='button'
            loading={loading}
            sizeBtn='small'
            typeBtn='secondary'
            icon='massive'
            permiso='editar'
            permisos={accesos.trabajadores}
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

export default EditarTrabajador;
