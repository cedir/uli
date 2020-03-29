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
                      tipo={ componentState.tipo }
                      setTipo={ componentState.setTipo }
                      subTipo={ componentState.subTipo }
                      setSubTipo={ componentState.setSubTipo }
                      responsable={ componentState.responsable }
                      setResponsable={ componentState.setResponsable }
                      gravado={ componentState.gravado }
                      setGravado={ componentState.setGravado }
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
    const [finalizarButtonDisabled, setFinalizarButtonDisabled] = useState(true);
    const [guardarButtonDisabled, setGuardarButtonDisabled] = useState(true);
    useEffect(() => {
        // entries return an array of arrays consisted of keys & values of some object.
        // I want to know if this object has some empty value in it's attributes.
        const entries = Object.entries(comprobanteState);
        let entriesHasEmptyValues = false;
        entries.forEach((entry) => {
            if (entry[1] === '') {
                entriesHasEmptyValues = true;
            }
        });
        if (fecha !== '' && periodoValue !== '' && !entriesHasEmptyValues) {
            setFinalizarButtonDisabled(false);
        } else {
            setFinalizarButtonDisabled(true);
        }
        if (fecha !== '' && periodoValue !== '') {
            setGuardarButtonDisabled(false);
        } else {
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
