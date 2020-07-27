import React from 'react';
import { Table } from 'react-bootstrap';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import AgreagarEstudioTableRow from './AgregarEstudioTableRow';

function AgregarEstudioList(props) {
    const {
        estudios, estudiosApiLoading, onClickIcon, selected, hiddenCheckBox,
    } = props;

    if (estudiosApiLoading) {
        return <CircularProgress />;
    }

    return (
        <Table
          className='estudios-table'
          striped
          bordered
          responsive='sm'
          size='sm'
        >
            <thead>
                <tr>
                    <th
                      className='short'
                      hidden={ hiddenCheckBox }
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
                          hiddenCheckBox={ hiddenCheckBox }
                        />
                    ))
                }
            </tbody>
        </Table>
    );
}

AgregarEstudioList.propTypes = {
    estudios: PropTypes.array.isRequired,
    estudiosApiLoading: PropTypes.bool,
    onClickIcon: PropTypes.func,
    selected: PropTypes.object,
    hiddenCheckBox: PropTypes.bool,
};

export default AgregarEstudioList;
