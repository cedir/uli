import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Well, Col, Row } from 'react-bootstrap/dist/react-bootstrap';

function CajaActionBar({
    openSearchCajaModal,
    montoAcumulado,
    history,
    apiLoading,
}) {
    const location = {
        pathname: '/caja/create',
        state: { montoAcumulado },
    };
    const createMovimientos = () => history.push(location);
    console.log(createMovimientos);
    return (
        <Row>
            <Col md={ 6 }>
                <Row>
                    <Col md={ 5 }>
                        <Well>Monto acumulado: { montoAcumulado }</Well>
                    </Col>
                </Row>
            </Col>
            <Col md={ 6 } >
                <div className='pull-right'>
                    <Button
                      onClick={ openSearchCajaModal }
                      disabled={ apiLoading }
                    >
                        Buscar movimiento
                    </Button>{' '}
                    <Button
                      onClick={ createMovimientos }
                      disabled={ apiLoading }
                    >
                        Crear Movimientos
                    </Button>
                </div>
            </Col>
        </Row>
    );
}

const { func, string, object, bool } = PropTypes;

CajaActionBar.propTypes = {
    openSearchCajaModal: func.isRequired,
    montoAcumulado: string.isRequired,
    history: object.isRequired,
    apiLoading: bool.isRequired,
};

function mapStateToProps(state) {
    return {
        apiLoading: state.cajaReducer.apiLoading,
    };
}

export default connect(mapStateToProps)(CajaActionBar);
