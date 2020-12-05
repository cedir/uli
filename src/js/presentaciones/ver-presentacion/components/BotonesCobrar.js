import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import DefaultModal from './DefaultModal';
import PorcentajeDescontadoModal from './PorcentajeDescontadoModal';
import ComprobanteModal from './ComprobanteModal';
import CobrarModal from './CobrarModal';
import CobrarModalFooter from './CobrarModalFooter';

function BotonesCobrar() {
    const [showModal, setShowModal] = useState(false);
    const [tituloModal, setTituloModal] = useState('');
    const [modalBody, setModalBody] = useState(() => () => {});
    const [modalSize, setModalSize] = useState('small');
    const [modalFooter, setModalFooter] = useState(() => () => {});

    const showPorcentajeModal = () => {
        setTituloModal('Porcentaje descontado');
        setShowModal(true);
        setModalBody(() => PorcentajeDescontadoModal);
        setModalSize('large');
    };

    const showComprobanteModal = () => {
        setTituloModal('Comprobante');
        setShowModal(true);
        setModalBody(() => ComprobanteModal);
        setModalSize('large');
    };

    const showCobrarModal = () => {
        setTituloModal('Cobrar presentacion');
        setShowModal(true);
        setModalBody(() => CobrarModal);
        setModalFooter(() => CobrarModalFooter);
        setModalSize('large');
    };

    const handleModalClose = () => {
        setShowModal(false);
        setModalBody(() => () => {});
        setModalFooter(() => () => {});
        setTituloModal('');
    };

    return (
        <React.Fragment>
            <DefaultModal
              modalOpened={ showModal }
              titulo={ tituloModal }
              modalBody={ modalBody }
              handleClose={ handleModalClose }
              modalSize={ modalSize }
              modalFooter={ modalFooter }
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
                      onClick={ showComprobanteModal }
                    >
                        Ver Comprobante
                    </Button>
                    <Button
                      role='button'
                      bsStyle='primary'
                      className='ultimo'
                      onClick={ showCobrarModal }
                    >
                        Cobrar
                    </Button>
                </nav>
            </div>
        </React.Fragment>
    );
}

export default BotonesCobrar;
