import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonToolbar, FormGroup, Checkbox } from 'react-bootstrap';
import { config } from '../../../app/config';

function BotonesForm({ valid, cae, lockComprobante, viewMode, openModal }) {
    const [leyenda, setLeyenda] = useState(false);
    const [leyendaMonotributo, setLeyendaMonotributo] = useState(false);
    return (
        <FormGroup>
            {cae && (<React.Fragment>
                <Checkbox onClick={ () => setLeyenda(!leyenda) }>
                    Incluir leyenda
                </Checkbox>
                <Checkbox onClick={ () => setLeyendaMonotributo(!leyendaMonotributo) }>
                    Incluir leyenda para monotributistas
                </Checkbox>
                </React.Fragment>

            )}
            <ButtonToolbar>
                {!viewMode &&
                    <Button
                      bsStyle='primary'
                      onClick={ openModal }
                      disabled={ !valid || lockComprobante }
                    >
                        Crear comprobante
                    </Button>
                }
                <Button
                  bsStyle='primary'
                  onClick={ () => window.open(`${config.baseUrl}/comprobante/imprimir/${cae}/?${leyenda ? 'leyenda&' : ''}${leyendaMonotributo ? 'monotributista=True' : ''}`) }
                  disabled={ !cae }
                >
                    Imprimir
                </Button>
            </ButtonToolbar>
        </FormGroup>
    );
}

const { bool, string, func } = PropTypes;

BotonesForm.propTypes = {
    valid: bool.isRequired,
    cae: string,
    lockComprobante: bool.isRequired,
    viewMode: bool.isRequired,
    openModal: func.isRequired,
};

export default BotonesForm;
