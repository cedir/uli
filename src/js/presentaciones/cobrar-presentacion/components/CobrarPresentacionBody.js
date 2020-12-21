import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EstudiosDeUnaPresentacionList from '../../components/EstudiosDeUnaPresentacionList';
import ToolbarCobrar from './toolbar/ToolbarCobrar';
import {
    ACTUALIZAR_INPUT_ESTUDIO_DE_COBRAR_PRESENTACION,
    RESETEAR_IMPORTE_ESTUDIO,
    IMPORTES_ACTUALIZADOS,
    } from '../actionTypes';

function CobrarPresentacionBody({
    estudios,
    cargando,
    importesTotales,
    actualizarInput,
    resetImporte,
    importesActualizados,
    comprobante,
}) {
    return (
        <React.Fragment>
            <ToolbarCobrar
              cargando={ cargando }
            />
            <EstudiosDeUnaPresentacionList
              estudios={ estudios }
              estudiosApiLoading={ cargando }
              importesTotales={ importesTotales }
              actualizarInput={ actualizarInput }
              gravado={ comprobante && comprobante.gravado ? comprobante.gravado.porcentaje : '0' }
              resetImporte={ resetImporte }
              seccion='cobrar-presentacion'
              importesActualizados={ importesActualizados }
            />
        </React.Fragment>
    );
}

const { array, bool, number, object, func } = PropTypes;

CobrarPresentacionBody.propTypes = {
    estudios: array.isRequired,
    cargando: bool.isRequired,
    importesTotales: number.isRequired,
    actualizarInput: func.isRequired,
    resetImporte: func.isRequired,
    importesActualizados: func.isRequired,
    comprobante: object.isRequired,
};

function mapStateToProps(state) {
    return {
        importesTotales: state.cobrarPresentacionReducer.importesTotales,
        comprobante: state.cobrarPresentacionReducer.comprobante,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        actualizarInput: (index, input, value) =>
            dispatch({
                type: ACTUALIZAR_INPUT_ESTUDIO_DE_COBRAR_PRESENTACION,
                index, input, value,
            }),
        resetImporte: id =>
            dispatch({ type: RESETEAR_IMPORTE_ESTUDIO, estudioId: id }),
        importesActualizados: id =>
            dispatch({ type: IMPORTES_ACTUALIZADOS, id }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CobrarPresentacionBody);
