/* eslint-disable react/prop-types */
import { nanoid } from 'nanoid';

import { ContFlexColumn } from 'comunes/estilos/EstComunes';
import {
  Close,
  Details,
  ItemLista,
  Listado,
  Summary,
  TarjetaError,
} from './estilos/EstErrores';
import { iconografia } from './recursos/Iconografia';

const ErroresImportados = ({ datosImportados }: any) => (
  <ContFlexColumn style={{ marginTop: '1em', alignItems: 'flex-start' }}>
    {datosImportados?.map((caso: any) => {
      if (caso.mensajes.length > 0) {
        if (caso.mensajes !== '') {
          if (caso.mensajes.length > 0) {
            return (
              <Details key={nanoid(5)}>
                <TarjetaError>
                  <Summary>{`Se encontró un error al importar `}</Summary>

                  {!caso.seCarga &&
                    (Array.isArray(caso.mensajes) ? (
                      caso.mensajes.map((item: any) => (
                        <Listado key={item}>
                          <ItemLista>
                            <ContFlexColumn>
                              <Close>{iconografia.error.path}</Close>
                            </ContFlexColumn>
                            {item}
                          </ItemLista>
                        </Listado>
                      ))
                    ) : (
                      <ItemLista>{caso.mensajes}</ItemLista>
                    ))}
                </TarjetaError>
              </Details>
            );
          }
          return null;
        }
        return null;
      }
      return null;
    })}
  </ContFlexColumn>
);
export default ErroresImportados;
