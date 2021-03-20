import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonToolbar } from 'react-bootstrap';

function BotonesForm({
    valid,
    selectEstudio,
    estudioAsociado,
    asociarEstudio,
}) {
    return (
        <ButtonToolbar style={ { marginTop: '20px', marginBottom: '20px' } }>
            <Button type='submit' bsStyle='primary' disabled={ !valid }>
                Crear Movimientos
            </Button>
            <Button
              bsStyle='primary'
              onClick={ selectEstudio }
            >
                    Asociar con Estudio
            </Button>
            { Object.keys(estudioAsociado).length !== 0 && <Button
              onClick={ () => asociarEstudio({}) }
            >
                    Eliminar Estudio
            </Button>}
        </ButtonToolbar>
    );
}

const { func, object, bool } = PropTypes;

BotonesForm.propTypes = {
    valid: bool.isRequired,
    selectEstudio: func.isRequired,
    estudioAsociado: object.isRequired,
    asociarEstudio: func.isRequired,
};

export default BotonesForm;
