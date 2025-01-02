import { resetFiltros } from 'modulos/trabajadores/store/FiltrosStore';
import { enviarFiltros } from 'modulos/autoevaluacion/store/FiltrosAutoStore';
import ModalFiltro from 'comunes/funcionales/modalFiltros/ModalFiltro';

import FiltrosGenerales from './FiltrosGenerales';
import FiltrosFechas from './FiltrosFechas';

const FiltrosExcelencia = ({ close }: { close: () => void }) => {
  return (
    <ModalFiltro
      functions={{
        close,
        apply: () => {
          enviarFiltros();
          close();
        },
        delete: () => {
          resetFiltros();
          close();
        },
      }}
      pageDates={1}
      nota='Recuerde que puede utilizar uno o varios, según lo requiera'
    >
      <FiltrosGenerales />
      <FiltrosFechas />
    </ModalFiltro>
  );
};

export default FiltrosExcelencia;
