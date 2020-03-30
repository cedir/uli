import React from 'react';
import PropTypes, { object, string } from 'prop-types';
import { connect } from 'react-redux';
import TabNavigator from '../../components/TabNavigator';
import EstudiosDeUnaPresentacionList from '../../components/EstudiosDeUnaPresentacionList';
import { useComprobanteState } from '../../components/Comprobante';
import {
    ELIMINAR_ESTUDIO_DE_UNA_PRESENTACION,
    ACTUALIZAR_INPUT_ESTUDIO_DE_UNA_PRESENTACION,
    FETCH_ESTUDIOS_DE_UNA_PRESENTACION_OBRA_SOCIAL_AGREGAR,
 } from '../../actionTypes';
import initialState from '../../presentacionReducerInitialState';

function ModificarPresentacionPage(props) {
    const {
        actualizarInput,
        eliminarEstudio,
        estudios,
        importesTotales,
        fecha,
        fetchEstudiosDeUnaPresentacionAgregar,
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
              fetchEstudiosAgregar={ fetchEstudiosDeUnaPresentacionAgregar }
              idObraSocial={ obraSocial.id }
              fecha={ fecha }
              listComponent={
                  <EstudiosDeUnaPresentacionList
                    estudios={ estudios }
                    suma={ importesTotales }
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
    obraSocial: object.isRequired,
    importesTotales: number.isRequired,
    fecha: string.isRequired,
    actualizarInput: func.isRequired,
    eliminarEstudio: func.isRequired,
    fetchEstudiosDeUnaPresentacionAgregar: func.isRequired,
};

ModificarPresentacionPage.defaultProps = {
    estudios: initialState.presentacion.estudios,
    obraSocial: initialState.presentacion.obraSocial,
    fecha: initialState.presentacion.fecha,
    importesTotales: initialState.presentacion.importesTotales,
};


function mapStateToProps(state) {
    return {
        estudios: state.presentacionReducer.presentacion.estudios,
        obraSocial: state.presentacionReducer.presentacion.obraSocial,
        fecha: state.presentacionReducer.presentacion.fecha,
        importesTotales: state.presentacionReducer.presentacion.importesTotales,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actualizarInput: (index, idInput, value) => dispatch({
            type: ACTUALIZAR_INPUT_ESTUDIO_DE_UNA_PRESENTACION, index, idInput, value,
        }),
        eliminarEstudio: index => dispatch({
            type: ELIMINAR_ESTUDIO_DE_UNA_PRESENTACION, index,
        }),
        fetchEstudiosDeUnaPresentacionAgregar: idObraSocial =>
        dispatch({
            type: FETCH_ESTUDIOS_DE_UNA_PRESENTACION_OBRA_SOCIAL_AGREGAR,
            id: idObraSocial,
        }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModificarPresentacionPage);
