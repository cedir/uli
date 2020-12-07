import React from 'react';
import { Button, FormControl, FormGroup, Form, InputGroup } from 'react-bootstrap';

function PorcentajeDescontadoModal() {
    return (
        <React.Fragment>
            <Form inline>
                <FormGroup>
                    <InputGroup>
                        <FormControl type='number' />
                        <InputGroup.Addon>%</InputGroup.Addon>
                    </InputGroup>
                </FormGroup>{' '}
                <Button bsStyle='primary'>Aplicar</Button>
            </Form>
        </React.Fragment>
    );
}

export default PorcentajeDescontadoModal;
