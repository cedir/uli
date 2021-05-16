import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap/dist/react-bootstrap';
import CajaPaginacion from './CajaPaginacion';
import ListadoMovimientosTableRow from './ListadoMovimientosTableRow';

function ListadoMovimientosTable({ movimientos, pageNumber, updatePageNumber }) {
    return (
        <React.Fragment>
            <Table striped responsive style={ { marginTop: '3rem' } }>
                <thead>
                    <tr>
                        <th>Fecha Movimiento</th>
                        <th>Usuario</th>
                        <th>Tipo Movimiento</th>
                        <th>Descripcion Movimiento</th>
                        <th>Monto</th>
                        <th>Monto acumulado</th>
                        <th>Obra social</th>
                        <th>Practica</th>
                        <th>Paciente</th>
                        <th>Medico</th>
                    </tr>
                </thead>
                <tbody>
                    { movimientos.map(movimiento => (
                        <ListadoMovimientosTableRow
                          key={ movimiento.id }
                          movimiento={ movimiento }
                        />
                    )) }
                </tbody>
            </Table>
            <CajaPaginacion pageNumber={ pageNumber } updatePageNumber={ updatePageNumber } />
        </React.Fragment>
    );
}

const { array, number, func } = PropTypes;

ListadoMovimientosTable.propTypes = {
    movimientos: array.isRequired,
    pageNumber: number.isRequired,
    updatePageNumber: func.isRequired,
};

export default ListadoMovimientosTable;
