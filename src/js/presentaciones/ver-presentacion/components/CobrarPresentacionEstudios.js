import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EstudiosDeUnaPresentacionList from '../../components/EstudiosDeUnaPresentacionList';
import REFACTURAR_ESTUDIO from '../actionTypes';
import { ACTUALIZAR_INPUT_ESTUDIO_DE_UNA_PRESENTACION } from '../../modificar-presentacion/actionTypes';

function CobrarPresentacionEstudios({
    eliminarEstudio,
    importesTotales,
    actualizarInput,
    estudios,
    estudiosApiLoading,
    obraSocial,
}) {
    return (
        <EstudiosDeUnaPresentacionList
          eliminarEstudio={ eliminarEstudio }
          importesTotales={ importesTotales }
          actualizarInput={ actualizarInput }
          estudios={ estudios }
          estudiosApiLoading={ estudiosApiLoading }
          obraSocial={ obraSocial }
        />
    );
}

const { number, func, array, bool, object } = PropTypes;

CobrarPresentacionEstudios.propTypes = {
    eliminarEstudio: func.isRequired,
    actualizarInput: func.isRequired,
    importesTotales: number.isRequired,
    estudios: array.isRequired,
    estudiosApiLoading: bool.isRequired,
    obraSocial: object.isRequired,
};

function mapStateToProps(state) {
    return {
        importesTotales: state.modificarPresentacionReducer.importesTotales,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        eliminarEstudio: estudio => dispatch({ REFACTURAR_ESTUDIO, estudioId: estudio.id }),
        actualizarInput: (index, input, value) =>
            dispatch({
                type: ACTUALIZAR_INPUT_ESTUDIO_DE_UNA_PRESENTACION, index, input, value,
            }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CobrarPresentacionEstudios);
