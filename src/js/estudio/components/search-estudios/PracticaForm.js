import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import AsyncTypeaheadRF from '../../../utilities/AsyncTypeaheadRF';

function PracticaForm({
    practicas,
    practica,
    apiLoading,
    fetchPracticas,
}) {
    const renderItem = option => (
        <div key={ option.id }>
            { option.descripcion }
            <div>Codigo: { option.codigoMedico }</div>
        </div>
    );
    const renderFunc = option => `${option.descripcion}, Codigo: ${option.codigoMedico}`;

    return (
        <fieldset>
            <legend>Practica</legend>
            <Field
              name='practica'
              label='Descripcion'
              component={ AsyncTypeaheadRF }
              options={ practicas }
              labelKey={ renderFunc }
              onSearch={ fetchPracticas }
              selected={ practica }
              renderMenuItemChildren={ renderItem }
              isLoading={ apiLoading }
            />
        </fieldset>
    );
}

const { array, func, bool } = PropTypes;

PracticaForm.propTypes = {
    practicas: array.isRequired,
    practica: array.isRequired,
    apiLoading: bool.isRequired,
    fetchPracticas: func.isRequired,
};

export default PracticaForm;
