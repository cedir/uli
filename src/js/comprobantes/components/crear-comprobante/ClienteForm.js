import React from 'react';
import { Field } from 'redux-form';
import { Row, Col, Button, ButtonToolbar, FormGroup } from 'react-bootstrap/dist/react-bootstrap';
import InputRF from '../../../utilities/InputRF';
import { required, alpha } from '../../../utilities/reduxFormValidators';

function ClienteForm() {
    const tiposDocumento = ['DNI', 'CUIT', 'CUIL'];
    const tiposCondicionFiscal = ['RESPONSABLE INSCRIPTO', 'EXENTO', 'CONSUMIDOR FINAL'];
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
                  validate={ required }
                  type='text'
                />
                <Field
                  name='domicilioCliente'
                  label='Domicilio'
                  component={ InputRF }
                  validate={ required }
                  type='text'
                />
            </Col>
            <Col md={ 6 }>
                <Field
                  name='dni'
                  label='DNI'
                  component={ InputRF }
                  validate={ required }
                  type='text'
                />
            </Col>
            <Col md={ 3 }>
                <Field
                  name='tipoDocumento'
                  label='Tipo de documento'
                  component={ InputRF }
                  componentClass='select'
                  selectOptions={ tiposDocumento }
                  validate={ alpha }
                  customErrorMsg='Debe seleccionar una opcion'
                  type='text'
                />
            </Col>
            <Col md={ 3 }>
                <Field
                  name='condicionFiscal'
                  label='Condicion fiscal'
                  component={ InputRF }
                  componentClass='select'
                  selectOptions={ tiposCondicionFiscal }
                  validate={ alpha }
                  customErrorMsg='Debe seleccionar una opcion'
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
