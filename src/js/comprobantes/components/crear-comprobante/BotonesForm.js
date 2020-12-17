import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonToolbar, FormGroup, Checkbox } from 'react-bootstrap';
import { config } from '../../../app/config';

function BotonesForm({ valid, cae }) {
    const [leyenda, setLeyenda] = useState(false);
    return (
        <FormGroup>
            {cae && (
                <Checkbox onClick={ () => setLeyenda(!leyenda) }>
                    Incluir leyenda
                </Checkbox>
            )}
            <ButtonToolbar>
                <Button type='submit' bsStyle='primary' disabled={ !valid }>
                    Crear comprobante
                </Button>
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
    cae: string.isRequired,
};

export default BotonesForm;