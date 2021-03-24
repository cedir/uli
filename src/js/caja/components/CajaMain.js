import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import CajaActionBar from './CajaActionBar';
import SearchCajaModal from './search/SearchCajaModal';
import ListadoMovimientosTable from './ListadoMovimientosTable';

import { FETCH_MOVIMIENTOS_CAJA } from '../actionTypes';

function CajaMain({ fetchMovimientosCaja, movimientos, history }) {
    const [modalOpened, setModalOpened] = useState(false);

    useEffect(() => {
        fetchMovimientosCaja();
    }, []);

    const getMontoAcumulado = movimientos.length > 0 ? movimientos[0].monto_acumulado : '0';

    const openSearchCajaModal = () => {
        setModalOpened(true);
    };

    const closeSearchCajaModal = () => {
        setModalOpened(false);
    };


    return (
        <div className='ibox-content'>
            <div className='pull-right'>
                <CajaActionBar
                  montoAcumulado={ getMontoAcumulado }
                  openSearchCajaModal={ openSearchCajaModal }
                  history={ history }
                />
            </div>
            <div className='clearfix' />
            <ListadoMovimientosTable movimientos={ movimientos } />
            <SearchCajaModal
              modalOpened={ modalOpened }
              closeModal={ closeSearchCajaModal }
            />
        </div>
    );
}

const { array, func, object } = propTypes;

CajaMain.propTypes = {
    movimientos: array.isRequired,
    fetchMovimientosCaja: func.isRequired,
    history: object.isRequired,
};

function mapStateToProps(state) {
    return {
        movimientos: state.cajaReducer.movimientos,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchMovimientosCaja: () =>
            dispatch({ type: FETCH_MOVIMIENTOS_CAJA }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CajaMain);
