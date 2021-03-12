import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { change } from 'redux-form';
import ComprobanteView from './CreateComprobante';
import { CREATE_COMPROBANTE, DELETE_CAE, FETCH_COMPROBANTE, BORRAR_COMPROBANTE } from '../../actionTypes';

function ComprobanteHandler({
    caeCompCreado,
    comprobante,
    borrarCae,
    crearComprobante,
    apiLoading,
    cargarComprobante,
    updateForm,
    borrarComprobante,
}) {
    const { id } = useParams();
    const [lockComprobante, setLockComprobante] = useState(Boolean(id));

    useEffect(() => {
        if (id) {
            cargarComprobante(id);
        }
        return () => { borrarCae(); borrarComprobante(); };
    }, []);

    useEffect(() => {
        if (!lockComprobante && caeCompCreado) {
            setLockComprobante(true);
        }
    }, [caeCompCreado]);

    useEffect(() => {
        const keys = comprobante ? Object.keys(comprobante) : [];
        if (id && keys.length > 0) {
            keys.forEach((key) => {
                updateForm(key, comprobante[key]);
            });
        }
    }, [comprobante]);

    return (
        <ComprobanteView
          crearComprobante={ crearComprobante }
          lockComprobante={ lockComprobante }
          cae={ caeCompCreado || comprobante.cae }
          apiLoading={ apiLoading }
          updateForm={ updateForm }
        />
    );
}

const { string, bool, func, object } = PropTypes;

ComprobanteHandler.propTypes = {
    caeCompCreado: string,
    apiLoading: bool.isRequired,
    borrarCae: func.isRequired,
    crearComprobante: func.isRequired,
    cargarComprobante: func.isRequired,
    comprobante: object.isRequired,
    updateForm: func.isRequired,
    borrarComprobante: func.isRequired,
};

function mapStateToProps(state) {
    return {
        caeCompCreado: state.comprobantesReducer.cae || '',
        apiLoading: state.comprobantesReducer.comprobantesApiLoading,
        comprobante: state.comprobantesReducer.comprobante,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        crearComprobante: comprobante =>
            dispatch({ type: CREATE_COMPROBANTE, comprobante }),
        borrarCae: () => dispatch({ type: DELETE_CAE }),
        cargarComprobante: id => dispatch({ type: FETCH_COMPROBANTE, id }),
        updateForm: (name, value) => dispatch(change('CreateComprobanteForm', name, value)),
        borrarComprobante: () => dispatch({ type: BORRAR_COMPROBANTE }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ComprobanteHandler);
