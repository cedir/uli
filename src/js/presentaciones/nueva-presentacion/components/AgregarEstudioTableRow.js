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
        <tr>
            <td>
                <i
                  className={ `fa fa-check check-icon ${selected ? 'selected' : ''}` }
                  onClick={ onClickIcon }
                  role='button'
                  tabIndex='0'
                />
            </td>
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
