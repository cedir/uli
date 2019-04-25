import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table }
    from 'react-bootstrap/dist/react-bootstrap';
import ListadoInformeComprobantesTableRow from './ListadoInformeComprobantesTableRow';
import './ListadoInformeComprobantesTable.css';

function comprobantesSort(comprobantes) {
    function sortBy(a, b) {
        const porResponsable = (a.responsable && b.responsable) ?
            a.responsable.localeCompare(b.responsable) : 0;
        const porSubtipo = (a.sub_tipo && b.sub_tipo) ?
            a.sub_tipo.localeCompare(b.sub_tipo) : 0;
        const porTipo = a.tipo_comprobante.nombre.localeCompare(b.tipo_comprobante.nombre);
        const porNumero = a.numero - b.numero;
        if (porResponsable) {
            return porResponsable;
        } else if (porSubtipo) {
            return porSubtipo;
        } else if (porTipo) {
            return porTipo;
        } else if (porNumero) {
            return porNumero;
        }
        return a;
    }
    return comprobantes.sort(sortBy);
}

class ListadoInformeComprobantesTable extends Component {
    render() {
        return (
            <div className='listado-informe-comprobantes'>
                <Table striped responsive>
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Nro</th>
                            <th>Responsable</th>
                            <th>Fecha</th>
                            <th>Cliente</th>
                            <th>Neto</th>
                            <th>IVA</th>
                            <th>Total Facturado</th>
                            <th>Total Cobrado</th>
                            <th>Honorarios</th>
                            <th>Retencion Impositiva (GA)</th>
                            <th>Retencion Cedir</th>
                            <th>Sala de Recuperacion</th>
                            <th>Honorarios Anestesistas</th>
                            <th>Retencion Anestesia</th>
                            <th>Medicamentos</th>
                            <th>Material Especifico</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            comprobantesSort(this.props.comprobantes).map(comprobante =>
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
