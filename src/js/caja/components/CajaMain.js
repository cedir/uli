import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import CajaActionBar from './CajaActionBar';
import SearchCajaModal from './search/SearchCajaModal';
import ListadoMovimientosTable from './ListadoMovimientosTable';

import { FETCH_MOVIMIENTOS_CAJA } from '../actionTypes';

class CajaMain extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalOpened: false,
        };

        this.openSearchCajaModal = this.openSearchCajaModal.bind(this);
        this.closeSearchCajaModal = this.closeSearchCajaModal.bind(this);
        this.getMontoAcumulado = this.getMontoAcumulado.bind(this);
        this.props.fetchMovimientosCaja();
    }

    getMontoAcumulado() {
        return this.props.movimientos.length > 0 ? this.props.movimientos[0].monto_acumulado : '0';
    }

    openSearchCajaModal() {
        this.setState({ modalOpened: true });
    }

    closeSearchCajaModal() {
        this.setState({ modalOpened: false });
    }


    render() {
        return (
            <div className='ibox-content'>
                <div className='pull-right'>
                    <CajaActionBar
                      montoAcumulado={
                        this.getMontoAcumulado()
                    }
                      openSearchCajaModal={ this.openSearchCajaModal }
                    />
                </div>
                <div className='clearfix' />
                <ListadoMovimientosTable movimientos={ this.props.movimientos } />
                <SearchCajaModal
                  modalOpened={ this.state.modalOpened }
                  closeModal={ this.closeSearchCajaModal }
                />
            </div>
        );
    }
}

const { array, func } = propTypes;

CajaMain.propTypes = {
    movimientos: array.isRequired,
    fetchMovimientosCaja: func.isRequired,
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
