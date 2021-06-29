import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

function BotonesMedicacionFooter({ handlePrint, removeMedicacion, apiLoading, medicacion }) {
    if (!medicacion) {
        return <React.Fragment />;
    }

    return (
        <React.Fragment>
            <Button bsStyle='primary' onClick={ handlePrint } disabled={ apiLoading }>
                Imprimir medicación
            </Button>{' '}
            <Button bsStyle='danger' onClick={ removeMedicacion } disabled={ apiLoading }>
                Eliminar medicación
            </Button>
        </React.Fragment>
    );
}

const { func, bool, number } = PropTypes;

BotonesMedicacionFooter.propTypes = {
    handlePrint: func.isRequired,
    removeMedicacion: func.isRequired,
    apiLoading: bool.isRequired,
    medicacion: number.isRequired,
};

export default BotonesMedicacionFooter;
