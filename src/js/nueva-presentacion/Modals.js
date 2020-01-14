import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import Comprobante from '../nueva-presentacion/low-order-components/Comprobante';

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
    const { show, onClickClose } = props;
    return (
        <div className='modal-comprobante-box'>
            <Modal show={ show } className='modal-comprobante'>
                <Modal.Header>
                    <strong>Comprobante</strong>
                </Modal.Header>
                <Modal.Body>
                    <Comprobante />
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
