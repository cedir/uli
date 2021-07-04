import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, Button } from 'react-bootstrap/dist/react-bootstrap';

function EstudiosActionBar({
    history,
    setModalOpened,
    fromCaja,
}) {
    const goToCreateEstudio = () => {
        history.push('/estudios/create');
    };

    return (
        <ButtonToolbar>
            <Button
              onClick={ () => setModalOpened(true) }
            >
                Buscar estudio
            </Button>
            { !fromCaja && <Button
              onClick={ () => console.log('click') }
            >
                Imprimir
            </Button>}
            { !fromCaja && <Button
              bsStyle='primary'
              onClick={ goToCreateEstudio }
            >
                Agregar estudio
            </Button>}
        </ButtonToolbar>
    );
}

const { func, object, bool } = PropTypes;

EstudiosActionBar.propTypes = {
    history: object.isRequired,
    setModalOpened: func.isRequired,
    fromCaja: bool.isRequired,
};

export default EstudiosActionBar;
