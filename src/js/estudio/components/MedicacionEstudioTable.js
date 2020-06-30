/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Button }
    from 'react-bootstrap/dist/react-bootstrap';
import '../../../../node_modules/print-this';
import MedicacionEstudioTableRow from './MedicacionEstudioTableRow';
import { DELETE_MEDICACION_ESTUDIO } from '../../medicacion/actionTypes';
import { UPDATE_MEDICACION_ESTUDIO_MODIFICAR } from '../../presentaciones/modificar-presentacion/actionTypes';
import { UPDATE_MEDICACION_ESTUDIO_NUEVA } from '../../presentaciones/nueva-presentacion/actionTypes';
import './MedicacionEstudioTable.css';

class MedicacionEstudiosTable extends React.Component {
    constructor(props) {
        super(props);
        this.removeMedicacionEstudio = this.removeMedicacionEstudio.bind(this);
        this.calculateImporteTotal = this.calculateImporteTotal.bind(this);
        this.printMedicacionEstudio = this.printMedicacionEstudio.bind(this);
    }

    removeMedicacionEstudio(medicacion) {
        const { seccion } = this.props.params;
        if (seccion === 'modificarPresentacion') {
            this.props.deleteMedicacionEstudioModificar(
                medicacion.estudio_id, medicacion.importe,
            );
        }
        if (seccion === 'nuevaPresentacion') {
            this.props.deleteMedicacionEstudioNueva(
                medicacion.estudio_id, medicacion.importe,
            );
        }
        this.props.removeMedicacionEstudio(medicacion);
    }

    calculateImporteTotal() {
        const medicaciones = this.props.medicaciones;
        let importeTotal;
        if (medicaciones.length > 0) {
            importeTotal = medicaciones
                .map(medicacion => parseFloat(medicacion.importe || medicacion.medicamento.importe))
                .reduce((importeAcum, currentImporte) => importeAcum + currentImporte);
        }
        return importeTotal.toFixed(2);
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
                    <h3>Total: { this.calculateImporteTotal() }</h3>
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
    deleteMedicacionEstudioModificar: func.isRequired,
    deleteMedicacionEstudioNueva: func.isRequired,
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
        deleteMedicacionEstudioModificar: (idEstudio, importeMedicacion) =>
            dispatch({
                type: UPDATE_MEDICACION_ESTUDIO_MODIFICAR,
                idEstudio, importeMedicacion,
            }),
        deleteMedicacionEstudioNueva: (idEstudio, importeMedicacion) =>
            dispatch({
                type: UPDATE_MEDICACION_ESTUDIO_NUEVA,
                idEstudio, importeMedicacion,
            }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MedicacionEstudiosTable);
