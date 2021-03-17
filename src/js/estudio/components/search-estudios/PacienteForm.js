import React from 'react';
import { Field } from 'redux-form';
import { Row, Col } from 'react-bootstrap';
import InputRF from '../../../utilities/InputRF';
import { alpha, dni } from '../../../utilities/reduxFormValidators';

function PacienteForm() {
    return (
        <fieldset>
            <legend>Paciente</legend>
            <Row>
                <Col md={ 4 }>
                    <Field
                      name='dniPaciente'
                      type='text'
                      label='dni'
                      validate={ dni }
                      component={ InputRF }
                    />
                </Col>
                <Col md={ 4 }>
                    <Field
                      name='nombrePaciente'
                      type='text'
                      label='Nombre'
                      validate={ alpha }
                      component={ InputRF }
                    />
                </Col>
                <Col md={ 4 }>
                    <Field
                      name='apellidoPaciente'
                      type='text'
                      label='Apellido'
                      validate={ alpha }
                      component={ InputRF }
                    />
                </Col>
            </Row>
        </fieldset>
    );
}

export default PacienteForm;
