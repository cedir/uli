import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import ListadoMovimientosTableRow from './ListadoMovimientosTableRow';

function CajaTableView({ movimientos, setMovimiento, setModal, fromUpdate }) {
    return (
        <Table striped responsive>
            <thead>
                <tr>
                    <th>Fecha Movimiento</th>
                    <th>Tipo Movimiento</th>
                    <th>Descripcion Movimiento</th>
                    <th>Monto</th>
                    <th>Monto acumulado</th>
                    <th>Obra social</th>
                    <th>Practica</th>
                    <th>Paciente</th>
                    <th>Medico</th>
                    {!fromUpdate && <th />}
                </tr>
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
    setModal: func,
    fromUpdate: bool,
};

export default CajaTableView;
