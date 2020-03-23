import React from 'react';
import { Modal, Button, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function AlertModal(props) {
    const {
        isOpen, message, buttonStyle,
        onClickDo, onClickClose, doLabel,
        dontLabel,
    } = props;
    return (
        <Modal show={ isOpen } className='alert'>
            <Modal.Body>
                <Row>
                    { message }
                </Row>
                <Row>
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
                </Row>
            </Modal.Body>
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
    doLabel: string.isRequired,
    dontLabel: string.isRequired,
};

