import React from 'react';
import PropTypes from 'prop-types';

function formatDate(dateString) {
    const d = new Date(dateString);
    return `${d.getUTCDate()}/${d.getUTCMonth() + 1}/${d.getUTCFullYear()}`;
}

class EstudioListTableRow extends React.Component {
    constructor(props) {
        super(props);

        this.onRowClick = this.onRowClick.bind(this);
    }
    onRowClick() {
        const estudioId = this.props.estudio.id;
        this.props.onRowClick(estudioId);
    }
    render() {
        /* If any of this requirements objects are not present in the estudio object,
        * supply a default one. This situation is exceptional and related with wrong data in db
        */
        const paciente = this.props.estudio.paciente || { nombre: '', apellido: '' };
        const obraSocial = this.props.estudio.obra_social || { nombre: '' };
        const practica = this.props.estudio.practica || { descripcion: '' };
        const medico = this.props.estudio.medico || { nombre: '', apellido: '' };
        const medicoSolicitante = this.props.estudio.medico_solicitante || { nombre: '', apellido: '' };

        return (
            <tr onClick={ this.onRowClick } style={ { cursor: 'pointer' } }>
                <td>{ formatDate(this.props.estudio.fecha) }</td>
                <td>{ `${paciente.apellido}, ${paciente.nombre}` }</td>
                <td>{ obraSocial.nombre }</td>
                <td>{ practica.descripcion }</td>
                <td>{ `${medico.apellido}, ${medico.nombre}` }</td>
                <td>{ `${medicoSolicitante.apellido}, ${medicoSolicitante.nombre}` }</td>
            </tr>
        );
    }
}

const { object, func } = PropTypes;

EstudioListTableRow.propTypes = {
    estudio: object.isRequired,
    onRowClick: func.isRequired,
};

export default EstudioListTableRow;
