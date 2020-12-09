import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EstudiosDeUnaPresentacionList from '../../components/EstudiosDeUnaPresentacionList';
import { REFACTURAR_ESTUDIO, ACTUALIZAR_INPUT_ESTUDIO_DE_COBRAR_PRESENTACION } from '../actionTypes';
import NotFoundPage from '../../../utilities/components/NotFoundPage';
import BotonesCobrar from './BotonesCobrar';

function CobrarPresentacionPage({
    eliminarEstudio,
    importesTotales,
    actualizarInput,
    estudios,
    estudiosApiLoading,
    obraSocial,
}) {
    const showPage = !estudios.length && !estudiosApiLoading;
    return (
        <React.Fragment>
            { !showPage && (
                <React.Fragment>
                    <h1>
                        {'Cobrar presentacion: '}
                        <strong>{obraSocial.nombre && obraSocial.nombre}</strong>
                    </h1>
                    <BotonesCobrar />
                    <EstudiosDeUnaPresentacionList
                      estudios={ estudios }
                      estudiosApiLoading={ estudiosApiLoading }
                      importesTotales={ importesTotales }
                      actualizarInput={ actualizarInput }
                      obraSocial={ obraSocial }
                      eliminarEstudio={ eliminarEstudio }
                      seccion='cobrar-presentacion'
                    />
                </React.Fragment>
            )}
            { showPage && (
                <NotFoundPage />
            )}
        </React.Fragment>
    );
}


const { number, func, array, bool, object } = PropTypes;

CobrarPresentacionPage.propTypes = {
    eliminarEstudio: func.isRequired,
    actualizarInput: func.isRequired,
    importesTotales: number.isRequired,
    estudios: array.isRequired,
    estudiosApiLoading: bool.isRequired,
    obraSocial: object.isRequired,
};

function mapStateToProps(state) {
    return {
        estudios: state.cobrarPresentacionReducer.estudios,
        estudiosApiLoading: state.cobrarPresentacionReducer.estudiosApiLoading,
        importesTotales: state.cobrarPresentacionReducer.importesTotales,
        obraSocial: state.cobrarPresentacionReducer.obraSocial,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        eliminarEstudio: estudio => dispatch({ REFACTURAR_ESTUDIO, estudioId: estudio.id }),
        actualizarInput: (index, input, value) =>
            dispatch({
                type: ACTUALIZAR_INPUT_ESTUDIO_DE_COBRAR_PRESENTACION, index, input, value,
            }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CobrarPresentacionPage);
