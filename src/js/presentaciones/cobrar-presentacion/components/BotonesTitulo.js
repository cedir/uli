import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { RESETEAR_TODOS_LOS_IMPORTES } from '../actionTypes';

function BotonesTitulo({ resetImportes, cobrada }) {
    return (
        <Button
          onClick={ resetImportes }
          style={ { marginTop: '2rem' } }
          className='pull-right'
          disabled={ cobrada }
        >
            Reset importes
        </Button>
    );
}

const { func, bool } = PropTypes;

BotonesTitulo.propTypes = {
    resetImportes: func.isRequired,
    cobrada: bool.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        resetImportes: () => dispatch({ type: RESETEAR_TODOS_LOS_IMPORTES }),
    };
}

export default connect(null, mapDispatchToProps)(BotonesTitulo);
