import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap/dist/react-bootstrap';
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
        this.props.removeMedicacionEstudio(medicacion, seccion);
    }

    printMedicacionEstudio() {
        $('#medic').printThis({
            importStyle: true,
        });
    }

    render() {
        const { paciente, practica, fechaEstudio } = this.props;
        return (
            <div>
                { this.props.medicaciones.length === 0 &&
                    <h5>No hay medicaciones cargadas para este estudio</h5>
                }
                { this.props.medicaciones.length > 0 && <div id='medic'>
                    {
                        this.props.showPaciente &&
                        <Row>
                            <Col xs={ 8 }>
                                <ListGroup>
                                    <ListGroupItem>Paciente: { paciente && `${paciente.nombre}, ${paciente.apellido}` }</ListGroupItem>
                                    <ListGroupItem>Práctica: { practica && `${practica.descripcion}` }</ListGroupItem>
                                    <ListGroupItem>Fecha: { fechaEstudio && `${fechaEstudio}` }</ListGroupItem>
                                </ListGroup>
                            </Col>
                        </Row>
                    }
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
