import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CajaPaginacion from './CajaPaginacion';
import ModalUpdate from './update/ModalUpdate';
import CajaTableView from './CajaTableView';

function ListadoMovimientosTable({
  movimientos,
  pageNumber,
  updatePageNumber,
  sortMovimientos,
}) {
    const [movimientoUpdate, setMovimientoUpdate] = useState({});
    const [modal, setModal] = useState(false);
    return (
        <React.Fragment>
            <CajaTableView
              movimientos={ movimientos }
              setMovimiento={ setMovimientoUpdate }
              setModal={ setModal }
              sortMovimientos={ sortMovimientos }
            />
            <CajaPaginacion pageNumber={ pageNumber } updatePageNumber={ updatePageNumber } />
            <ModalUpdate
              movimiento={ movimientoUpdate }
              setModal={ setModal }
              modalOpened={ modal }
            />
        </React.Fragment>
    );
}

const { array, number, func } = PropTypes;

ListadoMovimientosTable.propTypes = {
    movimientos: array.isRequired,
    pageNumber: number.isRequired,
    updatePageNumber: func.isRequired,
    sortMovimientos: func.isRequired,
};

export default ListadoMovimientosTable;
