import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useReactToPrint } from 'react-to-print';
import { ButtonToolbar, Button } from 'react-bootstrap/dist/react-bootstrap';

function EstudiosActionBar({ history, setModalOpened, estudiosRef }) {
    const goToCreateEstudio = () => {
        history.push('/estudios/create');
    };

    const estudiosContent = useCallback(
        () => estudiosRef.current,
        [estudiosRef.current],
    );

    const handlePrint = useReactToPrint({
        content: estudiosContent,
        removeAfterPrint: true,
    });

    return (
        <ButtonToolbar>
            <Button
              onClick={ () => setModalOpened(true) }
            >
                Buscar estudio
            </Button>
            <Button
              onClick={ handlePrint }
            >
                Imprimir
            </Button>
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
    estudiosRef: object,
};

export default EstudiosActionBar;
