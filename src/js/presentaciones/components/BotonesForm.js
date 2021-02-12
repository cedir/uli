import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonToolbar } from 'react-bootstrap';

export default function BotonesForm({ selectedObraSocial, nuevaClickHandler }) {
    const seleccionada = () => selectedObraSocial && selectedObraSocial.length === 0;

    return (
        <ButtonToolbar>
            <Button
              className='pull-left'
              bsStyle='primary'
              disabled={ seleccionada() }
              onClick={ () => nuevaClickHandler(selectedObraSocial) }
            >
                Nueva
            </Button>
            <Button
              className='pull-left'
              bsStyle='primary'
              type='submit'
            >
                Buscar
            </Button>
        </ButtonToolbar>
    );
}

const { func, array } = PropTypes;

BotonesForm.propTypes = {
    selectedObraSocial: array,
    nuevaClickHandler: func.isRequired,
};
