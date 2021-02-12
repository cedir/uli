import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImporteModal from '../../../../comprobantes/components/ImporteComprobanteAsociado';
import DefaultModal from '../../../../utilities/components/DefaultModal';
import CobrarModal from '../modals/cobrar/CobrarModal';
import CobrarModalFooter from '../modals/cobrar/CobrarModalFooter';
import ComprobanteModal from '../modals/comprobante/ComprobanteModal';
import DiferenciaCobradaModal from '../modals/diferencia-cobrada/DiferenciaCobradaModal';
import DiferenciaCobradaFooter from '../modals/diferencia-cobrada/DiferenciaCobradaFooter';
import PorcentajeDescontadoModal from '../modals/porcentaje/PorcentajeDescontadoModal';
import {
    DESCONTAR_A_ESTUDIOS,
    COBRAR_PRESENTACION,
    } from '../../actionTypes';

function ModalHandler({
    modalName,
    setModalName,
    comprobante,
    descontarGeneral,
    estudios,
    retencionImpositiva,
    cobrarPresentacion,
    idPresentacion,
    diferenciaCobrada,
    nroRecibo,
    cargando,
    cobrada,
}) {
    const { gravado } = comprobante;
    const porcentaje = 1 + (Number(gravado ? gravado.porcentaje : 0) / 100);
    const diferenciaConIva = Math.round(diferenciaCobrada * porcentaje * 100) / 100;

    const [showModal, setShowModal] = useState(false);
    const [tituloModal, setTituloModal] = useState('');
    const [modalBody, setModalBody] = useState(() => () => {});
    const [modalFooter, setModalFooter] = useState(() => () => {});
    const [childProps, setChildProps] = useState({});
    const [showAsociadoModal, setShowAsociadoModal] = useState(false);

    useEffect(() => {
        if (modalName) {
            switch (modalName) {
                case 'porcentaje':
                    showPorcentajeModal();
                    break;
                case 'comprobante':
                    showComprobanteModal();
                    break;
                case 'cobrar':
                    showCobrarModal();
                    break;
                default:
                    return;
            }
            setShowModal(true);
        }
    }, [modalName]);

    useEffect(() => {
        if (Math.abs(diferenciaCobrada) > 1) {
            showDiferenciaCobradaModal();
            setShowModal(true);
        }
    }, [diferenciaCobrada]);

    const showPorcentajeModal = () => {
        setTituloModal('Porcentaje descontado');
        setModalBody(() => PorcentajeDescontadoModal);
        setChildProps({ descontarGeneral, handleModalClose });
    };

    const showComprobanteModal = () => {
        setTituloModal('Comprobante');
        setModalBody(() => ComprobanteModal);
        setChildProps({ comprobante });
    };

    const showCobrarModal = () => {
        setTituloModal('Cobrar presentacion');
        setModalBody(() => CobrarModal);
        setModalFooter(() => CobrarModalFooter);
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
        setModalBody(() => DiferenciaCobradaModal);
        setModalFooter(() => DiferenciaCobradaFooter);
        setChildProps({ diferenciaConIva, diferenciaCobrada, crearAsociado, gravado });
    };

    const handleModalClose = () => {
        setShowModal(false);
        setModalBody(() => () => {});
        setModalFooter(() => () => {});
        setTituloModal('');
        setChildProps({});
        setModalName('');
    };

    useEffect(() => handleModalClose, []);

    return (
        <React.Fragment>
            {showAsociadoModal && (
                <ImporteModal
                  modalOpened={ showAsociadoModal }
                  setShowImporteModal={ setShowAsociadoModal }
                  idComprobante={ comprobante.id || 0 }
                  importeDefault={ diferenciaCobrada }
                />
            )}
            {!showAsociadoModal && (
                <DefaultModal
                  modalOpened={ showModal }
                  titulo={ tituloModal }
                  modalBody={ modalBody }
                  handleClose={ handleModalClose }
                  modalSize={ 'large' }
                  modalFooter={ modalFooter }
                  childProps={ { cargando, cobrada, ...childProps } }
                />
            )}
        </React.Fragment>
    );
}

const { string, func, object, array, number, bool } = PropTypes;

ModalHandler.propTypes = {
    modalName: string.isRequired,
    setModalName: func.isRequired,
    comprobante: object,
    descontarGeneral: func.isRequired,
    estudios: array.isRequired,
    retencionImpositiva: number.isRequired,
    cobrarPresentacion: func.isRequired,
    idPresentacion: number.isRequired,
    diferenciaCobrada: number.isRequired,
    nroRecibo: string.isRequired,
    cargando: bool.isRequired,
    cobrada: bool.isRequired,
};

function mapStateToProps(state) {
    return {
        comprobante: state.cobrarPresentacionReducer.comprobante,
        estudios: state.cobrarPresentacionReducer.estudios,
        idPresentacion: state.cobrarPresentacionReducer.id,
        diferenciaCobrada: state.cobrarPresentacionReducer.diferenciaCobrada,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        descontarGeneral: porcentaje => dispatch({ type: DESCONTAR_A_ESTUDIOS, porcentaje }),
        cobrarPresentacion: (idPresentacion, estudios, nroRecibo, retencionImpositiva) =>
            dispatch({
                type: COBRAR_PRESENTACION,
                idPresentacion,
                estudios,
                nroRecibo,
                retencionImpositiva,
            }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalHandler);
