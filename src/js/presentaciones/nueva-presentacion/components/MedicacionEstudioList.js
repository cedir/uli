import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap/dist/react-bootstrap';
import { DELETE_MEDICACION_ESTUDIO } from '../../../medicacion/actionTypes';
import MedicacionEstudioTableRow from './MedicacionEstudioTableRow';

const MedicacionEstudioList = ({ medicaciones, removeMedicacionEstudio }) => {
    const [importeTotal, setImporteTotal] = useState(0);

    useEffect(() => {
        let total = 0;
        if (medicaciones.length > 0) {
            const reducer = (importeAcum, currentValue) => importeAcum + currentValue;
            total = medicaciones
                .map(medicacion => parseFloat(medicacion.importe || medicacion.medicamento.importe))
                .reduce(reducer);
            setImporteTotal(total);
        }
    });

    return (
        <Fragment>
            <Table
              className='medicacion-table'
              striped
              responsive
            >
                <thead>
                    <tr>
                        <th>Medicamento</th>
                        <th>Importe</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    { medicaciones.map(medicacion => (
                        <MedicacionEstudioTableRow
                          key={ medicacion.id }
                          medicacion={ medicacion }
                          onClickDelete={ () => removeMedicacionEstudio(medicacion) }
                        />
                    )) }
                </tbody>
            </Table>
            <h3>{`Total: ${importeTotal.toFixed(2)} `}</h3>
        </Fragment>
    );
};

const { array, func } = PropTypes;

MedicacionEstudioList.propTypes = {
    medicaciones: array.isRequired,
    removeMedicacionEstudio: func.isRequired,
};

MedicacionEstudioList.defaultProps = {
    medicaciones: [],
};

function mapStateToProps(state) {
    return {
        medicaciones: state.medicacionReducer.medicaciones,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        removeMedicacionEstudio: medicacion =>
            dispatch({ type: DELETE_MEDICACION_ESTUDIO, medicacion }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MedicacionEstudioList);
