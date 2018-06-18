import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, getFormValues, change } from 'redux-form';
import { Table, Button } from 'react-bootstrap/dist/react-bootstrap';
import { isEmpty } from 'lodash';

import InputRF from '../../utilities/InputRF';
import { required } from '../../utilities/reduxFormValidators';

function getRolMedico(estudio, medico) {
    let rol;
    if (estudio.medico.id === medico.id) {
        rol = 'actuante';
    }
    if (estudio.medico_solicitante.id === medico.id) {
        rol = rol ? `${rol}/solicitante` : 'solicitante';
    }

    return rol;
}

function parseToNumber(value) {
    return parseFloat(value) || 0;
}

class PagoMedicosTable extends Component {
    resetImporteToOriginalValue(estudioId) {
        const estudioToReset = this.props.estudiosImpagos
            .filter(estudio => estudio.id === estudioId)[0];
        // since the estudio has not the importe yet (waiting api), set
        // a custom importe just for the sake of showing the reset functionality.
        estudioToReset.importe = 900;
        this.props.resetImporteForEstudio(estudioId, estudioToReset.importe);
    }
    render() {
        return (
            <form>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Rol Medico</th>
                            <th>Obra Social</th>
                            <th>Tipo de estudio</th>
                            <th>Importe</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.estudiosImpagos.map(estudio => (
                            <tr key={ estudio.id }>
                                <td>{ estudio.fecha }</td>
                                <td>{ getRolMedico(estudio, this.props.medico[0]) }</td>
                                <td>{ estudio.obra_social.nombre }</td>
                                <td>{ estudio.practica.descripcion }</td>
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
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </form>
        );
    }
}

const { array, func } = React.PropTypes;

PagoMedicosTable.propTypes = {
    medico: array.isRequired,
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
                [`importe-${currEstudio.id}`]: Math.floor(Math.random() * 500) + 100,
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
