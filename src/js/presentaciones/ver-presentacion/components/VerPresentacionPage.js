import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EstudiosDeUnaPresentacionList from '../../components/EstudiosDeUnaPresentacionList';
import initialState from '../../modificar-presentacion/modificarPresentacionReducerInitialState';
import { ACTUALIZAR_INPUT_ESTUDIO_DE_UNA_PRESENTACION } from '../../modificar-presentacion/actionTypes';

const VerPresentacionPage = ({
    estudios, estudiosApiLoading, importesTotales,
    actualizarInput, obraSocial,
}) => (
    <Fragment>
        <h1>
            {'Ver presentacion: '}
            <strong>{obraSocial.nombre && obraSocial.nombre}</strong>
        </h1>
        <EstudiosDeUnaPresentacionList
          estudios={ estudios }
          estudiosApiLoading={ estudiosApiLoading }
          importesTotales={ importesTotales }
          actualizarInput={ actualizarInput }
        />
    </Fragment>
);

const { array, bool, func, number, object } = PropTypes;

VerPresentacionPage.propTypes = {
    estudios: array.isRequired,
    estudiosApiLoading: bool.isRequired,
    importesTotales: number.isRequired,
    actualizarInput: func.isRequired,
    obraSocial: object.isRequired,
};

VerPresentacionPage.defaultProps = {
    estudios: initialState.estudios,
    estudiosApiLoading: initialState.estudiosApiLoading,
    importesTotales: initialState.importesTotales,
    obraSocial: initialState.obraSocial,
};

function mapStateToProps(state) {
    return {
        estudios: state.modificarPresentacionReducer.estudios,
        estudiosApiLoading: state.modificarPresentacionReducer.estudiosApiLoading,
        importesTotales: state.modificarPresentacionReducer.importesTotales,
        obraSocial: state.modificarPresentacionReducer.obraSocial,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actualizarInput: (index, input, value) =>
            dispatch({
                type: ACTUALIZAR_INPUT_ESTUDIO_DE_UNA_PRESENTACION, index, input, value,
            }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VerPresentacionPage);
