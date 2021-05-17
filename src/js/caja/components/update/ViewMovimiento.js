import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap/dist/react-bootstrap';
import ListadoMovimientosTableRow from '../ListadoMovimientosTableRow';

function ListadoMovimientosTable({ movimiento }) {
    const fromModalUpdate = true;
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
                </tr>
            </thead>
            <tbody>
                <ListadoMovimientosTableRow
                  movimiento={ movimiento }
                  fromModalUpdate={ fromModalUpdate }
                />
            </tbody>
        </Table>
    );
}

const { object } = PropTypes;

ListadoMovimientosTable.propTypes = {
    movimiento: object.isRequired,
};

export default ListadoMovimientosTable;
