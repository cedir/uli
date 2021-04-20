import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ContadorTable from './ContadorTable';
import { FETCH_CANTIDAD_TURNOS } from '../../actionTypes';

function ContadorTurnos({ fetchCantidadTurnos, usuarios, cantTurnos }) {
    const [tiempos, setTiempos] = useState([2, 4, 6]);

    useEffect(() => {
        fetchCantidadTurnos(usuarios, tiempos);
    });

    console.log(cantTurnos, setTiempos);

    return (
        <React.Fragment>
            <h1>Contador de Turnos</h1>
            <ContadorTable tiempos={ tiempos } usuarios={ usuarios } />
        </React.Fragment>
    );
}

const { array, func, object } = PropTypes;

ContadorTurnos.propTypes = {
    usuarios: array.isRequired,
    fetchCantidadTurnos: func.isRequired,
    cantTurnos: object.isRequired,
};

function mapStateToProps(state) {
    return {
        turnos: state.turnosReducer.turnos,
        usuarios: state.turnosReducer.usuarios,
        cantTurnos: state.turnosReducer.cantTurnos,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchCantidadTurnos: (usuarios, tiempos) =>
            dispatch({ type: FETCH_CANTIDAD_TURNOS, usuarios, tiempos }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContadorTurnos);
