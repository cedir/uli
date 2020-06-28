import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Well, Grid, Col } from 'react-bootstrap/dist/react-bootstrap';

export default class CajaActionBar extends Component {
    render() {
        return (
            <Grid>
                <Col md={ 2 } mdOffset={ 2 }>
                    <Well>Monto acumulado: { this.props.montoAcumulado }</Well>
                </Col>
                <Col md={ 2 } mdOffset={ 6 }>
                    <Button onClick={ this.props.openSearchCajaModal }>
                        Buscar movimiento
                    </Button>
                </Col>
            </Grid>
        );
    }
}

const { func, string } = PropTypes;

CajaActionBar.propTypes = {
    openSearchCajaModal: func.isRequired,
    montoAcumulado: string.isRequired,
};
