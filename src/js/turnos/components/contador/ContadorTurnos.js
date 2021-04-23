import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ContadorTable from './ContadorTable';
import { FETCH_CANTIDAD_TURNOS } from '../../actionTypes';
import ContadorModalFecha from './ContadorModalFecha';

function ContadorTurnos({ fetchCantidadTurnos, usuarios, cantidadTurnos }) {
    useEffect(() => {
        fetchCantidadTurnos(usuarios, fechas);
    }, []);

    const dateToStr = date => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    const [modalOpened, setModalOpened] = useState(false);

    const fecha = new Date();
    const [date1, setDate1] = useState(dateToStr(fecha));

    fecha.setDate(fecha.getDate() - 31);
    const [date2, setDate2] = useState(dateToStr(fecha));

    fecha.setDate(fecha.getDate() - 30);
    const [date3, setDate3] = useState(dateToStr(fecha));

    const fechas = [date1, date2, date3];
    const setFechas = [setDate1, setDate2, setDate3];

    const today = new Date();

    const getDays = date => Math.ceil((today - (new Date(date))) / (1000 * 60 * 60 * 24));
    // const getDays = date => console.log(date, today);


    return (
        <React.Fragment>
            <h1>Contador de Turnos</h1>
            {
                fechas.map((date, i) => (
                    <ContadorModalFecha
                      modalOpened={ modalOpened }
                      setModalOpened={ setModalOpened }
                      date={ date }
                      setDate={ setFechas[i] }
                    />),
                  )
            }
            <ContadorTable
              tiempos={ fechas.map(date => getDays(date)) }
              usuarios={ usuarios }
              cantidadTurnos={ cantidadTurnos }
              setModalOpened={ setModalOpened }
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
        fetchCantidadTurnos: (usuarios, fechas) =>
            dispatch({ type: FETCH_CANTIDAD_TURNOS, usuarios, fechas }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContadorTurnos);
