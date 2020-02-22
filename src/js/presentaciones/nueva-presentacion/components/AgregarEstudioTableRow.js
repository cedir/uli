/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SELECCIONAR_ESTUDIO } from '../actionTypes';

function AgregarEstudioTableRow(props) {
    const [isSelected, setIsSelected] = useState(false);
    const { seleccionarEstudio } = props;
    const {
        id, fecha, paciente, practica, medico,
    } = props.estudios;

    const iconClickHandler = () => {
        setIsSelected(!isSelected);
        seleccionarEstudio(id);
    };

    return (
        <tr>
            <td>
                <i
                  className={ `fa fa-check check-icon ${isSelected ? 'selected' : ''}` }
                  onClick={ iconClickHandler }
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
    estudios: PropTypes.array,
    seleccionarEstudio: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
    return {
        seleccionarEstudio: id =>
            dispatch({ type: SELECCIONAR_ESTUDIO, id }),
    };
}

export default connect(null, mapDispatchToProps)(AgregarEstudioTableRow);
