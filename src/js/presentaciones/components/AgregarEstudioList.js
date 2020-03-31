/* eslint-disable object-shorthand */
import React from 'react';
import PropTypes from 'prop-types';
import AgreagarEstudioTableRow from './AgregarEstudioTableRow';

function AgregarEstudioList(props) {
    const { estudios, onClickIcon, selected } = props;

    return (
        <table className='estudios-table'>
            <thead>
                <tr>
                    <th
                      className='short'
                    />
                    <th>Fecha</th>
                    <th>Paciente</th>
                    <th>Practica</th>
                    <th>Medico Actuante</th>
                    <th>Medico Solicitante</th>
                </tr>
            </thead>
            <tbody>
                {
                    estudios.map(estudio => (
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

AgregarEstudioList.propTypes = {
    estudios: PropTypes.array.isRequired,
    onClickIcon: PropTypes.func,
    selected: PropTypes.object,
};

export default AgregarEstudioList;