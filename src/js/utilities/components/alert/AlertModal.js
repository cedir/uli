import React from 'react';
import { Modal, Button, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function AlertModal(props) {
    const {
        isOpen, content, buttonStyle,
        onClickDo, onClickClose, doLabel,
        dontLabel, title,
    } = props;
    const isContentString = (typeof content) === 'string';

    return (
        <Modal show={ isOpen } className='alert'>
            { title && (
                <Modal.Header>
                    <h1>{ title }</h1>
                </Modal.Header>
            )}
            <Modal.Body>
                <Row className={ isContentString ? 'strings' : 'element' }>
                    { content }
                </Row>
                <Row className='toolbar'>
                    { doLabel && (
                        <Button
                          bsStyle={ buttonStyle }
                          type='button'
                          onClick={ onClickDo }
                        >
                            { doLabel }
                        </Button>
                    )}
                    { dontLabel && (
                        <Button
                          bsStyle='danger'
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
    title: string,
};
