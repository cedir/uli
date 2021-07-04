import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, Button } from 'react-bootstrap/dist/react-bootstrap';
import { createSearchQueryString } from '../api';
import { config } from '../../app/config';

function EstudiosActionBar({
    history,
    setModalOpened,
    fromCaja,
    searchParams,
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
              onClick={ () => window.open(`${config.baseUrl}/api/estudio/imprimir_listado${createSearchQueryString(searchParams)}`) }
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
    searchParams: object.isRequired,
};

export default EstudiosActionBar;
