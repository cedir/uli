import React, { Fragment } from 'react';
import PropTypes, { object, string } from 'prop-types';
import { connect } from 'react-redux';
import TabNavigator from '../../components/TabNavigator';
import EstudiosDeUnaPresentacionList from '../../components/EstudiosDeUnaPresentacionList';
import { useComprobanteState } from '../../components/Comprobante';
import {
    FETCH_ESTUDIOS_DE_UNA_PRESENTACION_AGREGAR,
    AGREGAR_ESTUDIOS_DE_UNA_PRESENTACION_A_TABLA,
    UPDATE_PRESENTACION,
    ELIMINAR_ESTUDIO_DE_UNA_PRESENTACION,
    ACTUALIZAR_INPUT_ESTUDIO_DE_UNA_PRESENTACION,
    FINALIZAR_MODIFICAR_PRESENTACION,
    SET_IMPORTE_MEDICACION_ESTUDIO_MODIFICAR,
} from '../actionTypes';
import initialState from '../modificarPresentacionReducerInitialState';
import NotFoundPage from '../../../utilities/components/NotFoundPage';


function ModificarPresentacionPage(props) {
    const {
        actualizarInput,
        eliminarEstudio,
        estudios,
        estudiosApiLoading,
        estudiosAgregar,
        estudiosAgregarApiLoading,
        setImporteMedicacionEstudio,
        importesTotales,
        fecha,
        fetchEstudiosAgregar,
        agregarEstudiosTabla,
        updatePresentacion,
        finalizarPresentacion,
        idPresentacion,
        obraSocial,
    } = props;
    const comprobanteState = useComprobanteState();

    const showPage = !estudios.length && !estudiosApiLoading;

    return (
        <Fragment>
            <div hidden={ showPage }>
                <h1>
                    {'Modificar Presentacion: '}
                    <strong>{obraSocial.nombre !== undefined ? obraSocial.nombre : ''}</strong>
                </h1>
                <div
                  className='date-picker'
                  style={ { width: '35.5rem' } }
                >
                    <div className='form-group'>
                        <label htmlFor='date' className='control-label'>Fecha</label>
                        <input name='date' className='form-control' value={ fecha } type='date' />
                    </div>
                </div>
                <TabNavigator
                  comprobanteState={ comprobanteState }
                  fetchEstudiosAgregar={ fetchEstudiosAgregar }
                  estudios={ estudios }
                  estudiosApiLoading={ estudiosApiLoading }
                  estudiosAgregar={ estudiosAgregar }
                  estudiosAgregarApiLoading={ estudiosAgregarApiLoading }
                  agregarEstudiosTabla={ agregarEstudiosTabla }
                  id={ idPresentacion }
                  idObraSocial={ obraSocial.id }
                  updatePresentacion={ updatePresentacion }
                  finalizarPresentacion={ finalizarPresentacion }
                  fecha={ fecha }
                >
                    <EstudiosDeUnaPresentacionList
                      estudios={ estudios }
                      estudiosApiLoading={ estudiosApiLoading }
                      importesTotales={ importesTotales }
                      gravado={ comprobanteState.gravado }
                      actualizarInput={ actualizarInput }
                      eliminarEstudio={ eliminarEstudio }
                      setImporteMedicacionEstudio={ setImporteMedicacionEstudio }
                      seccion='modificar-presentacion'
                    />
                </TabNavigator>
            </div>
            { showPage && (
                <NotFoundPage />
            )}
        </Fragment>
    );
}

const { func, array, number, bool } = PropTypes;

ModificarPresentacionPage.propTypes = {
    estudios: array.isRequired,
    estudiosApiLoading: bool.isRequired,
    estudiosAgregar: array.isRequired,
    estudiosAgregarApiLoading: bool.isRequired,
    obraSocial: object.isRequired,
    importesTotales: number.isRequired,
    fecha: string.isRequired,
    actualizarInput: func.isRequired,
    eliminarEstudio: func.isRequired,
    fetchEstudiosAgregar: func.isRequired,
    agregarEstudiosTabla: func.isRequired,
    setImporteMedicacionEstudio: func.isRequired,
    updatePresentacion: func.isRequired,
    finalizarPresentacion: func.isRequired,
    idPresentacion: number.isRequired,
};

ModificarPresentacionPage.defaultProps = {
    estudios: initialState.estudios,
    estudiosApiLoading: initialState.estudiosApiLoading,
    estudiosAgregar: initialState.estudiosAgregar,
    estudiosAgregarApiLoading: initialState.estudiosApiLoading,
    idPresentacion: initialState.idPresentacion,
    obraSocial: initialState.obraSocial,
    fecha: initialState.fecha,
    importesTotales: initialState.importesTotales,
};


function mapStateToProps(state) {
    return {
        estudios: state.modificarPresentacionReducer.estudios,
        estudiosApiLoading: state.modificarPresentacionReducer.estudiosApiLoading,
        estudiosAgregar: state.modificarPresentacionReducer.estudiosAgregar,
        estudiosAgregarApiLoading: state.modificarPresentacionReducer.estudiosAgregarApiLoading,
        idPresentacion: state.modificarPresentacionReducer.id,
        obraSocial: state.modificarPresentacionReducer.obraSocial,
        fecha: state.modificarPresentacionReducer.fecha,
        importesTotales: state.modificarPresentacionReducer.importesTotales,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actualizarInput: (index, input, value) =>
            dispatch({
                type: ACTUALIZAR_INPUT_ESTUDIO_DE_UNA_PRESENTACION, index, input, value,
            }),
        eliminarEstudio: index =>
            dispatch({
                type: ELIMINAR_ESTUDIO_DE_UNA_PRESENTACION, index,
            }),
        fetchEstudiosAgregar: idObraSocial =>
            dispatch({
                type: FETCH_ESTUDIOS_DE_UNA_PRESENTACION_AGREGAR, id: idObraSocial,
            }),
        agregarEstudiosTabla: estudios =>
            dispatch({
                type: AGREGAR_ESTUDIOS_DE_UNA_PRESENTACION_A_TABLA, estudios,
            }),
        updatePresentacion: (presentacion, id) =>
            dispatch({
                type: UPDATE_PRESENTACION, presentacion, id,
            }),
        finalizarPresentacion: (presentacion, comprobante, id) =>
            dispatch({
                type: FINALIZAR_MODIFICAR_PRESENTACION, presentacion, comprobante, id,
            }),
        setImporteMedicacionEstudio: (total, index) =>
            dispatch({
                type: SET_IMPORTE_MEDICACION_ESTUDIO_MODIFICAR, total, index,
            }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModificarPresentacionPage);
