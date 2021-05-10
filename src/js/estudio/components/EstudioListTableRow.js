import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CheckCircle from 'mdi-react/CheckCircleIcon';
import { ASOCIAR_ESTUDIO } from '../../caja/actionTypes';

function formatDate(dateString) {
    const d = new Date(dateString);
    return `${d.getUTCDate()}/${d.getUTCMonth() + 1}/${d.getUTCFullYear()}`;
}

function EstudioListTableRow({
    estudio,
    onRowClick,
    printMode,
    fromCaja,
    asociarEstudio,
    history,
}) {
    const paciente = estudio.paciente || { nombre: '', apellido: '' };
    const obraSocial = estudio.obra_social || { nombre: '' };
    const practica = estudio.practica || { descripcion: '' };
    const medico = estudio.medico || { nombre: '', apellido: '' };
    const medicoSolicitante = estudio.medico_solicitante || { nombre: '', apellido: '' };
    const conMovimiento = estudio.movimientos_asociados || false;
    const { estado = '-' } = estudio;
    const fromCajaStyle = fromCaja && conMovimiento ? { backgroundColor: '#d2e8ff' } : {};
    return (
        <tr
          onClick={ !fromCaja ? () => onRowClick(estudio.id) : () => {} }
          style={ !fromCaja ? { cursor: 'pointer' } : fromCajaStyle }
        >
            <td>{ formatDate(estudio.fecha) }</td>
            <td>{ `${paciente.apellido}, ${paciente.nombre}` }</td>
            <td>{ obraSocial.nombre }</td>
            <td>{ practica.descripcion }</td>
            <td>{ estado }</td>
            <td>{ `${medico.apellido}, ${medico.nombre}` }</td>
            { !printMode && !fromCaja && <td>{ `${medicoSolicitante.apellido}, ${medicoSolicitante.nombre}` }</td> }
            { fromCaja && <td>
                <CheckCircle onClick={ () => { asociarEstudio(estudio); history.goBack(); } } />
            </td> }
        </tr>
    );
}

const { object, func, bool } = PropTypes;

EstudioListTableRow.propTypes = {
    estudio: object.isRequired,
    onRowClick: func.isRequired,
    printMode: bool.isRequired,
    fromCaja: bool.isRequired,
    asociarEstudio: func.isRequired,
    history: object.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        asociarEstudio: estudio => dispatch({ type: ASOCIAR_ESTUDIO, estudio }),
    };
}

export default connect(null, mapDispatchToProps)(EstudioListTableRow);
