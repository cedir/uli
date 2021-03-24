import React from 'react';
import { Field } from 'redux-form';
import { Col, FormGroup } from 'react-bootstrap';
import InputRF from '../../utilities/InputRF';

function ComprobanteFields() {
    return (
        <FormGroup>
            <Col md={ 10 }>
                <Field
                  name='nombreCliente'
                  label='Nombre Cliente'
                  component={ InputRF }
                  type='text'
                  className='form-control'
                />
            </Col>
            <Col md={ 4 }>
                <Field
                  name='numero'
                  label='Numero de Comprobante'
                  component={ InputRF }
                  className='form-control'
                />
            </Col>
            <Col md={ 4 }>
                <Field
                  name='cuit'
                  label='DNI/CUIT'
                  component={ InputRF }
                  className='form-control'
                />
            </Col>
        </FormGroup>
    );
}

export default ComprobanteFields;
