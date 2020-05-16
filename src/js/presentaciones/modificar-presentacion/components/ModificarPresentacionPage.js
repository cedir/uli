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
} from '../actionTypes';
import { CERRAR_PRESENTACION } from '../../actionTypes';
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
        importesTotales,
        fecha,
        fetchEstudiosAgregar,
        agregarEstudiosTabla,
        updatePresentacion,
        cerrarPresentacion,
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
                  updatePresentacion={ updatePresentacion }
                  cerrarPresentacion={ cerrarPresentacion }
                  fecha={ fecha }
                >
                    <EstudiosDeUnaPresentacionList
                      estudios={ estudios }
                      estudiosApiLoading={ estudiosApiLoading }
                      importesTotales={ importesTotales }
                      gravado={ comprobanteState.gravado }
                      actualizarInput={ actualizarInput }
                      eliminarEstudio={ eliminarEstudio }
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
    updatePresentacion: func.isRequired,
    cerrarPresentacion: func.isRequired,
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
        fetchEstudiosAgregar: idPresentacion =>
            dispatch({
                type: FETCH_ESTUDIOS_DE_UNA_PRESENTACION_AGREGAR, id: idPresentacion,
            }),
        agregarEstudiosTabla: estudios =>
            dispatch({
                type: AGREGAR_ESTUDIOS_DE_UNA_PRESENTACION_A_TABLA, estudios,
            }),
        updatePresentacion: (presentacion, id) =>
            dispatch({
                type: UPDATE_PRESENTACION, presentacion, id,
            }),
        cerrarPresentacion: (comprobante, id) =>
            dispatch({
                type: CERRAR_PRESENTACION, comprobante, id,
            }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModificarPresentacionPage);
