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
    printMode,
    fromCaja,
}) {
    const navigateToEstudioDetail = estudioId => history.push(`/estudios/detail/${estudioId}`);

    const compare = (e1, e2) => {
        if (e1.fecha === e2.fecha) {
            return e1.paciente.apellido < e2.paciente.apellido ? -1 : 1;
        }
        return 0;
    };

    const renderEstudios = estudio => (
        <EstudioListTableRow
          key={ estudio.id }
          estudio={ estudio }
          onRowClick={ navigateToEstudioDetail }
          printMode={ printMode }
          fromCaja={ fromCaja }
          history={ history }
        />
    );

    return (
        <div ref={ estudiosRef } className='div-estudios-table'>
            <Table striped responsive className='estudios-table'>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Nombre Paciente</th>
                        <th>Obra Social</th>
                        <th>Tipo de estudio</th>
                        <th>Estado</th>
                        { !fromCaja && <th>Medico actuante</th> }
                        { !printMode && <th>Medico solicitante</th> }
                        { fromCaja && <th> </th> }
                    </tr>
                </thead>
                <tbody>
                    { !printMode && estudios.map(renderEstudios) }
                    { printMode && estudios.sort(compare).map(renderEstudios) }
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
    printMode: bool.isRequired,
    fromCaja: bool.isRequired,
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
