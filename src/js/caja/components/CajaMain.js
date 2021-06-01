import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { formValueSelector, change } from 'redux-form';
import { isEmpty } from 'lodash';

import CajaActionBar from './CajaActionBar';
import SearchCajaModal from './search/SearchCajaModal';
import ListadoMovimientosTable from './ListadoMovimientosTable';

import { FETCH_MOVIMIENTOS_CAJA } from '../actionTypes';
import initialValues from '../cajaSearchFormInitialState';

function CajaMain({
    fetchMovimientosCaja,
    movimientos,
    history,
    searchParams,
    pageNumber,
    updateForm,
    ordering,
}) {
    const [modalOpened, setModalOpened] = useState(false);

    useEffect(() => {
        updateForm('fechaDesde', initialValues.fechaDesde);
        updateForm('fechaHasta', initialValues.fechaHasta);

        if (!isEmpty(searchParams)) {
            fetchMovimientosCaja(searchParams, ordering);
        } else {
            fetchMovimientosCaja(initialValues, ordering);
        }
    }, []);

    return (
        <div className='ibox-content'>
            <CajaActionBar
              openSearchCajaModal={ () => setModalOpened(true) }
              searchParams={ searchParams }
              history={ history }
            />
            <ListadoMovimientosTable
              movimientos={ movimientos }
              pageNumber={ pageNumber }
              updatePageNumber={ pageNum => fetchMovimientosCaja(searchParams, ordering, pageNum) }
              sortMovimientos={ name => fetchMovimientosCaja(searchParams, name) }
            />
            <SearchCajaModal
              modalOpened={ modalOpened }
              closeModal={ () => setModalOpened(false) }
              fetchMovimientosCaja={ params => fetchMovimientosCaja(params, ordering) }
            />
        </div>
    );
}

const { array, func, object, number, string } = propTypes;

CajaMain.propTypes = {
    updateForm: func.isRequired,
    fetchMovimientosCaja: func.isRequired,
    history: object.isRequired,
    searchParams: object.isRequired,
    pageNumber: number.isRequired,
    movimientos: array.isRequired,
    ordering: string.isRequired,
};

const selector = formValueSelector('searchCaja');

function mapStateToProps(state) {
    const searchParams = selector(state, 'tipoMovimiento', 'concepto', 'medicoActuante',
        'fechaDesde', 'fechaHasta', 'incluirEstudio', 'paciente');

    return {
        movimientos: state.cajaReducer.movimientos,
        pageNumber: state.cajaReducer.pageNumber,
        searchParams,
        ordering: state.cajaReducer.ordering,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchMovimientosCaja: (searchParams, name, pageNumber = 1) =>
            dispatch({ type: FETCH_MOVIMIENTOS_CAJA, searchParams, pageNumber, ordering: name }),
        updateForm: (name, value) => dispatch(change('searchCaja', name, value)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CajaMain);
