import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import DefaultModal from './DefaultModal';
import PorcentajeDescontadoModal from './PorcentajeDescontadoModal';


function BotonesCobrar() {
    const [showModal, setShowModal] = useState(false);
    const [tituloModal, setTituloModal] = useState('');
    const [modalBody, setModalBody] = useState(() => () => {});
    const [modalSize, setModalSize] = useState('');

    const showPorcentajeModal = () => {
        setTituloModal('Porcentaje descontado');
        setShowModal(true);
        setModalBody(() => PorcentajeDescontadoModal);
        setModalSize('large');
    };

    return (
        <React.Fragment>
            <DefaultModal
              modalOpened={ showModal }
              titulo={ tituloModal }
              modalBody={ modalBody }
              handleClose={ () => setShowModal(false) }
              modalSize={ modalSize }
            />
            <div className='tab-navigator'>
                <nav className='tabs' style={ { marginTop: '2rem' } }>
                    <Button
                      role='button'
                      style={ { width: '18rem' } }
                      bsStyle='primary'
                      onClick={ showPorcentajeModal }
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
        </React.Fragment>
    );
}

export default BotonesCobrar;
