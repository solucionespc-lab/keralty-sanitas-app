// importación de estilos

import { ContFlexColumn, ContFlexRow, Etiqueta, Subtitulo } from 'comunes/estilos/EstComunes'
import { iconografia } from './recursos/Iconografia'

const DatosCargado = ({ datosFallidos, datosACargar, tituloImportados }:any) => (
  <ContFlexColumn
    style={{
      justifyContent: 'center',
      background: '#eeeeee',
      padding: '1em',
      width: '100%',
      borderRadius: '0px 0px 10px 10px'
    }}
  >
    <ContFlexColumn>
      <ContFlexRow style={{ justifyContent: 'space-evenly', gap: '1em' }}>
        <ContFlexColumn style={{ alignItems: 'center' }}>
          <Etiqueta
            style={{
              fontWeight: '700',
              marginBottom: '0.5em'
            }}
          >
            {tituloImportados}
          </Etiqueta>
          <ContFlexRow style={{ justifyContent: 'space-evenly' }}>
            {iconografia?.Excel?.path?.[0] ?? null}
            <Subtitulo
              style={{
                color: 'var(--brand-primary)',
                fontWeight: '700',
                margin: '0em 0em 0em 1em'
              }}
            >
              {datosACargar}
            </Subtitulo>
          </ContFlexRow>
        </ContFlexColumn>
        <ContFlexColumn style={{ alignItems: 'center' }}>
          <Etiqueta
            style={{
              fontWeight: '700',
              marginBottom: '0.5em'
            }}
          >
            Errores
          </Etiqueta>
          <ContFlexRow style={{ justifyContent: 'space-evenly' }}>
            {iconografia?.Excel?.path?.[0] ?? null}
            <Subtitulo
              style={{
                color: 'var(--brand-primary)',
                fontWeight: '700',
                margin: '0em 0em 0em 1em'
              }}
            >
              {datosFallidos}
            </Subtitulo>
          </ContFlexRow>
        </ContFlexColumn>
      </ContFlexRow>
    </ContFlexColumn>
  </ContFlexColumn>
)
export default DatosCargado
