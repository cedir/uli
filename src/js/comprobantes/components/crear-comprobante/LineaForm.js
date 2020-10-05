import React from 'react';
import { Row, Col } from 'react-bootstrap/dist/react-bootstrap';
import { Field } from 'redux-form';
import InputRF from '../../../utilities/InputRF';
import { requiredOption } from '../../../utilities/reduxFormValidators';

function LineaForm() {
    return (
        <Row>
            <Col md={ 12 }>
                <Field
                  name='concepto'
                  label='Concepto'
                  component={ InputRF }
                  validate={ requiredOption }
                  type='text'
                />
            </Col>
            <Col md={ 4 }>
                <Field
                  name='importeNeto'
                  label='Importe Neto'
                  component={ InputRF }
                  validate={ requiredOption }
                  type='text'
                />
            </Col>

            <Col md={ 4 }>
                <Field
                  name='importeIva'
                  label='Importe Iva'
                  component={ InputRF }
                  validate={ requiredOption }
                  type='text'
                />
            </Col>

            <Col md={ 4 }>
                <Field
                  name='subtotal'
                  label='Sub-Total'
                  component={ InputRF }
                  validate={ requiredOption }
                  type='text'
                />
            </Col>
        </Row>
    );
}

export default LineaForm;
