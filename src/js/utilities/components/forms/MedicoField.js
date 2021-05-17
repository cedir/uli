import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import AsyncTypeaheadRF from '../../AsyncTypeaheadRF';
import { FETCH_MEDICOS_ACTUANTES, FETCH_MEDICOS_SOLICITANTES } from '../../../medico/actionTypes';

function MedicoField({
    nameField,
    label,
    type,
    medico,
    fetchActuantes,
    fetchSolicitantes,
    apiLoading,
    medicosActuantes,
    medicosSolicitantes,
}) {
    const fetchMedico = type === 'solicitante' ? fetchSolicitantes : fetchActuantes;
    const medicos = type === 'solicitante' ? medicosSolicitantes : medicosActuantes;

    const renderMedicoText = (option) => {
        if (!option.nombre || !option.apellido) {
            return '';
        }

        return `${option.apellido}, ${option.nombre}`;
    };

    const renderMedicoItem = option => (
        <div style={ { width: '100%' } } key={ option.id }>
            {renderMedicoText(option)}
        </div>
    );

    return (
        <Field
          name={ nameField }
          label={ label }
          component={ AsyncTypeaheadRF }
          options={ medicos }
          labelKey={ renderMedicoText }
          onSearch={ searchText => fetchMedico({ id: medico.id, searchText }) }
          selected={ medico }
          renderMenuItemChildren={ renderMedicoItem }
          isLoading={ apiLoading }
        />
    );
}

const { string, func, bool, array } = PropTypes;

MedicoField.propTypes = {
    nameField: string.isRequired,
    label: string,
    medico: array,
    type: string.isRequired,
    fetchActuantes: func.isRequired,
    fetchSolicitantes: func.isRequired,
    apiLoading: bool.isRequired,
    medicosActuantes: array.isRequired,
    medicosSolicitantes: array.isRequired,
};

function mapStateToProps(state) {
    return {
        apiLoading: state.medicoReducer.medicoActuanteApiLoading || false,
        medicosActuantes: state.medicoReducer.medicosActuantes,
        medicosSolicitantes: state.medicoReducer.medicosSolicitantes,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchActuantes: searchParams =>
            dispatch({ type: FETCH_MEDICOS_ACTUANTES, searchParams }),
        fetchSolicitantes: searchParams =>
            dispatch({ type: FETCH_MEDICOS_SOLICITANTES, searchParams }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MedicoField);
