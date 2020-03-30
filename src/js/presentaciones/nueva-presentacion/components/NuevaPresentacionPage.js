import React, { useState } from 'react';
import PropTypes, { object } from 'prop-types';
import { connect } from 'react-redux';
import TabNavigator from '../../components/TabNavigator';
import EstudiosDeUnaPresentacionList from '../../components/EstudiosDeUnaPresentacionList';
import { useComprobanteState } from '../../components/Comprobante';
import {
    ELIMINAR_ESTUDIO_SIN_PRESENTAR,
    ACTUALIZAR_INPUT_ESTUDIO_SIN_PRESENTAR,
    FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_AGREGAR,
 } from '../actionTypes';
import initialState from '../estudiosSinPresentarReducerInitialState';


function NuevaPresentacionPage(props) {
    const {
        actualizarInput,
        eliminarEstudio,
        estudios,
        importesTotales,
        fetchEstudiosAgregar,
        obraSocial,
    } = props;
    const comprobanteState = useComprobanteState();
    const [fecha, setFecha] = useState('');

    return (
        <div>
            <h1>
                {'Nueva Presentacion: '}
                <strong>{obraSocial.nombre !== undefined ? obraSocial.nombre : ''}</strong>
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
              idObraSocial={ obraSocial.id }
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

NuevaPresentacionPage.propTypes = {
    estudios: array.isRequired,
    obraSocial: object.isRequired,
    importesTotales: number.isRequired,
    actualizarInput: func.isRequired,
    eliminarEstudio: func.isRequired,
    fetchEstudiosAgregar: func.isRequired,
};

NuevaPresentacionPage.defaultProps = {
    estudios: initialState.nuevaPresentacion.estudios,
    obraSocial: initialState.nuevaPresentacion.obraSocial,
    importesTotales: initialState.nuevaPresentacion.importesTotales,
};


function mapStateToProps(state) {
    return {
        estudios: state.estudiosSinPresentarReducer.nuevaPresentacion.estudios,
        obraSocial: state.estudiosSinPresentarReducer.nuevaPresentacion.obraSocial,
        importesTotales: state.estudiosSinPresentarReducer.nuevaPresentacion.importesTotales,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actualizarInput: (index, idInput, value) => dispatch({
            type: ACTUALIZAR_INPUT_ESTUDIO_SIN_PRESENTAR, index, idInput, value,
        }),
        eliminarEstudio: index => dispatch({
            type: ELIMINAR_ESTUDIO_SIN_PRESENTAR, index,
        }),
        fetchEstudiosAgregar: idObraSocial =>
        dispatch({
            type: FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_AGREGAR,
            id: idObraSocial,
        }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NuevaPresentacionPage);
