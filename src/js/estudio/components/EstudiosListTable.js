import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap/dist/react-bootstrap';
import EstudioListTableRow from './EstudioListTableRow';
import './EstudiosTable.css';

function EstudiosListTable({ estudios, history, estudiosRef }) {
    const navigateToEstudioDetail = estudioId => history.push(`/estudios/detail/${estudioId}`);

    return (
        <div>
            <Table striped responsive className='estudios-table' ref={ estudiosRef }>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Nombre Paciente</th>
                        <th>Obra Social</th>
                        <th>Tipo de estudio</th>
                        <th>Medico actuante</th>
                        <th>Medico solicitante</th>
                    </tr>
                </thead>
                <tbody>
                    { estudios.map(estudio => (
                        <EstudioListTableRow
                          key={ estudio.id }
                          estudio={ estudio }
                          onRowClick={ navigateToEstudioDetail }
                        />
                    )) }
                </tbody>
            </Table>
        </div>
    );
}

const { array, object } = PropTypes;

EstudiosListTable.propTypes = {
    history: object.isRequired,
    estudios: array.isRequired,
    estudiosRef: object,
};

EstudiosListTable.defaultProps = {
    estudios: [],
};

function mapStateToProps(state) {
    return {
        estudios: state.estudiosReducer.estudios,
    };
}

export default connect(mapStateToProps, null)(EstudiosListTable);
