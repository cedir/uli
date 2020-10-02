import React from 'react';
import { Field } from 'redux-form';
import InputRF from '../../../utilities/InputRF';
import { requiredOption } from '../../../utilities/reduxFormValidators';

function ClienteForm() {
    return (
        <React.Fragment>
            <Field
              name='nombreCliente'
              label='Nombre'
              component={ InputRF }
              placeholder='Nombre...'
              validate={ requiredOption }
              type='text'
            />
            <Field
              name='domicilioCliente'
              label='Domicilio'
              component={ InputRF }
              placeholder='Domicilio...'
              validate={ requiredOption }
              type='text'
            />
            <Field
              name='dni'
              label='DNI'
              component={ InputRF }
              placeholder='Dni...'
              validate={ requiredOption }
              type='text'
            />
            <Field
              name='tipoDocumento'
              label='Tipo de documento'
              component={ InputRF }
              placeholder='Nombre...'
              validate={ requiredOption }
              type='text'
            />
            <Field
              name='condicionFiscal'
              label='Condicion fiscal'
              component={ InputRF }
              placeholder='Nombre...'
              validate={ requiredOption }
              type='text'
            />
        </React.Fragment>
    );
}

ClienteForm.fields = [
    'nombreCliente',
    'domicilioCliente',
    'dni',
    'tipoDocumento',
    'condicionFiscal',
];

export default ClienteForm;
