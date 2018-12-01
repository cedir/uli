import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListadoMovimientosTableRow extends Component {
    render() {
        return (
            <tr>
                <td>Usuario { this.props.movimiento }</td>
                <td>Estado { this.props.movimiento }</td>
                <td>Fecha Estudio { this.props.movimiento }</td>
                <td>Practica { this.props.movimiento }</td>
                <td>Monto { this.props.movimiento }</td>
                <td>Monto acumulado { this.props.movimiento }</td>
                <td>Desc mov { this.props.movimiento }</td>
                <td>Fecha mov { this.props.movimiento }</td>
                <td>Tipo mov { this.props.movimiento }</td>
                <td>Paciente { this.props.movimiento }</td>
                <td>Obra social { this.props.movimiento }</td>
                <td>Medico { this.props.movimiento }</td>
            </tr>
        );
    }
}

ListadoMovimientosTableRow.propTypes = {
    movimiento: PropTypes.number,
};

export default ListadoMovimientosTableRow;
