import React from 'react';
import PropTypes, { object, string } from 'prop-types';
import { connect } from 'react-redux';
import TabNavigator from '../../components/TabNavigator';
import EstudiosDeUnaPresentacionList from '../../components/EstudiosDeUnaPresentacionList';
import { useComprobanteState } from '../../components/Comprobante';
import {
    ELIMINAR_ESTUDIO_DE_UNA_PRESENTACION,
    ACTUALIZAR_INPUT_ESTUDIO_DE_UNA_PRESENTACION,
    FETCH_ESTUDIOS_DE_UNA_PRESENTACION_AGREGAR,
    AGREGAR_ESTUDIOS_DE_UNA_PRESENTACION_A_TABLA,
    ACTUALIZAR_PRESENTACION_OBRA_SOCIAL,
    CERRAR_PRESENTACION_OBRA_SOCIAL,
} from '../../actionTypes';
import initialState from '../../presentacionReducerInitialState';

function ModificarPresentacionPage(props) {
    const {
        actualizarInput,
        eliminarEstudio,
        estudios,
        estudiosAgregar,
        importesTotales,
        fecha,
        fetchEstudiosAgregar,
        agregarEstudiosTabla,
        actualizarPresentacion,
        cerrarPresentacion,
        idPresentacion,
        obraSocial,
    } = props;
    const comprobanteState = useComprobanteState();

    return (
        <div>
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
              estudiosAgregar={ estudiosAgregar }
              agregarEstudiosTabla={ agregarEstudiosTabla }
              idObraSocial={ obraSocial.id }
              crearOActualizarPresentacion={
                presentacion =>
                    actualizarPresentacion(presentacion, idPresentacion)
              }
              cerrarPresentacion={
                comprobante =>
                    cerrarPresentacion(comprobante, idPresentacion)
              }
              fecha={ fecha }
              listComponent={
                  <EstudiosDeUnaPresentacionList
                    estudios={ estudios }
                    importesTotales={ importesTotales }
                    gravado={ comprobanteState.gravado }
                    actualizarInput={ actualizarInput }
                    eliminarEstudio={ eliminarEstudio }
                  />
              }
            />
        </div>
    );
}

const { func, array, number } = PropTypes;

ModificarPresentacionPage.propTypes = {
    estudios: array.isRequired,
    estudiosAgregar: array.isRequired,
    obraSocial: object.isRequired,
    importesTotales: number.isRequired,
    fecha: string.isRequired,
    actualizarInput: func.isRequired,
    eliminarEstudio: func.isRequired,
    fetchEstudiosAgregar: func.isRequired,
    agregarEstudiosTabla: func.isRequired,
    actualizarPresentacion: func.isRequired,
    cerrarPresentacion: func.isRequired,
    idPresentacion: number.isRequired,
};

ModificarPresentacionPage.defaultProps = {
    estudios: initialState.presentacion.estudios,
    estudiosAgregar: initialState.presentacion.estudiosAgregar,
    obraSocial: initialState.presentacion.obraSocial,
    fecha: initialState.presentacion.fecha,
    importesTotales: initialState.presentacion.importesTotales,
};


function mapStateToProps(state) {
    return {
        estudios: state.presentacionReducer.presentacion.estudios,
        idPresentacion: state.presentacionReducer.presentacion.id,
        estudiosAgregar: state.presentacionReducer.presentacion.estudiosAgregar,
        obraSocial: state.presentacionReducer.presentacion.obraSocial,
        fecha: state.presentacionReducer.presentacion.fecha,
        importesTotales: state.presentacionReducer.presentacion.importesTotales,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actualizarInput: (index, idInput, value) =>
            dispatch({
                type: ACTUALIZAR_INPUT_ESTUDIO_DE_UNA_PRESENTACION, index, idInput, value,
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
        actualizarPresentacion: (presentacion, id) =>
            dispatch({
                type: ACTUALIZAR_PRESENTACION_OBRA_SOCIAL, presentacion, id,
            }),
        cerrarPresentacion: (comprobante, id) =>
            dispatch({
                type: CERRAR_PRESENTACION_OBRA_SOCIAL, comprobante, id,
            }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModificarPresentacionPage);
