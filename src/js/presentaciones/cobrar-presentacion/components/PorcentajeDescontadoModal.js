import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, FormControl, FormGroup, Form, InputGroup, HelpBlock } from 'react-bootstrap';

function PorcentajeDescontadoModal({ descontarGeneral, handleModalClose }) {
    const [porcentaje, setPorcentaje] = useState(1);

    const porcentajeIsValid = () => porcentaje >= 1 && porcentaje <= 100;

    const handleAplicar = () => {
        if (porcentajeIsValid()) {
            descontarGeneral(porcentaje);
            handleModalClose();
        }
    };

    const getValidationState = () => {
        if (porcentajeIsValid()) {
            return 'success';
        }
        return 'error';
    };

    return (
        <React.Fragment>
            <Form inline>
                <FormGroup validationState={ getValidationState() }>
                    <InputGroup>
                        <FormControl
                          type='number'
                          value={ porcentaje }
                          onChange={ e => setPorcentaje(e.target.value) }
                        />
                        <InputGroup.Addon>%</InputGroup.Addon>
                    </InputGroup>
                    { !porcentajeIsValid() &&
                        <HelpBlock>
                            El porcentaje debe estar entre 1 y 100
                        </HelpBlock>
                    }
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
