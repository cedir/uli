import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import BotonesTitulo from './BotonesTitulo';

function CobrarPresentacionHeader({ obraSocial, cobrada }) {
    return (
        <Row>
            <Col md={ 8 }>
                <h1>
                    Cobrar presentacion: <strong>{obraSocial.nombre}</strong>
                </h1>
            </Col>
            <Col md={ 4 }>
                <BotonesTitulo cobrada={ cobrada } />
            </Col>
        </Row>
    );
}

const { object, bool } = PropTypes;

CobrarPresentacionHeader.propTypes = {
    obraSocial: object.isRequired,
    cobrada: bool.isRequired,
};

function mapStateToProps(state) {
    return {
        obraSocial: state.cobrarPresentacionReducer.obraSocial,
    };
}

export default connect(mapStateToProps)(CobrarPresentacionHeader);
