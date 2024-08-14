import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { nanoid } from 'nanoid';
import { signOut } from 'firebase/auth';
import { auth } from 'configuraciones/Firebase';
import Modal from 'comunes/funcionales/Modal';
import Condicional from 'comunes/funcionales/Condicional';
import { TYPE_OF_DEVICE } from 'app/store/constantes/ContextoConst';

import { useBLStore } from '../store/BLStore';
import { iconografia } from '../recursos/Iconografia';
import {
  configuraciones,
  otrasConfiguraciones,
} from '../constantes/ConstGenerales';

import {
  ConfigContainer,
  ConfigIcon,
  ContainerMovileModalOptions,
  IconSection,
  IconSectionModulos,
  OptionName,
} from '../estilos/EstConfig';

const AppConfig = () => {
  const navigation = useNavigate();
  const { verModulo, abrirModulos, abrirOtrosModulos, verOtrosModulos } =
    useBLStore((state) => state);
  const isDevice = TYPE_OF_DEVICE.test(navigator.userAgent);

  const desconectarse = useCallback(() => {
    signOut(auth);
    window.location.reload();
  }, []);

  const filtrarDesplegarConfig = Object.values(configuraciones).filter(
    ({ desplegar }) => desplegar
  );
  const filtrarDesplegarOtrasConfig = Object.values(
    otrasConfiguraciones
  ).filter(({ desplegar }) => desplegar);

  return (
    <ConfigContainer>
      <IconSectionModulos onClick={() => abrirModulos(!verModulo)}>
        <ConfigIcon>{iconografia.open_config.path}</ConfigIcon>
      </IconSectionModulos>

      {Object.values(filtrarDesplegarConfig)?.map((tipoConfig) => (
        <IconSection
          key={nanoid(8)}
          to={tipoConfig.url}
          title={tipoConfig.nombre}
          onClick={() => {
            if (tipoConfig.nombre === 'Notificaciones') {
              navigation(tipoConfig.url);
            }
          }}
        >
          <ConfigIcon>
            {iconografia[tipoConfig.icono as keyof typeof iconografia].path}
          </ConfigIcon>
        </IconSection>
      ))}

      <Condicional condicion={isDevice}>
        <IconSection to='/' onClick={() => abrirOtrosModulos(!verOtrosModulos)}>
          <ConfigIcon>{iconografia.more.path}</ConfigIcon>

          <Condicional condicion={verOtrosModulos}>
            <Modal onClick={() => abrirOtrosModulos(!verOtrosModulos)}>
              <ContainerMovileModalOptions>
                {Object.values(filtrarDesplegarOtrasConfig)?.map(
                  (tipoConfig, idT) => (
                    <div key={idT}>
                      {tipoConfig.mostrarUrl ? (
                        <IconSection
                          key={nanoid(8)}
                          to={tipoConfig.url}
                          title={tipoConfig.nombre}
                          onClick={() => {
                            if (tipoConfig.nombre === 'Salir de sesión') {
                              desconectarse();
                            }
                          }}
                        >
                          <ConfigIcon>
                            {
                              iconografia[
                                tipoConfig.icono as keyof typeof iconografia
                              ].path
                            }
                          </ConfigIcon>
                          <OptionName>{tipoConfig.nombre}</OptionName>
                        </IconSection>
                      ) : (
                        <IconSection
                          key={nanoid(8)}
                          title={tipoConfig.nombre}
                          onClick={() => {
                            if (tipoConfig.nombre === 'Salir de sesión') {
                              desconectarse();
                            }
                          }}
                        >
                          <ConfigIcon>
                            {
                              iconografia[
                                tipoConfig.icono as keyof typeof iconografia
                              ].path
                            }
                          </ConfigIcon>
                          <OptionName>{tipoConfig.nombre}</OptionName>
                        </IconSection>
                      )}
                    </div>
                  )
                )}
              </ContainerMovileModalOptions>
            </Modal>
          </Condicional>
        </IconSection>
      </Condicional>

      <Condicional condicion={!isDevice}>
        {Object.values(filtrarDesplegarOtrasConfig).map((tipoConfig, idC) => (
          <div key={idC}>
            {tipoConfig.mostrarUrl ? (
              <IconSection
                key={nanoid(8)}
                to={tipoConfig.url}
                title={tipoConfig.nombre}
                onClick={() => {
                  if (tipoConfig.nombre === 'Salir de sesión') {
                    desconectarse();
                  }
                }}
              >
                <ConfigIcon>
                  {
                    iconografia[tipoConfig.icono as keyof typeof iconografia]
                      .path
                  }
                </ConfigIcon>
              </IconSection>
            ) : (
              <IconSection
                key={nanoid(8)}
                title={tipoConfig.nombre}
                onClick={() => {
                  if (tipoConfig.nombre === 'Salir de sesión') {
                    desconectarse();
                  }
                }}
              >
                <ConfigIcon>
                  {
                    iconografia[tipoConfig.icono as keyof typeof iconografia]
                      .path
                  }
                </ConfigIcon>
              </IconSection>
            )}
          </div>
        ))}
      </Condicional>
    </ConfigContainer>
  );
};

export default AppConfig;
