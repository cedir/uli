import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Col, Row } from 'react-bootstrap/dist/react-bootstrap';
import '../../../../node_modules/print-this';
import MedicacionEstudioTableRow from './MedicacionEstudioTableRow';
import { DELETE_MEDICACION_ESTUDIO } from '../../medicacion/actionTypes';
import './MedicacionEstudioTable.css';
import { calculateImporteTotal } from '../../medicacion/medicacionHelper';

class MedicacionEstudiosTable extends React.Component {
    constructor(props) {
        super(props);
        this.removeMedicacionEstudio = this.removeMedicacionEstudio.bind(this);
        this.filtrarMedicacion = this.filtrarMedicacion.bind(this);
    }

    removeMedicacionEstudio(medicacion) {
        const { seccion } = this.props.params;
        this.props.removeMedicacionEstudio(medicacion, seccion);
    }

    filtrarMedicacion(medicaciones) {
        return this.props.filtrarEspecificos ? medicaciones.filter(medicacion => medicacion.medicamento.tipo !== 'Mat Esp') : medicaciones;
    }

    render() {
        const { paciente, practica, fechaEstudio } = this.props;
        const medicaciones = this.filtrarMedicacion(this.props.medicaciones);
        return (
            <div>
                { medicaciones.length === 0 &&
                    <h5>No hay medicaciones cargadas para este estudio</h5>
                }
                { medicaciones.length > 0 && <div id='medic'>
                    {
                        this.props.showPaciente &&
                        <Row>
                            <Col xs={ 8 }>
                                <Table condensed striped bordered>
                                    <tbody>
                                        <tr>
                                            <td>Paciente</td>
                                            { paciente && <td>{ `${paciente.nombre}, ${paciente.apellido}` }</td> }
                                        </tr>
                                        <tr>
                                            <td>Práctica</td>
                                            { practica && <td> { `${practica.descripcion}` }</td> }
                                        </tr>
                                        <tr>
                                            <td>Fecha</td>
                                            { fechaEstudio && <td> {`${fechaEstudio}`}</td> }
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    }
                    <Table
                      striped
                      responsive
                      condensed
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
                            { medicaciones.map(medicacion => (
                                <MedicacionEstudioTableRow
                                  key={ medicacion.id }
                                  medicacion={ medicacion }
                                  onRowClick={ this.removeMedicacionEstudio }
                                />
                            )) }
                        </tbody>
                    </Table>
                    <h3>Total: { calculateImporteTotal(medicaciones) }</h3>
                </div>
                }
            </div>
        );
    }
}

const { array, func, object, bool, string } = PropTypes;

MedicacionEstudiosTable.propTypes = {
    medicaciones: array.isRequired,
    removeMedicacionEstudio: func.isRequired,
    params: object.isRequired,
    showPaciente: bool.isRequired,
    paciente: object,
    practica: object,
    fechaEstudio: string,
    filtrarEspecificos: bool,
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
        removeMedicacionEstudio: (medicacion, seccion) =>
            dispatch({ type: DELETE_MEDICACION_ESTUDIO, medicacion, seccion }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MedicacionEstudiosTable);
