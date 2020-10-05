import React from 'react';
import { Field } from 'redux-form';
import { Row, Col } from 'react-bootstrap/dist/react-bootstrap';
import InputRF from '../../../utilities/InputRF';
import { requiredOption } from '../../../utilities/reduxFormValidators';

function CabeceraForm() {
    return (
        <Row>
            <Col md={ 4 }>
                <Field
                  name='responsable'
                  label='Responsable'
                  component={ InputRF }
                  componentClass='select'
                  validate={ requiredOption }
                  type='text'
                />
                <Field
                  name='iva'
                  label='Iva'
                  component={ InputRF }
                  componentClass='select'
                  validate={ requiredOption }
                  type='text'
                />
            </Col>
            <Col md={ 4 } mdOffset={ 2 }>
                <Field
                  name='tipoComprobante'
                  label='Tipo de comprobante'
                  component={ InputRF }
                  componentClass='select'
                  validate={ requiredOption }
                  type='text'
                />
                <Field
                  name='subTipo'
                  label='Sub-Tipo'
                  component={ InputRF }
                  componentClass='select'
                  validate={ requiredOption }
                  type='text'
                />
            </Col>
        </Row>
    );
}

export default CabeceraForm;
