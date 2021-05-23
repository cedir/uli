import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { formValueSelector, change } from 'redux-form';

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
    update,
}) {
    const [modalOpened, setModalOpened] = useState(false);

    useEffect(() => {
        update('fechaDesde', initialValues.fechaDesde);
        update('fechaHasta', initialValues.fechaHasta);

        fetchMovimientosCaja(searchParams);
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
              updatePageNumber={ pageNum => fetchMovimientosCaja(searchParams, pageNum) }
            />
            <SearchCajaModal
              modalOpened={ modalOpened }
              closeModal={ () => setModalOpened(false) }
              fetchMovimientosCaja={ fetchMovimientosCaja }
            />
        </div>
    );
}

const { array, func, object, number } = propTypes;

CajaMain.propTypes = {
    update: func.isRequired,
    fetchMovimientosCaja: func.isRequired,
    history: object.isRequired,
    searchParams: object.isRequired,
    pageNumber: number.isRequired,
    movimientos: array.isRequired,
};

const selector = formValueSelector('searchCaja');

function mapStateToProps(state) {
    const searchParams = selector(state, 'tipoMovimiento', 'concepto', 'medicoActuante',
        'fechaDesde', 'fechaHasta', 'incluirEstudio', 'paciente');

    return {
        movimientos: state.cajaReducer.movimientos,
        pageNumber: state.cajaReducer.pageNumber,
        searchParams,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchMovimientosCaja: (searchParams, pageNumber = 1) =>
            dispatch({ type: FETCH_MOVIMIENTOS_CAJA, searchParams, pageNumber }),
        update: (name, value) => dispatch(change('searchCaja', name, value)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CajaMain);
