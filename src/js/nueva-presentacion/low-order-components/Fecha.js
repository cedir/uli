import { Field } from 'redux-form';
import React from 'react';
import { required, dateBeforeThan } from '../../utilities/reduxFormValidators';
import InputRF from '../../utilities/InputRF';

function Fecha() {
    return (
        <div className='date-picker'>
            <Field
              name='fechaDesde'
              type='date'
              label='Fecha'
              component={ InputRF }
              validate={ [required, dateBeforeThan('fechaHasta', 'Debe ser menor que la fecha hasta')] }
            />
        </div>
    );
}

export default Fecha;
