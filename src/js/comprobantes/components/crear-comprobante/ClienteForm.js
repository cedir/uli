import React from 'react';
import { Field } from 'redux-form';
import { Row, Col, Button, ButtonToolbar, FormGroup } from 'react-bootstrap/dist/react-bootstrap';
import InputRF from '../../../utilities/InputRF';
import { required, alpha, dniOrCuit } from '../../../utilities/reduxFormValidators';
import { normalizeDniCuit } from '../../../utilities/reduxFormNormalizers';

function ClienteForm() {
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
                  validate={ [required, dniOrCuit] }
                  type='text'
                  normalize={ normalizeDniCuit }
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
