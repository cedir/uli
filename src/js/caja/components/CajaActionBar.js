import React from 'react';
import PropTypes from 'prop-types';
import { Button, Well, Grid, Col, Row } from 'react-bootstrap/dist/react-bootstrap';

function CajaActionBar({ openSearchCajaModal, montoAcumulado, history }) {
    const location = {
        pathname: '/caja/create',
        state: { montoAcumulado },
    };
    const createMovimientos = () => history.push(location);

    return (
        <Grid>
            <Row>
                <Col md={ 8 }>
                    <Row>
                        <Col mdOffset={ 2 } md={ 3 } xs={ 5 } xsOffset={ 2 }>
                            <Well>Monto acumulado: { montoAcumulado }</Well>
                        </Col>
                    </Row>
                </Col>
                <Col md={ 2 }>
                    <Button onClick={ openSearchCajaModal }>
                        Buscar movimiento
                    </Button>
                </Col>
                <Col md={ 2 }>
                    <Button onClick={ createMovimientos }>
                        Crear Movimientos
                    </Button>
                </Col>
            </Row>
        </Grid>
    );
}

const { func, string, object } = PropTypes;

CajaActionBar.propTypes = {
    openSearchCajaModal: func.isRequired,
    montoAcumulado: string.isRequired,
    history: object.isRequired,
};

export default CajaActionBar;
