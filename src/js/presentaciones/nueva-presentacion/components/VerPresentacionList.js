import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import VerPresentacionTableRow from './VerPresentacionTableRow';

function VerPresentacionList(props) {
    const { estudiosSinPresentar } = props;
    return (
        <table className='estudios-table'>
            <thead>
                <tr className='titles'>
                    <th>Fecha</th>
                    <th>Orden</th>
                    <th>Afiliado</th>
                    <th>Paciente</th>
                    <th>Practica</th>
                    <th>Actuante</th>
                    <th>Totales</th>
                </tr>
            </thead>
            <tbody>
                { estudiosSinPresentar.map(estudio => (
                    <VerPresentacionTableRow
                      estudio={ estudio }
                      key={ estudio.id }
                    />
                )) }
            </tbody>
        </table>
    );
}

VerPresentacionList.propTypes = {
    estudiosSinPresentar: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        estudiosSinPresentar: state.estudiosSinPresentarReducer.estudiosSinPresentar,
    };
}

export default
    connect(mapStateToProps, null)(VerPresentacionList);
