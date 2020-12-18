import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ModalHandler from './ModalHandler';
import EstudiosDeUnaPresentacionList from '../../components/EstudiosDeUnaPresentacionList';
import ToolbarCobrar from './ToolbarCobrar';
import * as types from '../actionTypes';

function CobrarPresentacionBody({
    estudios,
    cargando,
    cobrada,
    importesTotales,
    actualizarInput,
    resetImporte,
    importesActualizados,
    comprobante,
    retencionImpositiva,
}) {
    const [modalName, setModalName] = useState('');
    const [nroRecibo, setNroRecibo] = useState('');
    return (
        <React.Fragment>
            <ModalHandler
              modalName={ modalName }
              setModalName={ setModalName }
              comprobante={ comprobante }
              estudios={ estudios }
              retencionImpositiva={ retencionImpositiva }
              nroRecibo={ nroRecibo }
            />
            <ToolbarCobrar
              cargando={ cargando }
              cobrada={ cobrada }
              nroRecibo={ nroRecibo }
              setNroRecibo={ setNroRecibo }
              setModalName={ setModalName }
              retencionImpositiva={ retencionImpositiva }
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
    comprobante: object,
    cobrada: bool.isRequired,
    retencionImpositiva: number.isRequired,
};

function mapStateToProps(state) {
    const { se_presenta_por_AMR: AMR } = state.cobrarPresentacionReducer.obraSocial;
    const retencionImpositiva = Number(AMR) ? 32 : 25;
    return {
        importesTotales: state.cobrarPresentacionReducer.importesTotales,
        comprobante: state.cobrarPresentacionReducer.comprobante,
        retencionImpositiva,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actualizarInput: (index, input, value) =>
            dispatch({
                type: types.ACTUALIZAR_INPUT_ESTUDIO_DE_COBRAR_PRESENTACION,
                index, input, value,
            }),
        resetImporte: id =>
            dispatch({ type: types.RESETEAR_IMPORTE_ESTUDIO, estudioId: id }),
        importesActualizados: id =>
            dispatch({ type: types.IMPORTES_ACTUALIZADOS, id }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CobrarPresentacionBody);
