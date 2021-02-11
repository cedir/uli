import React from 'react';
import { Field } from 'redux-form';
import InputRF from '../../utilities/InputRF';

export default function TipoPresentacionSearchForm() {
    const tiposPresentacion = ['Directa', 'AMR'];

    return (
        <Field
          name='tipoPresentacion'
          label='Tipo de Presentacion'
          componentClass='select'
          component={ InputRF }
          selectOptions={ tiposPresentacion }
          nullValue=''
        />
    );
}
