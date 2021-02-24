import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import ComprobanteView from './CreateComprobante';
import { CREATE_COMPROBANTE, DELETE_CAE } from '../../actionTypes';

function ComprobanteHandler({ cae, borrarCae, crearComprobante, apiLoading }) {
    const { id } = useParams();
    const [lockComprobante, setLockComprobante] = useState(Boolean(id));

    useEffect(() => {
        if (!lockComprobante) {
            borrarCae();
        }
    }, []);

    useEffect(() => {
        if (!lockComprobante) {
            setLockComprobante(Boolean(cae));
        }
    }, [cae]);

    return (
        <ComprobanteView
          crearComprobante={ crearComprobante }
          lockComprobante={ lockComprobante }
          cae={ cae }
          apiLoading={ apiLoading }
        />
    );
}

const { string, bool, func } = PropTypes;

ComprobanteHandler.propTypes = {
    cae: string,
    apiLoading: bool.isRequired,
    borrarCae: func.isRequired,
    crearComprobante: func.isRequired,
};

function mapStateToProps(state) {
    return {
        cae: state.comprobantesReducer.cae || '',
        apiLoading: state.comprobantesReducer.comprobantesApiLoading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        crearComprobante: comprobante =>
            dispatch({ type: CREATE_COMPROBANTE, comprobante }),
        borrarCae: () => dispatch({ type: DELETE_CAE }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ComprobanteHandler);
