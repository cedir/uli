import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

function DiferenciaCobradaFooter({ crearAsociado }) {
    return (
        <Button
          bsStyle='primary'
          onClick={ () => crearAsociado() }
        >
            Crear comprobante
        </Button>
    );
}

const { func } = PropTypes;

DiferenciaCobradaFooter.propTypes = {
    crearAsociado: func.isRequired,
};

export default DiferenciaCobradaFooter;
