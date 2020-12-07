import React, { useState } from 'react';
import { Button, ButtonGroup, Col, Well, Row, FormGroup, InputGroup, FormControl } from 'react-bootstrap';
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

    const styles = {
        porcentajeButton: { width: '18rem' },
        comprobanteButton: { width: '15rem' },
        inlineForm: { marginTop: '.5rem' },
        formGroup: { marginLeft: '1rem', marginTop: '2rem' },
        well: { marginBottom: '0rem', marginTop: '1rem' },
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
            <Row className='tab-navigator'>
                <Col md={ 10 }>
                    <ButtonGroup className='tabs' style={ { marginTop: '2rem' } }>
                        <Button
                          role='button'
                          style={ styles.porcentajeButton }
                          bsStyle='primary'
                          onClick={ showPorcentajeModal }
                          className='primero'
                        >
                            Porcentaje descontado
                        </Button>
                        <Button
                          role='button'
                          style={ styles.comprobanteButton }
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
                    </ButtonGroup>
                    <span className='form-inline' style={ styles.inlineForm }>
                        <FormGroup style={ styles.formGroup }>
                            <InputGroup>
                                <InputGroup.Button>
                                    <Button>Nro. de recibo:</Button>
                                </InputGroup.Button>
                                <FormControl type='text' />
                            </InputGroup>
                        </FormGroup>
                    </span>
                </Col>
                <Col md={ 2 } >
                    <Well bsSize='small' style={ styles.well }>
                        Retencion impositiva: 32% - Directa
                    </Well>
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default BotonesCobrar;
