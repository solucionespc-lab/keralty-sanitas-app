import { nanoid } from 'nanoid';
import usePermisos from 'hooks/Permisos';
import { Etiqueta } from 'comunes/estilos/EstComunes';
import { useUserStore } from 'app/store/PrincipalStore';

import Mensajeria from './secciones/Mensajeria';
import CargarFoto from './secciones/CargarFoto';

import {
  ContInfo,
  ContModPermisos,
  ContPerfil,
  ContPermisos,
  ContPrincipal,
  ContTituloMod,
} from './estilos/EstPerfil';

const PerfilUsuario = () => {
  const { usuario, iam } = useUserStore((state) => state);
  const { accesos } = usePermisos();

  const modulosPermisos = Object.keys(accesos).map((modulo) => ({
    nombreModulo: modulo,
    permisos: accesos[modulo],
  }));

  const numeroModulos = (modulo: string) => {
    return Object.values(iam.modulos).filter(
      (item: any) => item?.llaveModulo === modulo
    )?.[0];
  };

  return (
    <ContPrincipal>
      <ContPerfil>
        <CargarFoto usuario={usuario?.claims} />

        <ContModPermisos>
          {modulosPermisos.map((modu) => (
            <>
              <ContTituloMod>
                {numeroModulos(modu.nombreModulo)?.titulo ?? ''}
              </ContTituloMod>
              <ContPermisos>
                {modu.permisos.map((permi: string) => (
                  <ContInfo key={nanoid()}>
                    <Etiqueta>{permi?.toLowerCase() ?? ''}</Etiqueta>
                  </ContInfo>
                ))}
              </ContPermisos>
            </>
          ))}
        </ContModPermisos>
        <Mensajeria />
      </ContPerfil>
    </ContPrincipal>
  );
};
export default PerfilUsuario;
