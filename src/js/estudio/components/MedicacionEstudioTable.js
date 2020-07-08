/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Button }
    from 'react-bootstrap/dist/react-bootstrap';
import '../../../../node_modules/print-this';
import MedicacionEstudioTableRow from './MedicacionEstudioTableRow';
import { DELETE_MEDICACION_ESTUDIO } from '../../medicacion/actionTypes';
import './MedicacionEstudioTable.css';
import { calculateImporteTotal } from '../../medicacion/medicacionHelper';

class MedicacionEstudiosTable extends React.Component {
    constructor(props) {
        super(props);
        this.removeMedicacionEstudio = this.removeMedicacionEstudio.bind(this);
        this.printMedicacionEstudio = this.printMedicacionEstudio.bind(this);
    }

    removeMedicacionEstudio(medicacion) {
        const { seccion } = this.props.params;
        this.props.removeMedicacionEstudio(medicacion);
    }

    printMedicacionEstudio() {
        $('#medic').printThis({
            importStyle: true,
        });
    }

    render() {
        return (
            <div>
                { this.props.medicaciones.length === 0 &&
                    <h5>No hay medicaciones cargadas para este estudio</h5>
                }
                { this.props.medicaciones.length > 0 && <div id='medic'>
                    <Table
                      striped
                      responsive
                      className='medicacion-table'
                    >
                        <thead>
                            <tr>
                                <th>Medicamento</th>
                                <th>Importe</th>
                                <th className='hide-on-print' >Eliminar</th>
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
                    <h3>Total: { calculateImporteTotal(this.props.medicaciones) }</h3>
                    <Button
                      className='hide-on-print'
                      bsStyle='primary'
                      onClick={ this.printMedicacionEstudio }
                    >
                      Imprimir medicacion
                    </Button>
                </div>
                }
            </div>
        );
    }
}

const { array, func, object } = PropTypes;

MedicacionEstudiosTable.propTypes = {
    medicaciones: array.isRequired,
    removeMedicacionEstudio: func.isRequired,
    params: object.isRequired,
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
