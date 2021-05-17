import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap/dist/react-bootstrap';
import CajaPaginacion from './CajaPaginacion';
import ListadoMovimientosTableRow from './ListadoMovimientosTableRow';
import ModalUpdate from './update/ModalUpdate';

function ListadoMovimientosTable({ movimientos, pageNumber, updatePageNumber }) {
    const [movimientoUpdate, setMovimientoUpdate] = useState({});
    const [modal, setModal] = useState(false);
    const fromModalUpdate = false;
    return (
        <React.Fragment>
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
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    { movimientos.map(movimiento => (
                        <ListadoMovimientosTableRow
                          key={ movimiento.id }
                          movimiento={ movimiento }
                          setMovimiento={ setMovimientoUpdate }
                          setModal={ setModal }
                          fromModalUpdate={ fromModalUpdate }
                        />
                    )) }
                </tbody>
            </Table>
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
};

export default ListadoMovimientosTable;
