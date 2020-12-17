import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, Col, Well, Row, FormGroup, InputGroup, FormControl } from 'react-bootstrap';
import DefaultModal from '../../../utilities/components/DefaultModal';
import PorcentajeDescontadoModal from './modals/porcentaje/PorcentajeDescontadoModal';
import ComprobanteModal from './modals/comprobante/ComprobanteModal';
import CobrarModal from './modals/cobrar/CobrarModal';
import CobrarModalFooter from './modals/cobrar/CobrarModalFooter';
import { DESCONTAR_A_ESTUDIOS } from '../actionTypes';
import DiferenciaCobradaModal from './modals/diferencia-cobrada/DiferenciaCobradaModal';
import DiferenciaCobradaFooter from './modals/diferencia-cobrada/DiferenciaCobradaFooter';
import ImporteModal from '../../../comprobantes/components/ImporteComprobanteAsociado';

function BotonesCobrar({
    estudios,
    comprobante,
    retencionImpositiva,
    descontarGeneral,
    cargando,
    cobrarPresentacion,
    idPresentacion,
    cobrada,
    diferenciaCobrada,
}) {
    const [showModal, setShowModal] = useState(false);
    const [tituloModal, setTituloModal] = useState('');
    const [modalBody, setModalBody] = useState(() => () => {});
    const [modalSize, setModalSize] = useState('small');
    const [modalFooter, setModalFooter] = useState(() => () => {});
    const [childProps, setChildProps] = useState({});
    const [nroRecibo, setNroRecibo] = useState('');
    const [showAsociadoModal, setShowAsociadoModal] = useState(false);

    const showPorcentajeModal = () => {
        setTituloModal('Porcentaje descontado');
        setShowModal(true);
        setModalBody(() => PorcentajeDescontadoModal);
        setModalSize('large');
        setChildProps({ descontarGeneral, handleModalClose });
    };

    const showComprobanteModal = () => {
        setTituloModal('Comprobante');
        setShowModal(true);
        setModalBody(() => ComprobanteModal);
        setModalSize('large');
        setChildProps({ comprobante });
    };

    const showCobrarModal = () => {
        setTituloModal('Cobrar presentacion');
        setShowModal(true);
        setModalBody(() => CobrarModal);
        setModalFooter(() => CobrarModalFooter);
        setModalSize('large');
        setChildProps({
            estudios,
            retencionImpositiva,
            nroRecibo,
            cobrarPresentacion,
            idPresentacion,
        });
    };

    const crearAsociado = () => {
        handleModalClose();
        setShowAsociadoModal(true);
    };

    const showDiferenciaCobradaModal = () => {
        setTituloModal('Diferencia cobrada');
        setShowModal(true);
        setModalBody(() => DiferenciaCobradaModal);
        setModalFooter(() => DiferenciaCobradaFooter);
        setModalSize('large');
        setChildProps({ diferenciaCobrada, crearAsociado });
    };

    const handleModalClose = () => {
        setShowModal(false);
        setModalBody(() => () => {});
        setModalFooter(() => () => {});
        setTituloModal('');
        setChildProps({});
    };

    const styles = {
        porcentajeButton: { width: '18rem' },
        comprobanteButton: { width: '15rem' },
        inlineForm: { marginTop: '.5rem' },
        formGroup: { marginLeft: '1rem', marginTop: '2rem' },
        well: { marginBottom: '0rem', marginTop: '1rem' },
    };

    useEffect(() => {
        if (Math.abs(diferenciaCobrada) > 1) {
            showDiferenciaCobradaModal();
        }
    }, [diferenciaCobrada]);

    return (
        <React.Fragment>
            <ImporteModal
              modalOpened={ showAsociadoModal }
              setShowImporteModal={ setShowAsociadoModal }
              idComprobante={ comprobante.id || 0 }
              importeDefault={ diferenciaCobrada }
            />
            {!showAsociadoModal &&
                <DefaultModal
                  modalOpened={ showModal }
                  titulo={ tituloModal }
                  modalBody={ modalBody }
                  handleClose={ handleModalClose }
                  modalSize={ modalSize }
                  modalFooter={ modalFooter }
                  childProps={ childProps }
                />
            }
            <Row className='tab-navigator'>
                <Col md={ 10 }>
                    <ButtonGroup className='tabs' style={ { marginTop: '2rem' } }>
                        <Button
                          disabled={ cargando || cobrada }
                          role='button'
                          style={ styles.porcentajeButton }
                          bsStyle='primary'
                          onClick={ showPorcentajeModal }
                          className='primero'
                        >
                            Porcentaje descontado
                        </Button>
                        <Button
                          disabled={ cargando }
                          role='button'
                          style={ styles.comprobanteButton }
                          bsStyle='primary'
                          onClick={ showComprobanteModal }
                        >
                            Ver Comprobante
                        </Button>
                        <Button
                          disabled={ cargando || cobrada }
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
                                <FormControl
                                  type='text'
                                  value={ nroRecibo }
                                  onChange={ e => setNroRecibo(e.target.value) }
                                />
                            </InputGroup>
                        </FormGroup>
                    </span>
                </Col>
                <Col md={ 2 } >
                    <Well bsSize='small' style={ styles.well }>
                        Retencion impositiva: {retencionImpositiva} - {retencionImpositiva === 32 ? 'AMR' : 'Directa'}
                    </Well>
                </Col>
            </Row>
        </React.Fragment>
    );
}

const { object, number, func, bool, array } = PropTypes;

BotonesCobrar.propTypes = {
    comprobante: object.isRequired,
    retencionImpositiva: number.isRequired,
    descontarGeneral: func.isRequired,
    cargando: bool.isRequired,
    estudios: array.isRequired,
    cobrarPresentacion: func.isRequired,
    idPresentacion: number.isRequired,
    cobrada: bool.isRequired,
    diferenciaCobrada: number.isRequired,
};

function mapStateToProps(state) {
    const { se_presenta_por_AMR: AMR } = state.cobrarPresentacionReducer.obraSocial;
    const retencionImpositiva = Number(AMR) ? 32 : 25;
    return {
        comprobante: state.cobrarPresentacionReducer.comprobante,
        retencionImpositiva,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        descontarGeneral: porcentaje => dispatch({ type: DESCONTAR_A_ESTUDIOS, porcentaje }),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BotonesCobrar));
