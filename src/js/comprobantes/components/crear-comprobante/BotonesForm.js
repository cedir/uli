import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonToolbar, FormGroup, Checkbox } from 'react-bootstrap';
import { config } from '../../../app/config';

function BotonesForm({ valid, cae, apiLoading, lockComprobante, viewMode }) {
    const [leyenda, setLeyenda] = useState(false);
    return (
        <FormGroup>
            {cae && (
                <Checkbox onClick={ () => setLeyenda(!leyenda) }>
                    Incluir leyenda
                </Checkbox>
            )}
            <ButtonToolbar>
                {!viewMode &&
                    <Button
                      type='submit'
                      bsStyle='primary'
                      disabled={ !valid || apiLoading || lockComprobante }
                    >
                        Crear comprobante
                    </Button>
                }
                <Button
                  bsStyle='primary'
                  onClick={ () => window.open(`${config.baseUrl}/comprobante/imprimir/${cae}/${leyenda ? '?leyenda' : ''}`) }
                  disabled={ !cae }
                >
                    Imprimir
                </Button>
            </ButtonToolbar>
        </FormGroup>
    );
}

const { bool, string } = PropTypes;

BotonesForm.propTypes = {
    valid: bool.isRequired,
    cae: string,
    apiLoading: bool.isRequired,
    lockComprobante: bool.isRequired,
    viewMode: bool.isRequired,
};

export default BotonesForm;
