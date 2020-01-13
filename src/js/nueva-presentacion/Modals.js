import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

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

const { bool, func, number } = PropTypes;

ModalEliminarFila.propTypes = {
    show: bool.isRequired,
    onClickEliminar: func.isRequired,
    onClickClose: func.isRequired,
    nroFila: number.isRequired,
};
