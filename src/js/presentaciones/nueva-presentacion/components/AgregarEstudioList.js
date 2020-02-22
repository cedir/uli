/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AgreagarEstudioTableRow from './AgregarEstudioTableRow';
import initialState from '../estudiosSinPresentarAgregarReducerInitialState';

function AgregarEstudioList(props) {
    const { estudiosSinPresentarAgregar } = props;
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
                    estudiosSinPresentarAgregar.map(estudio => (
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
    estudiosSinPresentarAgregar: initialState.estudiosSinPresentarAgregar,
};

AgregarEstudioList.propTypes = {
    estudiosSinPresentarAgregar: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        estudiosSinPresentarAgregar:
            state.estudiosSinPresentarAgregarReducer.estudiosSinPresentarAgregar,
    };
}

export default connect(mapStateToProps, null)(AgregarEstudioList);
