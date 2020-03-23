import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import FinalizarGuardarForm from './FinalizarGuardarForm';
import Comprobante from './Comprobante';
import MedicacionEstudio from './MedicacionEstudio';
import VerPresentacionList from '../../../presentaciones/components/VerPresentacionList';

export function ModalEliminarFila(props) {
    const { nroFila, show, onClickClose, onClickEliminar } = props;
    return (
        <Modal show={ show }>
            <Modal.Body>
                {` ¿Estas seguro que deseas eliminar la fila ${nroFila}? `}
            </Modal.Body>
            <Modal.Footer>
                <Button
                  bsStyle='primary'
                  type='button'
                  onClick={ onClickEliminar }
                >
                    Eliminar
                </Button>
                <Button
                  bsStyle='danger'
                  type='button'
                  onClick={ onClickClose }
                >
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export function ModalComprobante(props) {
    const {
        show,
        onClickClose,
        componentState,
    } = props;

    return (
        <div className='modal-comprobante-box'>
            <Modal show={ show } className='modal-comprobante'>
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
        </div>
    );
}

export function ModalAnestesia(props) {
    const { show, onClickClose } = props;
    return (
        <div className='modal-anestesia-box'>
            <Modal show={ show } className='modal-anestesia'>
                <Modal.Header>
                    <strong>Anestesia</strong>
                </Modal.Header>
                <Modal.Body>
                    Ups.. no hay mucho aqui ahora, lo habrá mas adelante.
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
        </div>
    );
}
export function ModalMedicacion(props) {
    const { show, onClickClose, estudio } = props;
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
        <div className='modal-finalizar-guardar-box'>
            <Modal show={ show } className='modal-finalizar-guardar'>
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
        </div>
    );
}

export function ModalVerPresentacion(props) {
    const { show, onClickClose } = props;
    return (
        <div className='modal-ver-presentacion-box'>
            <Modal show={ show } className='modal-ver-presentacion'>
                <Modal.Body>
                    <VerPresentacionList />
                </Modal.Body>
                <Modal.Footer>
                    <Link to='/presentaciones-obras-sociales'>
                        <Button
                          bsStyle='primary'
                          type='button'
                          onClick={ onClickClose }
                        >
                            Cerrar
                        </Button>
                    </Link>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

const { bool, func, number, object, string } = PropTypes;

function mapStateToProps(state) {
    return {
        fecha: state.estudiosSinPresentarReducer.fecha,
    };
}

ModalEliminarFila.propTypes = {
    show: bool.isRequired,
    onClickEliminar: func.isRequired,
    onClickClose: func.isRequired,
    nroFila: number.isRequired,
};

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

ModalAnestesia.propTypes = {
    show: bool.isRequired,
    onClickClose: func.isRequired,
};

ModalMedicacion.propTypes = {
    show: bool.isRequired,
    onClickClose: func.isRequired,
    estudio: object.isRequired,
};

ModalVerPresentacion.propTypes = {
    show: bool.isRequired,
    onClickClose: func.isRequired,
};

export default connect(mapStateToProps, null)(ModalFinalizarGuardar);
