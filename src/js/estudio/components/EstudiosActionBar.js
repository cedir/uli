import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useReactToPrint } from 'react-to-print';
import { ButtonToolbar, Button } from 'react-bootstrap/dist/react-bootstrap';

function EstudiosActionBar({
    history,
    setModalOpened,
    estudiosRef,
    showMedicoSolicitante,
    setShowMedicoSolicitante,
}) {
    const onBeforeGetContentResolve = useRef(Promise.resolve);
    const goToCreateEstudio = () => {
        history.push('/estudios/create');
    };

    const estudiosContent = useCallback(
        () => estudiosRef.current,
        [estudiosRef.current],
    );

    const handlePrint = useReactToPrint({
        content: estudiosContent,
        onBeforeGetContent: () => new Promise((resolve) => {
            onBeforeGetContentResolve.current = resolve;
            setShowMedicoSolicitante(false);
            resolve();
        }),
        onAfterPrint: () => {
            setShowMedicoSolicitante(true);
        },
        removeAfterPrint: true,
    });

    useEffect(() => {
        if (!showMedicoSolicitante && typeof onBeforeGetContentResolve.current === 'function') {
            onBeforeGetContentResolve.current();
        }
    }, [onBeforeGetContentResolve.current, showMedicoSolicitante]);

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

const { func, object, bool } = PropTypes;

EstudiosActionBar.propTypes = {
    history: object.isRequired,
    setModalOpened: func.isRequired,
    estudiosRef: object,
    showMedicoSolicitante: bool.isRequired,
    setShowMedicoSolicitante: func.isRequired,
};

export default EstudiosActionBar;
