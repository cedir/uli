import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table }
    from 'react-bootstrap/dist/react-bootstrap';

import MedicacionEstudioTableRow from './MedicacionEstudioTableRow';
import { DELETE_MEDICACION_ESTUDIO } from '../../medicacion/actionTypes';

class MedicacionEstudiosTable extends React.Component {
    constructor(props) {
        super(props);

        this.removeMedicacionEstudio = this.removeMedicacionEstudio.bind(this);
    }

    removeMedicacionEstudio(medicacion) {
        this.props.removeMedicacionEstudio(medicacion);
    }

    render() {
        return (
            <div style={ { maxHeight: '250px', marginBottom: '25px', overflowX: 'hidden', overflowY: 'auto' } }>
                { this.props.medicaciones.length === 0 &&
                    <h5>No hay medicaciones para este estudio</h5>
                }
                { this.props.medicaciones.length > 0 &&
                    <Table striped responsive style={ { marginTop: '20px' } }>
                        <thead>
                            <tr>
                                <th>Medicamento</th>
                                <th>Importe</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.props.medicaciones.map(medicacion => (
                                <MedicacionEstudioTableRow
                                  key={ medicacion.id }
                                  medicacion={ medicacion }
                                  onRowClick={ this.removeMedicacionEstudio }
                                />
                            )) }
                        </tbody>
                    </Table>
                }
            </div>
        );
    }
}

const { array, func } = PropTypes;

MedicacionEstudiosTable.propTypes = {
    medicaciones: array.isRequired,
    removeMedicacionEstudio: func.isRequired,
};

MedicacionEstudiosTable.defaultProps = {
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicacionEstudiosTable);
