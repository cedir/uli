import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, Button } from 'react-bootstrap/dist/react-bootstrap';

function EstudiosActionBar({ history, setModalOpened }) {
    const goToCreateEstudio = () => {
        history.push('/estudios/create');
    };

    return (
        <ButtonToolbar>
            <Button
              onClick={ () => setModalOpened(true) }
            >
                Buscar estudio</Button>
            <Button
              bsStyle='primary'
              onClick={ goToCreateEstudio }
            >
                Agregar estudio
            </Button>
        </ButtonToolbar>
    );
}

const { func, object } = PropTypes;

EstudiosActionBar.propTypes = {
    history: object.isRequired,
    setModalOpened: func.isRequired,
};

export default EstudiosActionBar;
