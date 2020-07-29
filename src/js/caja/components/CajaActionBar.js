import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Well, Grid, Col, Row } from 'react-bootstrap/dist/react-bootstrap';

export default class CajaActionBar extends Component {
    render() {
        return (
            <Grid>
                <Row>
                    <Col md={ 10 }>
                        <Row>
                            <Col mdOffset={ 2 } md={ 3 } xs={ 5 } xsOffset={ 2 }>
                                <Well>Monto acumulado: { this.props.montoAcumulado }</Well>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={ 2 }>
                        <Button onClick={ this.props.openSearchCajaModal }>
                            Buscar movimiento
                        </Button>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

const { func, string } = PropTypes;

CajaActionBar.propTypes = {
    openSearchCajaModal: func.isRequired,
    montoAcumulado: string.isRequired,
};
