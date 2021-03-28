import React from 'react';
import PropTypes from 'prop-types';
import { Table }
    from 'react-bootstrap/dist/react-bootstrap';

import ListadoMovimientosTableRow from './ListadoMovimientosTableRow';

function ListadoMovimientosTable({ movimientos, movimientosRef }) {
    return (
        <div className='listado-movimientos' ref={ movimientosRef }>
            <Table striped responsive>
                <thead>
                    <tr>
                        <th>Fecha Movimiento</th>
                        <th>Tipo Movimiento</th>
                        <th>Descripcion Movimiento</th>
                        <th>Monto</th>
                        <th>Monto acumulado</th>
                        <th>Fecha estudio</th>
                        <th>Obra social</th>
                        <th>Practica</th>
                        <th>Paciente</th>
                        <th>Medico</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        movimientos.map(movimiento =>
                            (
                                <ListadoMovimientosTableRow
                                  key={ movimiento.id }
                                  movimiento={ movimiento }
                                />
                            ))
                    }
                </tbody>
            </Table>
        </div>
    );
}

const { array, object } = PropTypes;

ListadoMovimientosTable.propTypes = {
    movimientos: array.isRequired,
    movimientosRef: object.isRequired,
};

export default ListadoMovimientosTable;
