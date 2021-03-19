import React from 'react';
import PropTypes from 'prop-types';

function formatDate(dateString) {
    const d = new Date(dateString);
    return `${d.getUTCDate()}/${d.getUTCMonth() + 1}/${d.getUTCFullYear()}`;
}

function EstudioListTableRow({ estudio, onRowClick, printMode }) {
    const paciente = estudio.paciente || { nombre: '', apellido: '' };
    const obraSocial = estudio.obra_social || { nombre: '' };
    const practica = estudio.practica || { descripcion: '' };
    const medico = estudio.medico || { nombre: '', apellido: '' };
    const medicoSolicitante = estudio.medico_solicitante || { nombre: '', apellido: '' };
    const { estado = '-' } = estudio;

    return (
        <tr
          onClick={ () => onRowClick(estudio.id) }
          style={ { cursor: 'pointer' } }
        >
            <td>{ formatDate(estudio.fecha) }</td>
            <td>{ `${paciente.apellido}, ${paciente.nombre}` }</td>
            <td>{ obraSocial.nombre }</td>
            <td>{ practica.descripcion }</td>
            <td>{ estado }</td>
            <td>{ `${medico.apellido}, ${medico.nombre}` }</td>
            {!printMode && <td>{ `${medicoSolicitante.apellido}, ${medicoSolicitante.nombre}` }</td>}
        </tr>
    );
}

const { object, func, bool } = PropTypes;

EstudioListTableRow.propTypes = {
    estudio: object.isRequired,
    onRowClick: func.isRequired,
    printMode: bool.isRequired,
};

export default EstudioListTableRow;
