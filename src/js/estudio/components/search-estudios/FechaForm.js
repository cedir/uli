import React from 'react';
import { Field } from 'redux-form';
import InputRF from '../../../utilities/InputRF';
import { dateBeforeThan, dateAfterThan } from '../../../utilities/reduxFormValidators';

function FechaForm() {
    return (
        <fieldset>
            <legend>Periodo</legend>
            <Field
              name='fechaDesde'
              type='date'
              label='Desde'
              component={ InputRF }
              validate={ dateBeforeThan('fechaHasta', 'Debe ser menor que la fecha hasta') }
            />
            <Field
              name='fechaHasta'
              type='date'
              label='Hasta'
              component={ InputRF }
              validate={ dateAfterThan('fechaDesde', 'Debe ser mayo que la fecha desde') }
            />
        </fieldset>
    );
}

export default FechaForm;
