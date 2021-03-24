import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import AsyncTypeaheadRF from '../../../utilities/AsyncTypeaheadRF';

function ObraSocialForm({
    obrasSociales,
    obraSocial,
    fetchObrasSociales,
    apiLoading,
}) {
    const renderObraSocialMenuItem = option => (
        <div key={ option.id }>
            { option.nombre }
        </div>
    );

    return (
        <fieldset>
            <legend>Obra Social</legend>
            <Field
              name='obraSocial'
              label='Nombre'
              component={ AsyncTypeaheadRF }
              options={ obrasSociales }
              labelKey='nombre'
              onSearch={ fetchObrasSociales }
              renderMenuItemChildren={ renderObraSocialMenuItem }
              isLoading={ apiLoading }
              selected={ obraSocial }
            />
        </fieldset>
    );
}

const { func, array, bool } = PropTypes;

ObraSocialForm.propTypes = {
    obrasSociales: array.isRequired,
    fetchObrasSociales: func.isRequired,
    apiLoading: bool.isRequired,
    obraSocial: array.isRequired,
};

export default ObraSocialForm;
