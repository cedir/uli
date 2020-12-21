import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import BotonesTitulo from './header/BotonesTitulo';
import { RESETEAR_TODOS_LOS_IMPORTES } from '../actionTypes';

function CobrarPresentacionHeader({ obraSocial, cobrada, cargando, resetImportes }) {
    return (
        <Row>
            <Col md={ 8 }>
                <h1>
                    Cobrar presentacion: <strong>{obraSocial.nombre}</strong>
                </h1>
            </Col>
            <Col md={ 4 }>
                <BotonesTitulo desactivar={ cargando || cobrada } resetImportes={ resetImportes } />
            </Col>
        </Row>
    );
}

const { object, bool, func } = PropTypes;

CobrarPresentacionHeader.propTypes = {
    obraSocial: object.isRequired,
    cobrada: bool.isRequired,
    cargando: bool.isRequired,
    resetImportes: func.isRequired,
};

function mapStateToProps(state) {
    return {
        obraSocial: state.cobrarPresentacionReducer.obraSocial,
        cobrada: state.cobrarPresentacionReducer.cobrada,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        resetImportes: () => dispatch({ type: RESETEAR_TODOS_LOS_IMPORTES }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CobrarPresentacionHeader);
