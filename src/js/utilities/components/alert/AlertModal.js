import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function AlertModal(props) {
    const {
        isOpen, message, buttonStyle,
        onClickDo, onClickClose, doLabel,
        dontLabel,
    } = props;
    return (
        <Modal show={ isOpen }>
            <Modal.Body>
                { message }
            </Modal.Body>
            <Modal.Footer>
                <Button
                  bsStyle={ buttonStyle }
                  type='button'
                  onClick={ onClickDo }
                >
                    { doLabel }
                </Button>
                <Button
                  type='button'
                  onClick={ onClickClose }
                >
                    { dontLabel }
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

const { bool, string, func } = PropTypes;

AlertModal.propTypes = {
    isOpen: bool.isRequired,
    message: string.isRequired,
    buttonStyle: string.isRequired,
    onClickDo: func.isRequired,
    onClickClose: func.isRequired,
    doLabel: func.isRequired,
    dontLabel: func.isRequired,
};

