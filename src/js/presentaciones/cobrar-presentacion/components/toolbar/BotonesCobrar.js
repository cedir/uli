import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import ModalHandler from './ModalHandler';

function BotonesCobrar({ cargando, cobrada, nroRecibo, retencionImpositiva }) {
    const [modalName, setModalName] = useState('');
    const styles = {
        porcentajeButton: { width: '18rem' },
        comprobanteButton: { width: '15rem' },
    };
    return (
        <React.Fragment>
            <ModalHandler
              modalName={ modalName }
              setModalName={ setModalName }
              retencionImpositiva={ retencionImpositiva }
              nroRecibo={ nroRecibo }
            />
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
        </React.Fragment>
    );
}

const { bool, string, number } = PropTypes;

BotonesCobrar.propTypes = {
    cargando: bool.isRequired,
    cobrada: bool.isRequired,
    nroRecibo: string.isRequired,
    retencionImpositiva: number.isRequired,
};

function mapStateToProps(state) {
    return {
        cobrada: state.cobrarPresentacionReducer.cobrada,
    };
}

export default connect(mapStateToProps)(BotonesCobrar);
