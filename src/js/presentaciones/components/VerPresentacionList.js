import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import VerPresentacionTableRow from './VerPresentacionTableRow';

function VerPresentacionList(props) {
    const { estudiosDeUnaPresentacion } = props;
    return (
        <table className='estudios-table'>
            <thead>
                <tr className='titles'>
                    <th>Fecha</th>
                    <th>Orden</th>
                    <th>Paciente</th>
                    <th>Practica</th>
                    <th>Actuante</th>
                    <th>Solicitante</th>
                    <th>Totales</th>
                </tr>
            </thead>
            <tbody>
                { estudiosDeUnaPresentacion.map(estudio => (
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
    estudiosDeUnaPresentacion: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        estudiosDeUnaPresentacion: state.presentacionReducer.estudiosDeUnaPresentacion,
    };
}

export default
    connect(mapStateToProps, null)(VerPresentacionList);
