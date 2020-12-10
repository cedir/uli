import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, FormControl, FormGroup, Form, InputGroup } from 'react-bootstrap';

function PorcentajeDescontadoModal({ descontarGeneral, handleModalClose }) {
    const [porcentaje, setPorcentaje] = useState(0);

    const handleAplicar = () => {
        descontarGeneral(porcentaje);
        handleModalClose();
    };

    return (
        <React.Fragment>
            <Form inline>
                <FormGroup>
                    <InputGroup>
                        <FormControl
                          type='number'
                          value={ porcentaje }
                          onChange={ e => setPorcentaje(e.target.value) }
                        />
                        <InputGroup.Addon>%</InputGroup.Addon>
                    </InputGroup>
                </FormGroup>{' '}
                <Button bsStyle='primary' onClick={ handleAplicar }>
                    Aplicar
                </Button>
            </Form>
        </React.Fragment>
    );
}

const { func } = PropTypes;

PorcentajeDescontadoModal.propTypes = {
    descontarGeneral: func.isRequired,
    handleModalClose: func.isRequired,
};

export default PorcentajeDescontadoModal;
