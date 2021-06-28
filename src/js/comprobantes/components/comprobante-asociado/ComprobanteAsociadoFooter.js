import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Button } from 'react-bootstrap';

function ComprobanteAsociadoFooter({ apiLoading, valid }) {
    return (
        <Row>
            <Col md={ 12 }>
                <Button
                  type='submit'
                  bsStyle='primary'
                  disabled={ apiLoading || !valid }
                  className='pull-right'
                >
                    Crear comprobante asociado
                </Button>
            </Col>
        </Row>
    );
}

const { bool } = PropTypes;

ComprobanteAsociadoFooter.propTypes = {
    apiLoading: bool.isRequired,
    valid: bool.isRequired,
};

export default ComprobanteAsociadoFooter;
