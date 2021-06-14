import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap/dist/react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ELIMINAR_ESTUDIO } from '../actionTypes';

function EliminarEstudioModal({
    modalOpened,
    setShowEliminarEstudioModal,
    estudioId,
    isLoading,
    eliminarEstudio,
    history,
}) {
    return (
        <Modal
          show={ modalOpened }
          bsSize='large'
        >
            <Modal.Header>
                <Modal.Title>Eliminar estudio</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Usted esta a punto de eliminar el estudio. Desea continuar?
            </Modal.Body>
            <Modal.Footer>
                <Button
                  disabled={ isLoading }
                  onClick={ () => setShowEliminarEstudioModal() }
                >
                    Cancelar
                </Button>

                <Button
                  disabled={ isLoading }
                  bsStyle='danger'
                  onClick={ () => {
                      eliminarEstudio(estudioId, history, setShowEliminarEstudioModal);
                  } }
                >
                    Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

EliminarEstudioModal.propTypes = {
    modalOpened: PropTypes.bool.isRequired,
    setShowEliminarEstudioModal: PropTypes.func.isRequired,
    estudioId: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    eliminarEstudio: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return { isLoading: state.estudiosReducer.estudioApiLoading };
}

function mapDispatchToProps(dispatch) {
    return {
        eliminarEstudio: (estudioId, history, showModal) => dispatch({
            type: ELIMINAR_ESTUDIO,
            estudioId,
            history,
            showModal,
        }),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EliminarEstudioModal));
