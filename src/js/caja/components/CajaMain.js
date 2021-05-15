import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { formValueSelector } from 'redux-form';

import CajaActionBar from './CajaActionBar';
import SearchCajaModal from './search/SearchCajaModal';
import ListadoMovimientosTable from './ListadoMovimientosTable';

import { FETCH_MOVIMIENTOS_CAJA } from '../actionTypes';

function CajaMain({
    fetchMovimientosCaja,
    movimientos,
    history,
    searchParams,
    pageNumber,
}) {
    const [modalOpened, setModalOpened] = useState(false);

    useEffect(() => {
        fetchMovimientosCaja(searchParams);
    }, []);

    const getMontoAcumulado = movimientos.length > 0 ? movimientos[0].monto_acumulado : '0';

    return (
        <div className='ibox-content'>
            <CajaActionBar
              montoAcumulado={ getMontoAcumulado }
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
    movimientos: array.isRequired,
    fetchMovimientosCaja: func.isRequired,
    history: object.isRequired,
    searchParams: object.isRequired,
    pageNumber: number.isRequired,
};

const selector = formValueSelector('searchCaja');

function mapStateToProps(state) {
    const searchParams = selector(state, 'tipoMovimiento', 'concepto', 'medicoActuante',
        'fechaDesde', 'fechaHasta', 'incluirEstudio');

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
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CajaMain);
