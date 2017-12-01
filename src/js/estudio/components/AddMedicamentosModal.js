import React from 'react';
import { Modal, Button } from 'react-bootstrap/dist/react-bootstrap';

class AddMedicamentosModal extends React.Component {
    render() {
        return (
            <Modal show={ this.props.modalOpened } onHide={ this.props.closeModal }>
                <Modal.Header closeButton>
                    <Modal.Title>Add medicamento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Building...</h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={ this.props.closeModal }>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

const { bool, func } = React.PropTypes;

AddMedicamentosModal.propTypes = {
    modalOpened: bool.isRequired,
    closeModal: func.isRequired,
};

export default AddMedicamentosModal;
