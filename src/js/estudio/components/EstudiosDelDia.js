import React, { useState, useEffect } from 'react';
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
import { FETCH_ESTUDIOS_DIARIOS } from '../actionTypes';

function EstudiosDelDia({ location, searchParams, fetchEstudios, actualPage, history, estudios }) {
    const [modalOpened, setModalOpened] = useState(false);

    useEffect(() => {
        const { fecha, dniPaciente } = queryString.parse(location.search);
        // if search is executed
        if (fecha && dniPaciente) {
            fetchEstudios({
                fechaDesde: fecha,
                fechaHasta: fecha,
                dniPaciente,
            });
        } else if (!isEmpty(searchParams)) {
            // if a filter is applied
            fetchEstudios({ ...searchParams, actualPage });
        }
    }, []);

    return (
        <div className='ibox-content'>
            <div className='pull-right'>
                <EstudiosActionBar
                  setModalOpened={ setModalOpened }
                  history={ history }
                />
            </div>
            <div className='clearfix' />
            { estudios.length > 0 && <EstudiosList history={ history } />}
            { estudios.length === 0 && (
                <div style={ { textAlign: 'center', marginTop: '10px' } }>
                    Su busqueda no ha arrojado resultados
                </div>
            ) }
            <SearchEstudiosModal
              modalOpened={ modalOpened }
              setModalOpened={ setModalOpened }
            />
        </div>
    );
}

const { array, object, func, number } = PropTypes;

EstudiosDelDia.defaultProps = {
    estudios: [],
};

EstudiosDelDia.propTypes = {
    estudios: array,
    actualPage: number,
    searchParams: object,
    fetchEstudios: func,
    history: object.isRequired,
    location: object.isRequired,
};

const selector = formValueSelector('searchEstudios');

function mapStateToProps(state) {
    let searchParams = selector(state, 'obraSocial', 'dniPaciente', 'nombrePaciente',
        'apellidoPaciente', 'medicoSolicitante', 'medicoActuante', 'fechaDesde', 'fechaHasta');

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
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EstudiosDelDia));
