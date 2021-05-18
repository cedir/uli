import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

function BotonesUpdate({ setModal, apiLoading }) {
    return (
        <Row>
            <Button
              type='submit'
              bsStyle='primary'
              className='pull-right'
              disabled={ apiLoading }
              style={ { marginLeft: '2.5rem' } }
            >
                Confirmar
            </Button>
            <Button
              onClick={ () => setModal(false) }
              disabled={ apiLoading }
              className='pull-right'
            >
                Cancelar
            </Button>
        </Row>
    );
}

const { bool, func } = PropTypes;

BotonesUpdate.propTypes = {
    setModal: func.isRequired,
    apiLoading: bool.isRequired,
};

function mapStateToProps(state) {
    return {
        apiLoading: state.cajaReducer.apiLoading,
    };
}
export default connect(mapStateToProps)(BotonesUpdate);
