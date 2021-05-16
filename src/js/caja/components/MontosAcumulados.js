import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Row, Col, ListGroupItem, ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FETCH_MONTOS_ACUMULADOS } from '../actionTypes';

function MontosAcumulados({ fetchMontosAcumulados, consultorio1, consultorio2, general }) {
    const style = {
        listGroup: { flexDirection: 'row' },
        listGroupItem: { float: 'left' },
    };

    useEffect(() => {
        fetchMontosAcumulados();
    }, []);

    return (
        <Row>
            <Col md={ 12 }>
                <ListGroup style={ style.listGroup }>
                    <ListGroupItem style={ style.listGroupItem } >
                        Total: { consultorio1 + consultorio2 + general }
                    </ListGroupItem>
                    <ListGroupItem style={ style.listGroupItem } >
                        Consultorio 1: { consultorio1 }
                    </ListGroupItem>
                    <ListGroupItem style={ style.listGroupItem } >
                        Consultorio 2: { consultorio2 }
                    </ListGroupItem>
                    <ListGroupItem style={ style.listGroupItem } >
                        General: { general }
                    </ListGroupItem>
                </ListGroup>
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
