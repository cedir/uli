import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useReactToPrint } from 'react-to-print';
import { ButtonToolbar, Button } from 'react-bootstrap/dist/react-bootstrap';

function EstudiosActionBar({
    history,
    setModalOpened,
    estudiosRef,
    setPrintMode,
    printMode,
    fromCaja,
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
            setPrintMode(true);
            resolve();
        }),
        onAfterPrint: () => {
            setPrintMode(false);
        },
        removeAfterPrint: true,
    });

    useEffect(() => {
        if (printMode && typeof onBeforeGetContentResolve.current === 'function') {
            onBeforeGetContentResolve.current();
        }
    }, [onBeforeGetContentResolve.current, printMode]);
    return (
        <ButtonToolbar>
            <Button
              onClick={ () => setModalOpened(true) }
            >
                Buscar estudio
            </Button>
            { !fromCaja && <Button
              onClick={ handlePrint }
            >
                Imprimir
            </Button>}
            {/* imprimir tira error si no hay estudios */}
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
    estudiosRef: object,
    setPrintMode: func.isRequired,
    printMode: bool.isRequired,
    fromCaja: bool.isRequired,
};

export default EstudiosActionBar;
