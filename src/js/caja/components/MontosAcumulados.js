import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Row, Col, Well } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FETCH_MONTOS_ACUMULADOS } from '../actionTypes';

function MontosAcumulados({ fetchMontosAcumulados, consultorio1, consultorio2, general }) {
    useEffect(() => {
        fetchMontosAcumulados();
    }, []);
    return (
        <Row>
            <Col md={ 3 }>
                <Well>Total: { consultorio1 + consultorio2 + general }</Well>
            </Col>
            <Col md={ 3 }>
                <Well>Consultorio 1: { consultorio1 }</Well>
            </Col>
            <Col md={ 3 }>
                <Well>Consultorio 2: { consultorio2 }</Well>
            </Col>
            <Col md={ 3 }>
                <Well>General: { general }</Well>
            </Col>
        </Row>
    );
}

const { func, number } = PropTypes;

MontosAcumulados.propTypes = {
    fetchMontosAcumulados: func.isRequired,
    consultorio1: number.isRequired,
    consultorio2: number.isRequired,
    general: number.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        fetchMontosAcumulados: () => dispatch({ type: FETCH_MONTOS_ACUMULADOS }),
    };
}

export default connect(null, mapDispatchToProps)(MontosAcumulados);
