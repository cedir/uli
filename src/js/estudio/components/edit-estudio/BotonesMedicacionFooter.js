import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

function BotonesMedicacionFooter({ handlePrint, removeMedicacion }) {
    return (
        <React.Fragment>
            <Button bsStyle='primary' onClick={ handlePrint }>
                Imprimir medicación
            </Button>{' '}
            <Button bsStyle='danger' onClick={ removeMedicacion }>
                Eliminar medicación
            </Button>
        </React.Fragment>
    );
}

const { func } = PropTypes;

BotonesMedicacionFooter.propTypes = {
    handlePrint: func.isRequired,
    removeMedicacion: func.isRequired,
};

export default BotonesMedicacionFooter;
