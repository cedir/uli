/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes, { func } from 'prop-types';

function AgregarEstudioTableRow(props) {
    const { selected, onClickIcon } = props;
    const {
        id, fecha, paciente, practica, medico,
    } = props.estudios;

    return (
        <tr
          onClick={ onClickIcon }
          className={ selected ? 'selected' : '' }
        >
            <td>{ fecha }</td>
            <td title={ `${paciente.nombre} ${paciente.apellido}` }>
                { paciente.apellido }
            </td>
            <td title={ practica.descripcion }>
                { practica.abreviatura }
            </td>
            <td title={ ` ${medico.nombre} ${medico.apellido} ` }>
                { medico.apellido }
            </td>
            <td title={ ` ${medico.nombre} ${medico.apellido} ` }>
                { medico.apellido }
            </td>
        </tr>
    );
}

AgregarEstudioTableRow.propTypes = {
    estudios: PropTypes.object,
    onClickIcon: PropTypes.func,
    selected: PropTypes.bool,
};

export default connect(null, null)(AgregarEstudioTableRow);
