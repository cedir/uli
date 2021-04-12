import React from 'react';
import PropTypes from 'prop-types';
import { Button, Well, Col, Row } from 'react-bootstrap/dist/react-bootstrap';

function CajaActionBar({ openSearchCajaModal, montoAcumulado, history }) {
    const location = {
        pathname: '/caja/create',
        state: { montoAcumulado },
    };
    const createMovimientos = () => history.push(location);

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
                    <Button onClick={ openSearchCajaModal }>
                        Buscar movimiento
                    </Button>{' '}
                    <Button onClick={ createMovimientos }>
                        Crear Movimientos
                    </Button>
                </div>
            </Col>
        </Row>
    );
}

const { func, string, object } = PropTypes;

CajaActionBar.propTypes = {
    openSearchCajaModal: func.isRequired,
    montoAcumulado: string.isRequired,
    history: object.isRequired,
};

export default CajaActionBar;
