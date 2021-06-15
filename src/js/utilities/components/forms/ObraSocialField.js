import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requiredOption } from '../../reduxFormValidators';
import AsyncTypeaheadRF from '../../AsyncTypeaheadRF';
import { FETCH_OBRAS_SOCIALES } from '../../../obraSocial/actionTypes';

function ObraSocialField({
    name,
    label,
    required,
    obrasSociales,
    obraSocial,
    fetchObrasSociales,
    apiLoading,
}) {
    const validate = required ? requiredOption : [];

    const renderItem = option => (
        <div key={ option.id }>
            { option.nombre }
        </div>
    );

    return (
        <Field
          name={ name }
          label={ label }
          validate={ validate }
          component={ AsyncTypeaheadRF }
          options={ obrasSociales }
          labelKey='nombre'
          onSearch={ fetchObrasSociales }
          selected={ obraSocial }
          renderMenuItemChildren={ renderItem }
          isLoading={ apiLoading }
        />
    );
}

const { string, bool, array, func } = PropTypes;

ObraSocialField.propTypes = {
    name: string.isRequired,
    label: string.isRequired,
    required: bool,
    obraSocial: array.isRequired,
    obrasSociales: array.isRequired,
    fetchObrasSociales: func.isRequired,
    apiLoading: bool.isRequired,
};

function mapStateToProps(state) {
    return {
        obrasSociales: state.obraSocialReducer.obrasSociales,
        apiLoading: state.obraSocialReducer.apiLoading || false,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchObrasSociales: nombre => dispatch({ type: FETCH_OBRAS_SOCIALES, nombre }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ObraSocialField);
