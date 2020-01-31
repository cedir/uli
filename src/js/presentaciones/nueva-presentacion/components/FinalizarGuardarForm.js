import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row } from 'react-bootstrap';

/* eslint-disable no-console */

function FinalizarGuardarForm(props) {
    const {
        periodoValue,
        onChangePeriodoValue,
    } = props;

    return (
        <form>
            <div className='box'>
                <Row>
                    <strong>Periodo de la presentacion:</strong>
                </Row>
                <Row>
                    <input
                      type='text'
                      name='periodo'
                      value={ periodoValue }
                      onChange={ onChangePeriodoValue }
                    />
                </Row>
                <Row>
                    <Button
                      bsStyle='primary'
                      type='submit'
                    >
                        Finalizar
                    </Button>
                    <Button
                      bsStyle='primary'
                      type='submit'
                    >
                        Guardar
                    </Button>
                </Row>
            </div>
        </form>
    );
}

const { string, func } = PropTypes;

FinalizarGuardarForm.propTypes = {
    periodoValue: string.isRequired,
    onChangePeriodoValue: func.isRequired,
};

export default FinalizarGuardarForm;
