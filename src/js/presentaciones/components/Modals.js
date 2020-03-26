import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import FinalizarGuardarForm from './FinalizarGuardarForm';
import Comprobante from './Comprobante';
import MedicacionEstudio from './MedicacionEstudio';

export function ModalComprobante(props) {
    const {
        show,
        onClickClose,
        componentState,
    } = props;

    return (
        <Modal show={ show } className='comprobante'>
            <form onSubmit={ e => e.preventDefault() }>
                <Modal.Header>
                    <strong>Comprobante</strong>
                </Modal.Header>
                <Modal.Body>
                    <Comprobante
                      tipoValue={ componentState.tipo }
                      onChangeTipo={ componentState.tipoHandler }
                      subTipoValue={ componentState.subTipo }
                      onChangeSubTipo={ componentState.subTipoHandler }
                      responsableValue={ componentState.responsable }
                      onChangeResponsable={ componentState.responsableHandler }
                      gravadoValue={ componentState.gravado }
                      onChangeGravado={ componentState.gravadoHandler }
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                      bsStyle='danger'
                      onClick={ onClickClose }
                      type='button'
                    >
                        Cerrar
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}
export function ModalMedicacion(props) {
    const { show, onClickClose, onClickDo, estudio } = props;
    return (
        <div className='modal-medicacion-box'>
            <Modal show={ show } className='modal-medicacion'>
                <Modal.Header>
                    <strong>Medicacion</strong>
                </Modal.Header>
                <Modal.Body>
                    <MedicacionEstudio
                      estudio={ estudio }
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                      bsStyle='primary'
                      onClick={ onClickDo }
                      type='button'
                    >
                        Cargar
                    </Button>
                    <Button
                      bsStyle='danger'
                      onClick={ onClickClose }
                      type='button'
                    >
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

function ModalFinalizarGuardar(props) {
    const [periodoValue, setPeriodoValue] = useState('');
    const { show, onClickClose, comprobanteState, fecha } = props;
    const [finalizarButtonDisabled, setFinalizarButtonDisabled] =
    useState(true);
    const [guardarButtonDisabled, setGuardarButtonDisabled] =
    useState(true);
    useEffect(() => {
        if (
            fecha !== '' &&
            comprobanteState.tipo !== '' &&
            comprobanteState.subTipo !== '' &&
            comprobanteState.responsable !== '' &&
            comprobanteState.gravado !== '' &&
            periodoValue !== ''
        ) {
            setFinalizarButtonDisabled(false);
        } else if (
            fecha === '' ||
            comprobanteState.tipo === '' ||
            comprobanteState.subTipo === '' ||
            comprobanteState.responsable === '' ||
            comprobanteState.gravado === '' ||
            periodoValue === ''
        ) {
            setFinalizarButtonDisabled(true);
        }
        if (fecha !== '' && periodoValue !== '') {
            setGuardarButtonDisabled(false);
        } else if (fecha === '' || periodoValue === '') {
            setGuardarButtonDisabled(true);
        }
    });
    return (
        <Modal show={ show } className='finalizar-guardar'>
            <Modal.Header>
                <strong>Finalizar Presentacion</strong>
            </Modal.Header>
            <Modal.Body>
                <FinalizarGuardarForm
                  periodoValue={ periodoValue }
                  onChangePeriodoValue={ e => setPeriodoValue(e.target.value) }
                  comprobanteState={ comprobanteState }
                  finalizarButtonDisabled={ finalizarButtonDisabled }
                  guardarButtonDisabled={ guardarButtonDisabled }
                />
            </Modal.Body>
            <Modal.Footer>
                <Button
                  bsStyle='danger'
                  onClick={ onClickClose }
                  type='button'
                >
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

const { bool, func, object, string } = PropTypes;

function mapStateToProps(state) {
    return {
        fecha: state.estudiosSinPresentarReducer.fecha,
    };
}

ModalComprobante.propTypes = {
    show: bool.isRequired,
    onClickClose: func.isRequired,
    componentState: object.isRequired,
};

ModalFinalizarGuardar.propTypes = {
    show: bool.isRequired,
    onClickClose: func.isRequired,
    comprobanteState: object.isRequired,
    fecha: string.isRequired,
};

ModalMedicacion.propTypes = {
    show: bool.isRequired,
    onClickClose: func.isRequired,
    onClickDo: func.isRequired,
    estudio: object.isRequired,
};

export default connect(mapStateToProps, null)(ModalFinalizarGuardar);
