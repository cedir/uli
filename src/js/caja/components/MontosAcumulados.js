import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Row, Col, ListGroupItem, ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FETCH_MONTOS_ACUMULADOS } from '../actionTypes';
import './MontosAcumulados.css';

function MontosAcumulados({ fetchMontosAcumulados, consultorio1, consultorio2, general, total }) {
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
                    <ListGroupItem style={ style.listGroupItem } id='list-group-primero'>
                        Total: ${ total }
                    </ListGroupItem>
                    <ListGroupItem style={ style.listGroupItem } id='list-group-medio'>
                        Consultorio 1: ${ consultorio1 }
                    </ListGroupItem>
                    <ListGroupItem style={ style.listGroupItem } id='list-group-medio'>
                        Consultorio 2: ${ consultorio2 }
                    </ListGroupItem>
                    <ListGroupItem style={ style.listGroupItem } id='list-group-ultimo'>
                        General: ${ general }
                    </ListGroupItem>
                </ListGroup>
            </Col>
        </Row>
    );
}

const { func, string } = PropTypes;

MontosAcumulados.propTypes = {
    fetchMontosAcumulados: func.isRequired,
    consultorio1: string.isRequired,
    consultorio2: string.isRequired,
    general: string.isRequired,
    total: string.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        fetchMontosAcumulados: () => dispatch({ type: FETCH_MONTOS_ACUMULADOS }),
    };
}

export default connect(null, mapDispatchToProps)(MontosAcumulados);
