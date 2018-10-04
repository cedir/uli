import React, { Component } from 'react';
import { Table }
    from 'react-bootstrap/dist/react-bootstrap';
import ListadoInformeComprobantesTableRow from './ListadoInformeComprobantesTableRow';

class ListadoInformeComprobantesTable extends Component {
    render() {
        return (
            <div>
                <Table striped responsive style={ { marginTop: '20px' } }>
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Nro</th>
                            <th>Estado</th>
                            <th>Fecha</th>
                            <th>Cliente</th>
                            <th>Total Facturado</th>
                            <th>Total Cobrado</th>
                            <th>Neto</th>
                            <th>IVA</th>
                            <th>Honorarios</th>
                            <th>Retencion Impositiva</th>
                            <th>Retencion Cedir(GA)</th>
                            <th>Sala de Recuperacion</th>
                            <th>Retencion Anestesia</th>
                            <th>Medicamentos</th>
                            <th>Materia Especifico</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(index =>
                                (
                                    <ListadoInformeComprobantesTableRow
                                      key={ index }
                                    />
                                ))
                        }
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ListadoInformeComprobantesTable;
