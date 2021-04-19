import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonToolbar } from 'react-bootstrap';

function BotonesForm({
    valid,
    selectEstudio,
    estudioAsociado,
    asociarEstudio,
    style,
    goBack,
}) {
    return (
        <ButtonToolbar style={ style }>
            <Button
              type='submit'
              bsStyle='primary'
              disabled={ !valid }
              onClick={ () => goBack() }
            >
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
    style: object.isRequired,
    goBack: func.isRequired,
};

export default BotonesForm;
