import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import ListadoMovimientosTableRow from './ListadoMovimientosTableRow';
import ListadoMovimientosTableHeader from './ListadoMovimientosTableHeader';

function CajaTableView({ movimientos, setMovimiento, setModal, fromUpdate, sortMovimientos }) {
    return (
        <Table striped responsive>
            <thead>
                <ListadoMovimientosTableHeader
                  fromUpdate={ fromUpdate }
                  sortMovimientos={ sortMovimientos }
                />
            </thead>
            <tbody>
                { movimientos.map(movimiento => (
                    <ListadoMovimientosTableRow
                      key={ movimiento.id }
                      movimiento={ movimiento }
                      setMovimiento={ setMovimiento }
                      setModal={ setModal }
                      fromUpdate={ fromUpdate }
                    />
                )) }
            </tbody>
        </Table>
    );
}

const { array, func, bool } = PropTypes;

CajaTableView.propTypes = {
    movimientos: array.isRequired,
    setMovimiento: func,
    sortMovimientos: func,
    setModal: func,
    fromUpdate: bool,
};

export default CajaTableView;
