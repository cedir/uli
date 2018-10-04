import React, { Component } from 'react';

class ListadoInformeComprobantesTableRow extends Component {
    render() {
        return (
            <tr onClick={ this.onRowClick } style={ { cursor: 'pointer' } }>
                <td>Tipo Comprobante</td>
                <td>Nro Comprobante</td>
                <td>Estado Comprobante</td>
                <td>Fecha Comprobante</td>
                <td>Cliente Comprobante</td>
                <td>Total Facturado Comprobante</td>
                <td>Total Cobrado Comprobante</td>
                <td>Neto Comprobante</td>
                <td>IVA Comprobante</td>
                <td>Honorarios Comprobante</td>
                <td>Retencion Impositiva Comprobante</td>
                <td>Retencion Cedir(GA) Comprobante</td>
                <td>Sala de Recuperacion Comprobante</td>
                <td>Retencion Anestesia Comprobante</td>
                <td>Medicamentos Comprobante</td>
                <td>Material Especifico Comprobante</td>
            </tr>
        );
    }
}

export default ListadoInformeComprobantesTableRow;
