import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { FETCH_PACIENTES } from '../../../paciente/actionTypes';
import AsyncTypeaheadRF from '../../AsyncTypeaheadRF';
import { requiredOption } from '../../reduxFormValidators';

function PacienteField({
    name,
    label,
    required = false,
    placeholder = '',
    paciente,
    pacientes,
    fetchPacientes,
    apiLoading,
}) {
    const validate = required ? requiredOption : [];
    const renderText = (option) => {
        if (!option.nombre || !option.apellido) {
            return '';
        }

        return `${option.apellido}, ${option.nombre}, DNI: ${option.dni}`;
    };

    const renderItem = option => (
        <div style={ { width: '100%' } } key={ option.id }>
            { `${option.apellido}, ${option.nombre}` }
            <div>DNI: { option.dni }</div>
        </div>
    );

    return (
        <Field
          name={ name }
          label={ label }
          placeholder={ placeholder }
          validate={ validate }
          component={ AsyncTypeaheadRF }
          options={ pacientes }
          labelKey={ renderText }
          onSearch={ fetchPacientes }
          selected={ paciente }
          renderMenuItemChildren={ renderItem }
          isLoading={ apiLoading }
        />
    );
}

const { string, bool, array, func } = PropTypes;

PacienteField.propTypes = {
    name: string.isRequired,
    label: string.isRequired,
    required: bool,
    placeholder: string,
    paciente: array.isRequired,
    pacientes: array.isRequired,
    fetchPacientes: func.isRequired,
    apiLoading: bool.isRequired,
};


function mapStateToProps(state) {
    return {
        pacientes: state.pacienteReducer.pacientes,
        apiLoading: state.pacienteReducer.pacienteApiLoading || false,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPacientes: searchText =>
            dispatch({ type: FETCH_PACIENTES, searchText }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PacienteField);
