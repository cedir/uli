import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ContadorTable from './ContadorTable';
import { FETCH_CANTIDAD_TURNOS } from '../../actionTypes';

function ContadorTurnos({ fetchCantidadTurnos, usuarios, cantidadTurnos }) {
    const [tiempos, setTiempos] = useState([2, 4, 6]);

    useEffect(() => {
        fetchCantidadTurnos(usuarios, tiempos);
        console.log('ey');
    }, []);

    console.log('setTiempos', setTiempos);

    return (
        <React.Fragment>
            <h1>Contador de Turnos</h1>
            <ContadorTable
              tiempos={ tiempos }
              usuarios={ usuarios }
              cantidadTurnos={ cantidadTurnos }
              // tiempos={ [5, 4, 3] }
              // usuarios={ ['dani', 'lynda'] }
              // cantidadTurnos={ { dani: [4, 3, 5], lynda: [6, 7, 8] } }
            />
        </React.Fragment>
    );
}

const { array, func, object } = PropTypes;

ContadorTurnos.propTypes = {
    usuarios: array.isRequired,
    fetchCantidadTurnos: func.isRequired,
    cantidadTurnos: object.isRequired,
};

function mapStateToProps(state) {
    return {
        usuarios: state.turnosReducer.usuarios,
        cantidadTurnos: state.turnosReducer.cantidadTurnos,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchCantidadTurnos: (usuarios, tiempos) =>
            dispatch({ type: FETCH_CANTIDAD_TURNOS, usuarios, tiempos }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContadorTurnos);
