import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { isEmpty } from 'lodash';
import EstudiosActionBar from './EstudiosActionBar';
import SearchEstudiosModal from './SearchEstudiosModal';
import EstudiosList from './EstudiosList';
import searchEstudiosFormInitialState from '../searchEstudiosFormInitialState';
import { FETCH_ESTUDIOS_DIARIOS, FETCH_ESTUDIOS_DIARIOS_CON_ASOCIADOS } from '../actionTypes';

function EstudiosDelDia({
    location,
    searchParams,
    fetchEstudios,
    fetchEstudiosConAsociados,
    actualPage,
    history,
    estudios,
    fromCaja,
}) {
    const [modalOpened, setModalOpened] = useState(false);
    const [printMode, setPrintMode] = useState(false);
    const estudiosRef = useRef(null);

    useEffect(() => {
        const { fecha, dniPaciente } = queryString.parse(location.search);
        const fetchEstudiosNew = fromCaja ? fetchEstudiosConAsociados : fetchEstudios;
        // if search is executed
        if (fecha && dniPaciente) {
            fetchEstudiosNew({
                fechaDesde: fecha,
                fechaHasta: fecha,
                dniPaciente,
            });
        } else if (!isEmpty(searchParams)) {
            // if a filter is applied
            fetchEstudiosNew({ ...searchParams, actualPage });
        }
    }, []);

    return (
        <div className='ibox-content'>
            <div className='pull-right'>
                <EstudiosActionBar
                  setModalOpened={ setModalOpened }
                  history={ history }
                  estudiosRef={ estudiosRef }
                  setPrintMode={ setPrintMode }
                  printMode={ printMode }
                  fromCaja={ fromCaja }
                />
            </div>
            <div className='clearfix' />
            { estudios.length > 0 && (
                <EstudiosList
                  history={ history }
                  estudiosRef={ estudiosRef }
                  printMode={ printMode }
                  fromCaja={ fromCaja }
                />
            ) }
            { estudios.length === 0 && (
                <div style={ { textAlign: 'center', marginTop: '10px' } }>
                    Su busqueda no ha arrojado resultados
                </div>
            ) }
            <SearchEstudiosModal
              fromCaja={ fromCaja }
              modalOpened={ modalOpened }
              setModalOpened={ setModalOpened }
            />
        </div>
    );
}

const { array, object, func, number, bool } = PropTypes;

EstudiosDelDia.defaultProps = {
    estudios: [],
};

EstudiosDelDia.propTypes = {
    estudios: array,
    actualPage: number,
    searchParams: object,
    fetchEstudios: func,
    fetchEstudiosConAsociados: func,
    history: object.isRequired,
    location: object.isRequired,
    fromCaja: bool.isRequired,
};

const selector = formValueSelector('searchEstudios');

function mapStateToProps(state) {
    let searchParams = selector(state, 'obraSocial', 'dniPaciente', 'nombrePaciente', 'apellidoPaciente',
        'medicoSolicitante', 'medicoActuante', 'fechaDesde', 'fechaHasta', 'practica');

    if (isEmpty(searchParams)) {
        searchParams = searchEstudiosFormInitialState;
    }
    return {
        estudios: state.estudiosReducer.estudios,
        searchParams,
        actualPage: state.estudiosReducer.actualPage,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchEstudios: fetchEstudiosParams =>
            dispatch({ type: FETCH_ESTUDIOS_DIARIOS, fetchEstudiosParams }),
        fetchEstudiosConAsociados: fetchEstudiosParams =>
            dispatch({ type: FETCH_ESTUDIOS_DIARIOS_CON_ASOCIADOS, fetchEstudiosParams }),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EstudiosDelDia));
