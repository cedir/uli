import React from 'react';
import PropTypes from 'prop-types';
import { Col, FormGroup, ButtonToolbar, Button } from 'react-bootstrap';

function ClienteTipoSelect({ tipoCliente, setTipoCliente }) {
    const paciente = 1;
    const obraSocial = 2;
    return (
        <Col md={ 6 }>
            <FormGroup>
                <ButtonToolbar>
                    <Button
                      onClick={ () => setTipoCliente(paciente) }
                      className={ tipoCliente === paciente && 'active' }
                    >
                        Paciente
                    </Button>
                    <Button
                      onClick={ () => setTipoCliente(obraSocial) }
                      className={ tipoCliente === obraSocial && 'active' }
                    >
                        Obra Social
                    </Button>
                </ButtonToolbar>
            </FormGroup>
        </Col>
    );
}

const { number, func } = PropTypes;

ClienteTipoSelect.propTypes = {
    tipoCliente: number.isRequired,
    setTipoCliente: func.isRequired,
};

export default ClienteTipoSelect;
