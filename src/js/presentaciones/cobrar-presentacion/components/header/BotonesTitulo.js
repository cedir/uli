import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

function BotonesTitulo({
    resetImportes,
    refacturarEstudios,
    desactivar,
    estudiosRefacturar,
    idPresentacion,
}) {
    return (
        <React.Fragment>
            <Button
              onClick={ () => refacturarEstudios(idPresentacion, estudiosRefacturar) }
              style={ { marginTop: '2rem' } }
              className='pull-right'
              disabled={ desactivar || estudiosRefacturar.length === 0 }
            >
              Refacturar
            </Button>
            <Button
              onClick={ resetImportes }
              style={ { marginTop: '2rem', marginRight: '1rem' } }
              className='pull-right'
              disabled={ desactivar }
            >
                Reset importes
            </Button>
        </React.Fragment>
    );
}

const { func, bool, number, array } = PropTypes;

BotonesTitulo.propTypes = {
    resetImportes: func.isRequired,
    desactivar: bool.isRequired,
    refacturarEstudios: func.isRequired,
    estudiosRefacturar: array,
    idPresentacion: number.isRequired,
};

export default BotonesTitulo;
