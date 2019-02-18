import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table }
    from 'react-bootstrap/dist/react-bootstrap';
import ListadoInformeComprobantesTableRow from './ListadoInformeComprobantesTableRow';
import './ListadoInformeComprobantesTable.css';

class ListadoInformeComprobantesTable extends Component {
    render() {
        return (
            <div className='listado-informe-comprobantes'>
                <Table striped responsive>
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
                            <th>Material Especifico</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.comprobantes.map(comprobante =>
                                (
                                    <ListadoInformeComprobantesTableRow
                                      key={ comprobante.id }
                                      comprobante={ comprobante }
                                    />
                                ))
                        }
                    </tbody>
                </Table>
            </div>
        );
    }
}

const { array } = PropTypes;
ListadoInformeComprobantesTable.propTypes = {
    comprobantes: array.isRequired,
};

ListadoInformeComprobantesTable.defaultProps = {
    comprobantes: [],
};

function mapStateToProps(state) {
    return {
        comprobantes: state.comprobantesReducer.comprobantes,
    };
}

export default connect(mapStateToProps, null)(ListadoInformeComprobantesTable);
