import React from 'react';
import { Button } from 'react-bootstrap';

function BotonesCobrar() {
    return (
        <div className='tab-navigator'>
            <nav className='tabs' style={ { marginTop: '2rem' } }>
                <Button
                  role='button'
                  style={ { width: '18rem' } }
                  bsStyle='primary'
                  className='primero'
                >
                    Porcentaje descontado
                </Button>
                <Button
                  role='button'
                  style={ { width: '15rem' } }
                  bsStyle='primary'
                >
                    Ver Comprobante
                </Button>
                <Button role='button' bsStyle='primary' className='ultimo'>
                    Cobrar
                </Button>
            </nav>
        </div>
    );
}

export default BotonesCobrar;
