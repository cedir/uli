import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListadoInformeComprobantesTableRow extends Component {
    render() {
        return (
            <tr onClick={ this.onRowClick }>
                <td>{ this.props.comprobante.tipo_comprobante.nombre }</td>
                <td>{ this.props.comprobante.numero }</td>
                <td>{ this.props.comprobante.estado }</td>
                <td>{ this.props.comprobante.fecha_emision }</td>
                <td>{ this.props.comprobante.nombre_cliente }</td>
                <td>{ this.props.comprobante.total_facturado }</td>
                <td>{ this.props.comprobante.total_cobrado }</td>
                <td>{ this.props.comprobante.importe_gravado_afip }</td>
                <td>{ this.props.comprobante.importe_alicuota_afip }</td>
                <td>{ this.props.comprobante.honorarios_medico }</td>
                <td>{ this.props.comprobante.retencion_impositiva }</td>
                <td>{ this.props.comprobante.retencion_cedir }</td>
                <td>{ this.props.comprobante.sala_recuperacion }</td>
                <td>{ this.props.comprobante.honorarios_anestesistas}</td>
                <td>{ this.props.comprobante.total_medicamentos }</td>
                <td>{ this.props.comprobante.total_material_especifico }</td>
            </tr>
        );
    }
}

const { object } = PropTypes;

ListadoInformeComprobantesTableRow.propTypes = {
    comprobante: object.isRequired,
};

export default ListadoInformeComprobantesTableRow;
