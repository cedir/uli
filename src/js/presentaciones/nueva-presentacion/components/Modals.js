import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Row } from 'react-bootstrap';
import Comprobante from './Comprobante';
import MedicacionEstudio from '../../../estudio/components/MedicacionEstudio';

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
    const [numeroShort, setNumeroShort] = useState('');
    const [numeroLong, setNumeroLong] = useState('');
    const [tipo, setTipo] = useState('');
    const [subTipo, setSubTipo] = useState('');
    const [responsable, setResponsable] = useState('');
    const [gravado, setGravado] = useState('');
    const { show, onClickClose } = props;

    return (
        <div className='modal-comprobante-box'>
            <Modal show={ show } className='modal-comprobante'>
                <form onSubmit={ e => e.preventDefault() }>
                    <Modal.Header>
                        <strong>Comprobante</strong>
                    </Modal.Header>
                    <Modal.Body>
                        <Comprobante
                          numeroShortValue={ numeroShort }
                          onChangeNumeroShort={ e => setNumeroShort(e.target.value) }
                          numeroLongValue={ numeroLong }
                          onChangeNumeroLong={ e => setNumeroLong(e.target.value) }
                          tipoValue={ tipo }
                          onChangeTipo={ e => setTipo(e.target.value) }
                          subTipoValue={ subTipo }
                          onChangeSubTipo={ e => setSubTipo(e.target.value) }
                          responsableValue={ responsable }
                          onChangeResponsable={ e => setResponsable(e.target.value) }
                          gravadoValue={ gravado }
                          onChangeGravado={ e => setGravado(e.target.value) }
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
    const { show, onClickClose } = props;
    return (
        <div className='modal-medicacion-box'>
            <Modal show={ show } className='modal-medicacion'>
                <Modal.Header>
                    <strong>Medicacion</strong>
                </Modal.Header>
                <Modal.Body>
                    <MedicacionEstudio />
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

export function ModalFinalizarGuardar(props) {
    const [periodoValue, setPeriodoValue] = useState('');
    const { show, onClickClose } = props;
    return (
        <div className='modal-finalizar-guardar-box'>
            <Modal show={ show } className='modal-finalizar-guardar'>
                <Modal.Header>
                    <strong>Finalizar Presentacion</strong>
                </Modal.Header>
                <Modal.Body>
                    <div className='box'>
                        <Row>
                            <strong>Periodo de la presentacion:</strong>
                        </Row>
                        <Row>
                            <input
                              type='text'
                              value={ periodoValue }
                              onChange={ e => setPeriodoValue(e.target.value) }
                            />
                        </Row>
                        <Row>
                            <Button
                              bsStyle='primary'
                            >
                                Finalizar
                            </Button>
                            <Button
                              bsStyle='primary'
                            >
                                Guardar
                            </Button>
                        </Row>
                    </div>
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

const { bool, func, number } = PropTypes;

ModalEliminarFila.propTypes = {
    show: bool.isRequired,
    onClickEliminar: func.isRequired,
    onClickClose: func.isRequired,
    nroFila: number.isRequired,
};

ModalComprobante.propTypes = {
    show: bool.isRequired,
    onClickClose: func.isRequired,
};

ModalFinalizarGuardar.propTypes = {
    show: bool.isRequired,
    onClickClose: func.isRequired,
};

ModalAnestesia.propTypes = {
    show: bool.isRequired,
    onClickClose: func.isRequired,
};

ModalMedicacion.propTypes = {
    show: bool.isRequired,
    onClickClose: func.isRequired,
};
