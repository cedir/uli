import React from 'react';
import { Modal, Button, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function AlertModal(props) {
    const {
        isOpen, content, buttonStyle,
        onClickDo, onClickClose, doLabel,
        dontLabel,
    } = props;
    return (
        <Modal show={ isOpen } className='alert'>
            <Modal.Body>
                <Row>
                    { content }
                </Row>
                <Row>
                    <Button
                      bsStyle={ buttonStyle }
                      type='button'
                      onClick={ onClickDo }
                    >
                        { doLabel }
                    </Button>
                    { dontLabel !== undefined && (
                        <Button
                          type='button'
                          onClick={ onClickClose }
                        >
                            { dontLabel }
                        </Button>
                    )}
                </Row>
            </Modal.Body>
        </Modal>
    );
}

const { any, bool, string, func } = PropTypes;

AlertModal.propTypes = {
    isOpen: bool.isRequired,
    content: any.isRequired,
    buttonStyle: string.isRequired,
    onClickDo: func,
    onClickClose: func,
    doLabel: string.isRequired,
    dontLabel: string.isRequired,
};

