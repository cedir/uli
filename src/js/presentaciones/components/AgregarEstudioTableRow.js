/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CheckBoxIcon from 'mdi-react/CheckBoxIcon';

function AgregarEstudioTableRow(props) {
    const { selected, onClickIcon, hiddenCheckBox } = props;
    const {
        id, fecha, paciente, practica, medico,
    } = props.estudios;

    return (
        <tr
          className={ selected ? 'selected' : '' }
        >
            <td hidden={ hiddenCheckBox }>
                <CheckBoxIcon
                  onClick={ onClickIcon }
                  className={ selected ? 'active' : '' }
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
    hiddenCheckBox: PropTypes.bool,
};

export default connect(null, null)(AgregarEstudioTableRow);
