import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

function BotonesTitulo({ resetImportes, desactivar }) {
    return (
        <Button
          onClick={ resetImportes }
          style={ { marginTop: '2rem' } }
          className='pull-right'
          disabled={ desactivar }
        >
            Reset importes
        </Button>
    );
}

const { func, bool } = PropTypes;

BotonesTitulo.propTypes = {
    resetImportes: func.isRequired,
    desactivar: bool.isRequired,
};

export default BotonesTitulo;
