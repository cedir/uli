/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AgreagarEstudioTableRow from './AgregarEstudioTableRow';
import initialState from '../estudiosSinPresentarReducerInitialState';

function AgregarEstudioList(props) {
    const { estudiosSinPresentar } = props;
    return (
        <table className='agregar-estudio'>
            <thead>
                <th className='first' />
                <th>Fecha</th>
                <th>Paciente</th>
                <th>Practica</th>
                <th>Medico Actuante</th>
                <th>Medico Solicitante</th>
            </thead>
            <tbody>
                {
                    estudiosSinPresentar.map(estudio => (
                        <AgreagarEstudioTableRow
                          estudios={ estudio }
                        />
                    ))
                }
            </tbody>
        </table>
    );
}

AgregarEstudioList.defaultProps = {
    estudiosSinPresentar: initialState.estudiosSinPresentar,
};

AgregarEstudioList.propTypes = {
    estudiosSinPresentar: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        estudiosSinPresentar: state.estudiosSinPresentarReducer.estudiosSinPresentar,
    };
}

export default connect(mapStateToProps, null)(AgregarEstudioList);
