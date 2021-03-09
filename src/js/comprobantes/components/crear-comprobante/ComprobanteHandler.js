import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import ComprobanteView from './CreateComprobante';
import { CREATE_COMPROBANTE, DELETE_CAE, FETCH_COMPROBANTE } from '../../actionTypes';

function ComprobanteHandler({ cae, borrarCae, crearComprobante, apiLoading, cargarComprobante }) {
    const { id } = useParams();
    const [lockComprobante, setLockComprobante] = useState(Boolean(id));

    useEffect(() => {
        borrarCae();
        if (lockComprobante) {
            cargarComprobante(id);
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
    cargarComprobante: func.isRequired,
};

function mapStateToProps(state) {
    return {
        cae: state.comprobantesReducer.cae || '',
        apiLoading: state.comprobantesReducer.comprobantesApiLoading,
        initialValues: state.comprobantesReducer.initialValues,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        crearComprobante: comprobante =>
            dispatch({ type: CREATE_COMPROBANTE, comprobante }),
        borrarCae: () => dispatch({ type: DELETE_CAE }),
        cargarComprobante: id => dispatch({ type: FETCH_COMPROBANTE, id }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ComprobanteHandler);
