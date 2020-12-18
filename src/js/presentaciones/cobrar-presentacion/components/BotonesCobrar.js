import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Button } from 'react-bootstrap';

function BotonesCobrar({ cargando, cobrada, setModalName }) {
    const styles = {
        porcentajeButton: { width: '18rem' },
        comprobanteButton: { width: '15rem' },
    };
    return (
        <ButtonGroup className='tabs' style={ { marginTop: '2rem' } }>
            <Button
              disabled={ cargando || cobrada }
              role='button'
              style={ styles.porcentajeButton }
              bsStyle='primary'
              onClick={ () => setModalName('porcentaje') }
              className='primero'
            >
                Porcentaje descontado
            </Button>
            <Button
              disabled={ cargando }
              role='button'
              style={ styles.comprobanteButton }
              bsStyle='primary'
              onClick={ () => setModalName('comprobante') }
            >
                Ver Comprobante
            </Button>
            <Button
              disabled={ cargando || cobrada }
              role='button'
              bsStyle='primary'
              className='ultimo'
              onClick={ () => setModalName('cobrar') }
            >
                Cobrar
            </Button>
        </ButtonGroup>
    );
}

const { bool, func } = PropTypes;

BotonesCobrar.propTypes = {
    cargando: bool.isRequired,
    cobrada: bool.isRequired,
    setModalName: func.isRequired,
};

export default BotonesCobrar;
