/* eslint-disable object-shorthand */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AgreagarEstudioTableRow from './AgregarEstudioTableRow';
import initialState from '../nueva-presentacion/estudiosSinPresentarReducerInitialState';

function AgregarEstudioList(props) {
    const { estudiosSinPresentarAgregar, onClickIcon, selected } = props;

    return (
        <table className='estudios-table'>
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Paciente</th>
                    <th>Practica</th>
                    <th>Medico Actuante</th>
                    <th>Medico Solicitante</th>
                </tr>
            </thead>
            <tbody>
                {
                    estudiosSinPresentarAgregar.map(estudio => (
                        <AgreagarEstudioTableRow
                          estudios={ estudio }
                          key={ estudio.id }
                          onClickIcon={ e => onClickIcon(e, estudio.id) }
                          selected={ !!selected.get(estudio.id) }
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
    onClickIcon: PropTypes.func,
    selected: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        estudiosSinPresentarAgregar:
            state.estudiosSinPresentarReducer.estudiosSinPresentarAgregar,
    };
}

export default connect(mapStateToProps, null)(AgregarEstudioList);
