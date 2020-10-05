import React from 'react';
import { Field } from 'redux-form';
import { Row, Col, Button, ButtonToolbar, FormGroup } from 'react-bootstrap/dist/react-bootstrap';
import InputRF from '../../../utilities/InputRF';
import { requiredOption } from '../../../utilities/reduxFormValidators';

function ClienteForm() {
    return (
        <Row>
            <Col md={ 6 }>
                <FormGroup>
                    <ButtonToolbar>
                        <Button>Paciente</Button>
                        <Button>Obra Social</Button>
                    </ButtonToolbar>
                </FormGroup>
            </Col>
            <Col md={ 8 }>
                <Field
                  name='nombreCliente'
                  label='Nombre'
                  component={ InputRF }
                  validate={ requiredOption }
                  type='text'
                />
                <Field
                  name='domicilioCliente'
                  label='Domicilio'
                  component={ InputRF }
                  validate={ requiredOption }
                  type='text'
                />
            </Col>
            <Col md={ 6 }>
                <Field
                  name='dni'
                  label='DNI'
                  component={ InputRF }
                  validate={ requiredOption }
                  type='text'
                />
            </Col>
            <Col md={ 3 }>
                <Field
                  name='tipoDocumento'
                  label='Tipo de documento'
                  component={ InputRF }
                  componentClass='select'
                  validate={ requiredOption }
                  type='text'
                />
            </Col>
            <Col md={ 3 }>
                <Field
                  name='condicionFiscal'
                  label='Condicion fiscal'
                  component={ InputRF }
                  componentClass='select'
                  validate={ requiredOption }
                  type='text'
                />
            </Col>
        </Row>
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
