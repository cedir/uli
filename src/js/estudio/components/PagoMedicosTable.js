import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, getFormValues, change } from 'redux-form';
import { Table, Button } from 'react-bootstrap/dist/react-bootstrap';
import { isEmpty } from 'lodash';

import InputRF from '../../utilities/InputRF';
import { required } from '../../utilities/reduxFormValidators';
import './PagoMedicosTable.css';

function parseToNumber(value) {
    return parseFloat(value) || 0;
}

class PagoMedicosTable extends Component {
    componentDidMount() {
        $('.footable').footable({ paginate: false, forceRefresh: true });
        $('.footable').trigger('footable_redraw');
    }

    componentDidUpdate() {
        $('.footable').footable({ paginate: false, forceRefresh: true });
        $('.footable').trigger('footable_redraw');
    }

    resetImporteToOriginalValue(estudioId) {
        const estudioToReset = this.props.estudiosImpagos
            .filter(estudio => estudio.id === estudioId)[0];
        // since the estudio has not the importe yet (waiting api), set
        // a custom importe just for the sake of showing the reset functionality.
        this.props.resetImporteForEstudio(estudioId, parseFloat(estudioToReset.total));
    }

    render() {
        return (
            <form className='pago-medicos-list'>
                <Table className='footable table table-stripped toggle-arrow-tiny'>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Fecha Cobro</th>
                            <th>Obra Social</th>
                            <th>Practica</th>
                            <th>Paciente</th>
                            <th>Medico Actuante</th>
                            <th>Medico Solicitante</th>
                            <th>Importe Total</th>
                            <th>Reset</th>
                            <th data-hide='all'>Gastos Administrativos</th>
                            <th data-hide='all'>Importe Estudio</th>
                            <th data-hide='all'>IVA 21</th>
                            <th data-hide='all'>IVA 105</th>
                            <th data-hide='all'>Importe Neto</th>
                            <th data-hide='all'>Pago</th>
                            <th data-hide='all'>Pago Contra Factura</th>
                            <th data-hide='all'>Porcentaje medico</th>
                            <th data-hide='all'>Retencion CEDIR</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.estudiosImpagos.map(estudio => (
                            <tr key={ estudio.id }>
                                <td>{ estudio.fecha }</td>
                                <td>{ estudio.fecha_cobro }</td>
                                <td>{ estudio.obra_social.nombre }</td>
                                <td>{ estudio.practica.descripcion }</td>
                                <td>{ `${estudio.paciente.apellido}, ${estudio.paciente.nombre}` }</td>
                                <td>{ `${estudio.medico_actuante.apellido}, ${estudio.medico_actuante.nombre}` }</td>
                                <td>{ `${estudio.medico_solicitante.apellido}, ${estudio.medico_solicitante.nombre}` }</td>
                                <td>
                                    <Field
                                      name={ `importe-${estudio.id}` }
                                      type='text'
                                      component={ InputRF }
                                      validate={ [required] }
                                      normalize={ parseToNumber }
                                      hideLabel
                                    />
                                </td>
                                <td>
                                    <Button
                                      bsStyle='primary'
                                      onClick={ () => this.resetImporteToOriginalValue(estudio.id) }
                                    >
                                        Reset
                                    </Button>
                                </td>
                                <td>{ estudio.gastos_adiministrativos }</td>
                                <td>{ estudio.importe_estudio }</td>
                                <td>{ estudio.importe_iva_21 }</td>
                                <td>{ estudio.importe_iva_105 }</td>
                                <td>{ estudio.importe_neto }</td>
                                <td>{ estudio.pago }</td>
                                <td>{ estudio.pago_contra_factura }</td>
                                <td>{ estudio.porcentaje_medico }</td>
                                <td>{ estudio.retencion_cedir }</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </form>
        );
    }
}

const { array, func } = PropTypes;

PagoMedicosTable.propTypes = {
    // medico: array.isRequired,
    estudiosImpagos: array.isRequired,
    resetImporteForEstudio: func.isRequired,
};

PagoMedicosTable.defaultProps = {
    estudiosImpagos: [],
};

const PagoMedicosTableReduxForm = reduxForm({
    form: 'editImportesPagoMedicos',
    destroyOnUnmount: false,
})(PagoMedicosTable);

const searchEstudiosImpagosMedicosSelector = formValueSelector('searchEstudiosImpagosMedico');
const getEditImportesPagoMedicos = getFormValues('editImportesPagoMedicos');

function mapStateToProps(state) {
    // Selected medico.
    let medico = searchEstudiosImpagosMedicosSelector(state, 'medicoActuante');
    medico = (medico && Array.isArray(medico))
        ? medico
        : [];
    // Estudios to pay to the selected medico.
    const estudiosImpagos = state.estudiosReducer.estudiosImpagos;
    let editImportesPagoMedicosInitialValues;
    // if the form was initialized, do not calculate its initial state again
    if (isEmpty(getEditImportesPagoMedicos(state))) {
        // The following const contains the initial importe values for estudios,
        // and will be utilized to initialize the form.
        // TODO: Random values generated for this pourpose should be changed by the original
        // importes when the api is ready.
        editImportesPagoMedicosInitialValues = estudiosImpagos
            .reduce((intiFormObject, currEstudio) => ({
                ...intiFormObject,
                // First I tried to use just the estudio.id to name the key for its importe,
                // but seems that redux-form don't support numbers as names for its store keys.
                // See https://github.com/erikras/redux-form/issues/2388
                [`importe-${currEstudio.id}`]: parseFloat(currEstudio.total),
            }), {});
    }

    return {
        medico,
        estudiosImpagos,
        initialValues: editImportesPagoMedicosInitialValues,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        resetImporteForEstudio: (estudioId, importe) =>
            // The second parameter provided to change func is the name of the field.
            // Since redux-form doesn't support numeric names for field,
            // 'importe-' is used to prefix the id of the estdio to compose the name.
            dispatch(change('editImportesPagoMedicos', `importe-${estudioId}`, importe)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PagoMedicosTableReduxForm);
