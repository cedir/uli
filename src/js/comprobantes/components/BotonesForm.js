import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonToolbar } from 'react-bootstrap';

function BotonesForm({ searching, history }) {
    const style = { marginTop: 0 };
    const createComprobante = () => history.push('/comprobantes/create');
    return (
        <ButtonToolbar>
            <Button
              type='submit'
              bsStyle='primary'
              disabled={ searching }
              style={ style }
            >
                Buscar
            </Button>
            <Button
              bsStyle='primary'
              disabled={ searching }
              style={ style }
              onClick={ createComprobante }
            >
                Agregar
            </Button>
        </ButtonToolbar>
    );
}

const { object, bool } = PropTypes;

BotonesForm.propTypes = {
    history: object.isRequired,
    searching: bool.isRequired,
};

export default BotonesForm;
