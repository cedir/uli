import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonToolbar } from 'react-bootstrap';

function BotonesForm({
    selectEstudio,
    estudioAsociado,
    asociarEstudio,
    style,
}) {
    return (
        <ButtonToolbar style={ style }>
            <Button
              type='submit'
              bsStyle='primary'
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

const { func, object } = PropTypes;

BotonesForm.propTypes = {
    selectEstudio: func.isRequired,
    estudioAsociado: object.isRequired,
    asociarEstudio: func.isRequired,
    style: object.isRequired,
};

export default BotonesForm;
