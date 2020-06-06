import React, { useState, Fragment } from 'react';
import PropTypes, { object } from 'prop-types';
import { connect } from 'react-redux';
import TabNavigator from '../../components/TabNavigator';
import EstudiosDeUnaPresentacionList from '../../components/EstudiosDeUnaPresentacionList';
import { useComprobanteState } from '../../components/Comprobante';
import {
    ELIMINAR_ESTUDIO_SIN_PRESENTAR,
    ACTUALIZAR_INPUT_ESTUDIO_SIN_PRESENTAR,
    FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_AGREGAR,
    AGREGAR_ESTUDIOS_SIN_PRESENTAR_A_TABLA,
    CREAR_NUEVA_PRESENTACION_OBRA_SOCIAL,
    FINALIZAR_NUEVA_PRESENTACION,
    SET_IMPORTE_MEDICACION_ESTUDIO_NUEVA,
 } from '../actionTypes';
import initialState from '../estudiosSinPresentarReducerInitialState';
import NotFoundPage from '../../../utilities/components/NotFoundPage';


function NuevaPresentacionPage(props) {
    const {
        actualizarInput,
        eliminarEstudio,
        estudios,
        estudiosApiLoading,
        importesTotales,
        fetchEstudiosAgregar,
        estudiosAgregar,
        estudiosAgregarApiLoading,
        agregarEstudiosTabla,
        crearNuevaPresentacion,
        finalizarPresentacion,
        obraSocial,
        setImporteMedicacionEstudio,
    } = props;
    const comprobanteState = useComprobanteState();
    const [fecha, setFecha] = useState('');

    const showPage = !estudios.length && !estudiosApiLoading;

    return (
        <Fragment>
            <div hidden={ showPage }>
                <h1>
                    {'Nueva Presentacion: '}
                    <strong>{obraSocial !== {} ? obraSocial.nombre : ''}</strong>
                </h1>
                <div
                  className='date-picker'
                  style={ { width: '35.5rem' } }
                >
                    <div className='form-group'>
                        <label htmlFor='date' className='control-label'>Fecha</label>
                        <input
                          name='date'
                          className='form-control'
                          type='date'
                          value={ fecha }
                          onChange={ e => setFecha(e.target.value) }
                        />
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
                  crearPresentacion={ crearNuevaPresentacion }
                  finalizarPresentacion={ finalizarPresentacion }
                  id={ obraSocial.id !== undefined ? obraSocial.id : -1 }
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

NuevaPresentacionPage.propTypes = {
    estudios: array.isRequired,
    estudiosApiLoading: bool.isRequired,
    estudiosAgregar: array.isRequired,
    estudiosAgregarApiLoading: bool.isRequired,
    obraSocial: object.isRequired,
    importesTotales: number.isRequired,
    actualizarInput: func.isRequired,
    eliminarEstudio: func.isRequired,
    fetchEstudiosAgregar: func.isRequired,
    agregarEstudiosTabla: func.isRequired,
    crearNuevaPresentacion: func.isRequired,
    finalizarPresentacion: func.isRequired,
    setImporteMedicacionEstudio: func.isRequired,
};

NuevaPresentacionPage.defaultProps = {
    estudios: initialState.estudios,
    estudiosApiLoading: initialState.estudiosApiLoading,
    estudiosAgregar: initialState.estudiosAgregar,
    estudiosAgregarApiLoading: initialState.estudiosAgregarApiLoading,
    obraSocial: initialState.obraSocial,
    importesTotales: initialState.importesTotales,
};


function mapStateToProps(state) {
    return {
        estudios: state.estudiosSinPresentarReducer.estudios,
        estudiosApiLoading: state.estudiosSinPresentarReducer.estudiosApiLoading,
        estudiosAgregar: state.estudiosSinPresentarReducer.estudiosAgregar,
        estudiosAgregarApiLoading: state.estudiosSinPresentarReducer.estudiosAgregarApiLoading,
        obraSocial: state.estudiosSinPresentarReducer.obraSocial,
        importesTotales: state.estudiosSinPresentarReducer.importesTotales,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actualizarInput: (index, input, value) =>
            dispatch({
                type: ACTUALIZAR_INPUT_ESTUDIO_SIN_PRESENTAR, index, input, value,
            }),
        eliminarEstudio: index =>
            dispatch({
                type: ELIMINAR_ESTUDIO_SIN_PRESENTAR, index,
            }),
        fetchEstudiosAgregar: id =>
            dispatch({
                type: FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_AGREGAR,
                id,
            }),
        agregarEstudiosTabla: estudios =>
            dispatch({
                type: AGREGAR_ESTUDIOS_SIN_PRESENTAR_A_TABLA,
                estudios,
            }),
        crearNuevaPresentacion: presentacion =>
            dispatch({
                type: CREAR_NUEVA_PRESENTACION_OBRA_SOCIAL, presentacion,
            }),
        finalizarPresentacion: (presentacion, comprobante) =>
            dispatch({
                type: FINALIZAR_NUEVA_PRESENTACION, presentacion, comprobante,
            }),
        setImporteMedicacionEstudio: (total, index) =>
            dispatch({
                type: SET_IMPORTE_MEDICACION_ESTUDIO_NUEVA, total, index,
            }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NuevaPresentacionPage);
