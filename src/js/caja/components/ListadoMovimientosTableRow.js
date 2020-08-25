import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListadoMovimientosTableRow extends Component {
    render() {
        const movimiento = this.props.movimiento;
        const monto = movimiento.monto;
        const montoAcumulado = movimiento.monto_acumulado;
        const descripcionMovimiento = movimiento.concepto;
        const fechaMovimiento = movimiento.fecha;
        const horaMovimiento = movimiento.hora;
        const tipoMovimiento = movimiento.tipo
            ? movimiento.tipo.descripcion
            : '--';
        const fechaEstudio = movimiento.estudio && movimiento.estudio.fecha;
        const practica = movimiento.estudio && movimiento.estudio.practica
            ? movimiento.estudio.practica.descripcion
            : '--';
        const paciente = movimiento.estudio && movimiento.estudio.paciente
            ? `${movimiento.estudio.paciente.apellido}, ${movimiento.estudio.paciente.nombre}`
            : '--';
        const obraSocial = movimiento.estudio && movimiento.estudio.obra_social
            ? movimiento.estudio.obra_social.nombre
            : '--';
        const medico = movimiento.estudio && movimiento.estudio.medico
            ? `${movimiento.estudio.medico.apellido}, ${movimiento.estudio.medico.nombre}`
            : '--';
        return (
            <tr>
                <td>{ fechaMovimiento } {horaMovimiento}</td>
                <td>{ tipoMovimiento }</td>
                <td className='col-md-3'>{ descripcionMovimiento }</td>
                <td>{ monto }</td>
                <td>{ montoAcumulado }</td>
                <td>{ fechaEstudio }</td>
                <td>{ obraSocial }</td>
                <td>{ practica }</td>
                <td>{ paciente }</td>
                <td>{ medico }</td>
            </tr>
        );
    }
}

ListadoMovimientosTableRow.propTypes = {
    movimiento: PropTypes.object,
};

export default ListadoMovimientosTableRow;
