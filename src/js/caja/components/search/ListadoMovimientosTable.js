import React, { Component } from 'react';
import { Table }
    from 'react-bootstrap/dist/react-bootstrap';

import ListadoMovimientosTableRow from './ListadoMovimientosTableRow';

class ListadoMovimientosTable extends Component {
    render() {
        return (
            <div>
                <Table striped responsive style={ { marginTop: '20px' } }>
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Estado</th>
                            <th>Fecha estudio</th>
                            <th>Practica</th>
                            <th>Monto</th>
                            <th>Monto acumulado</th>
                            <th>Descripcion Movimiento</th>
                            <th>Fecha Movimiento</th>
                            <th>Tipo Movimiento</th>
                            <th>Paciente</th>
                            <th>Obra social</th>
                            <th>Medico</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            [1, 2, 3, 4, 5, 6].map(movNum =>
                                (
                                    <ListadoMovimientosTableRow
                                      key={ movNum }
                                      movimiento={ movNum }
                                    />
                                ))
                        }
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ListadoMovimientosTable;
