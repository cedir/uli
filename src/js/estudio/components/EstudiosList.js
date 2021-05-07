import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { Pagination }
    from 'react-bootstrap/dist/react-bootstrap';
import EstudiosListTable from './EstudiosListTable';
import { FETCH_ESTUDIOS_DIARIOS, FETCH_OBRAS_SOCIALES, FETCH_ESTUDIOS_DIARIOS_CON_ASOCIADOS } from '../actionTypes';
import estudioReducerInitialState from '../estudioReducerInitialState';

function EstudiosList({
    searchParams,
    actualPage,
    fetchEstudios,
    fetchEstudiosConAsociados,
    resultPages,
    history,
    estudiosRef,
    printMode,
    fromCaja,
}) {
    const searchEstudios = (actPage) => {
        const fetchEstudiosN = fromCaja ? fetchEstudiosConAsociados : fetchEstudios;
        fetchEstudiosN({ ...searchParams, actualPage: actPage });
    };

    return (
        <div>
            <EstudiosListTable
              history={ history }
              estudiosRef={ estudiosRef }
              printMode={ printMode }
              fromCaja={ fromCaja }
            />
            <div style={ { textAlign: 'center' } }>
                {resultPages > 1 && (
                    <Pagination
                      prev
                      next
                      first
                      last
                      ellipsis
                      boundaryLinks
                      items={ resultPages }
                      maxButtons={ 5 }
                      activePage={ actualPage }
                      onSelect={ searchEstudios }
                    />
                )}
            </div>
        </div>
    );
}

const { number, func, object, bool } = PropTypes;

EstudiosList.propTypes = {
    history: object,
    searchParams: object,
    fetchEstudios: func,
    fetchEstudiosConAsociados: func,
    resultPages: number,
    actualPage: number,
    estudiosRef: object,
    printMode: bool.isRequired,
    fromCaja: bool.isRequired,
};

EstudiosList.defaultProps = {
    searchParams: estudioReducerInitialState.searchParams,
    resultPages: 0,
    actualPage: 0,
};

const selector = formValueSelector('searchEstudios');

function mapStateToProps(state) {
    return {
        resultPages: state.estudiosReducer.resultPages,
        actualPage: state.estudiosReducer.actualPage,
        searchParams: selector(state, 'obraSocial', 'dniPaciente', 'nombrePaciente',
            'apellidoPaciente', 'medicoSolicitante', 'medicoActuante', 'fechaDesde', 'fechaHasta'),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchEstudios: fetchEstudiosParams =>
            dispatch({ type: FETCH_ESTUDIOS_DIARIOS, fetchEstudiosParams }),
        fetchEstudiosConAsociados: fetchEstudiosParams =>
            dispatch({ type: FETCH_ESTUDIOS_DIARIOS_CON_ASOCIADOS, fetchEstudiosParams }),
        fetchObrasSociales: () => dispatch({ type: FETCH_OBRAS_SOCIALES }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EstudiosList);
