import { nanoid } from 'nanoid';
import { ContFlexColumn } from 'comunes/estilos/EstComunes';

import { iconografia } from './recursos/Iconografia';

import {
  Close,
  Details,
  ItemLista,
  Listado,
  Summary,
  TarjetaError,
} from './estilos/EstErrores';

const Errores = ({ datosImportados }: any) => (
  <ContFlexColumn style={{ marginTop: '1em', alignItems: 'flex-start' }}>
    {datosImportados?.map((caso: any) => {
      if (caso.error.length > 0) {
        if (caso.error !== '') {
          if (caso.error.length > 0) {
            return (
              <Details key={nanoid(5)}>
                <TarjetaError>
                  <Summary>{`Se encontró un error en ${caso.identidad} - fila ${caso.numFila}`}</Summary>
                  {!caso.seCarga &&
                    (Array.isArray(caso.error) ? (
                      caso.error.map((item: any, idx: number) => (
                        <Listado key={idx}>
                          <ItemLista>
                            <ContFlexColumn
                              style={{ justifyContent: 'flex-start' }}
                            >
                              <Close>{iconografia.error.path}</Close>
                            </ContFlexColumn>
                            {item}
                          </ItemLista>
                        </Listado>
                      ))
                    ) : (
                      <ItemLista>{caso.error}</ItemLista>
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

export default Errores;
