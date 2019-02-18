import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, Button } from 'react-bootstrap/dist/react-bootstrap';

export default class CajaActionBar extends Component {
    render() {
        return (
            <ButtonToolbar>
                <Button
                  onClick={ this.props.openSearchCajaModal }
                >
                    Buscar movimiento</Button>
                <Button
                  bsStyle='primary'
                >
                    Agregar movimiento
                </Button>
            </ButtonToolbar>
        );
    }
}

const { func } = PropTypes;

CajaActionBar.propTypes = {
    openSearchCajaModal: func.isRequired,
};
