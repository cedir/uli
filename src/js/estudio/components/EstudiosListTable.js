import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap/dist/react-bootstrap';
import EstudioListTableRow from './EstudioListTableRow';
import './EstudiosTable.css';

function EstudiosListTable({
    estudios,
    history,
    estudiosRef,
    showMedicoSolicitante,
}) {
    const navigateToEstudioDetail = estudioId => history.push(`/estudios/detail/${estudioId}`);
    return (
        <div ref={ estudiosRef } className='div-estudios-table'>
            <Table striped responsive className='estudios-table'>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Nombre Paciente</th>
                        <th>Obra Social</th>
                        <th>Tipo de estudio</th>
                        <th>Medico actuante</th>
                        { showMedicoSolicitante && <th>Medico solicitante</th> }
                    </tr>
                </thead>
                <tbody>
                    { estudios.map(estudio => (
                        <EstudioListTableRow
                          key={ estudio.id }
                          estudio={ estudio }
                          onRowClick={ navigateToEstudioDetail }
                          showMedicoSolicitante={ showMedicoSolicitante }
                        />
                    )) }
                </tbody>
            </Table>
        </div>
    );
}

const { array, object, bool } = PropTypes;

EstudiosListTable.propTypes = {
    history: object.isRequired,
    estudios: array.isRequired,
    estudiosRef: object,
    showMedicoSolicitante: bool.isRequired,
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
