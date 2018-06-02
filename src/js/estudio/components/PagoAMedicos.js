import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
import { Row, Col, Button, FormGroup, ControlLabel, FormControl }
    from 'react-bootstrap/dist/react-bootstrap';
import AsyncTypeaheadRF from '../../utilities/AsyncTypeaheadRF';
// import InputRF from '../../utilities/InputRF';
import { FETCH_ESTUDIOS_IMPAGOS_MEDICO_ACTUANTE,
    FETCH_ESTUDIOS_IMPAGOS_MEDICO_SOLICITANTE } from '../actionTypes';
import { FETCH_MEDICOS } from '../../medico/actionTypes';

const { array, func, bool, string } = PropTypes;

const SelectInput = props => (
    <FormGroup>
        <ControlLabel>{ props.label }</ControlLabel>
        <FormControl componentClass='select'>
            { props.options.map(option =>
                (<option key={ option } value='option'>{ option }</option>)) }
        </FormControl>
    </FormGroup>
);

SelectInput.propTypes = {
    label: string.isRequired,
    options: array.isRequired,
};

const firstYear = 2012;
const lastYear = new Date().getFullYear() + 1;
const yearsList = [...Array(lastYear - firstYear).keys()]
    .map(i => i + firstYear);

const monthsList = [...Array(12).keys()]
    .map(i => i + 1);

class PagoAMedicos extends Component {
    constructor(props) {
        super(props);

        this.setSelectedMedico = this.setSelectedMedico.bind(this);
        this.fetchEstudiosImpagosMedicoActuante =
            this.fetchEstudiosImpagosMedicoActuante.bind(this);
        this.fetchEstudiosImpagosMedicoSolicitante =
            this.fetchEstudiosImpagosMedicoSolicitante.bind(this);
        this.fetchMedicos = this.fetchMedicos.bind(this);
    }

    setSelectedMedico(selection) {
        if (selection[0] && selection[0].id) {
            this.props.setSelectedMedico(selection[0]);
        }
    }

    fetchMedicos(searchText) {
        this.props.fetchMedicos({ searchText });
    }

    fetchEstudiosImpagosMedicoActuante() {
        this.props.fetchEstudiosImpagosMedico('8813', 2016, 5, 'actuante');
    }

    fetchEstudiosImpagosMedicoSolicitante() {
        this.props.fetchEstudiosImpagosMedico('8813', 2016, 5, 'solicitante');
    }

    render() {
        return (
            <div>
                welcome to pago a medicos
                <Button
                  bsStyle='primary'
                  onClick={ this.fetchEstudiosImpagosMedicoActuante }
                >
                    MedicoActuante
                </Button>
                <Button
                  bsStyle='primary'
                  onClick={ this.fetchEstudiosImpagosMedicoSolicitante }
                >
                    MedicoSolicitante
                </Button>
                <div>
                    { JSON.stringify(this.props.estudiosImpagosMedicoActuante, null, 4) }
                </div>
                <div>
                    { JSON.stringify(this.props.estudiosImpagosMedicoSolicitante, null, 4) }
                </div>
                <form onSubmit={ this.props.handleSubmit(params => console.log(params)) }>
                    <Row>
                        <Col md={ 2 }>
                            <fieldset>
                                <legend>Medico</legend>
                                <div style={ { position: 'realtive' } }>
                                    <Field
                                      name='medico'
                                      label='Nombre'
                                      align='left'
                                      component={ AsyncTypeaheadRF }
                                      options={ this.props.medicos }
                                      labelKey='nombre'
                                      onSearch={ this.fetchMedicos }
                                      onChange={ this.setSelectedMedico }
                                      selected={ this.props.selectedMedico }
                                      renderMenuItemChildren={ this.renderObraSocialMenuItem }
                                      isLoading={ this.props.medicoApiLoading }
                                    />
                                </div>
                            </fieldset>
                        </Col>
                        <Col md={ 1 }>
                            <Field
                              name='anio'
                              label='Anio'
                              component={ SelectInput }
                              options={ yearsList }
                            />
                        </Col>
                        <Col md={ 1 }>
                            <Field
                              name='mes'
                              label='Mes'
                              component={ SelectInput }
                              options={ monthsList }
                            />
                        </Col>
                    </Row>
                    <Button type='submit'>submit</Button>
                </form>
            </div>
        );
    }
}

PagoAMedicos.propTypes = {
    handleSubmit: func.isRequired,
    medicos: array.isRequired,
    medicoApiLoading: bool.isRequired,
    selectedMedico: array,
    setSelectedMedico: func.isRequired,
    estudiosImpagosMedicoActuante: array.isRequired,
    estudiosImpagosMedicoSolicitante: array.isRequired,
    fetchMedicos: func.isRequired,
    fetchEstudiosImpagosMedico: func.isRequired,
};

const PagoAMedicosReduxForm = reduxForm({
    form: 'searchEstudiosImpagosMedico',
    destroyOnUnmount: false,
})(PagoAMedicos);

const selector = formValueSelector('searchEstudiosImpagosMedico');

function mapStateToProps(state) {
    let medico = selector(state, 'medico');
    medico = (medico && Array.isArray(medico))
        ? medico
        : [];
    return {
        medicos: state.medicoReducer.medicos,
        selectedMedico: medico,
        medicoApiLoading: state.medicoReducer.medicoApiLoading,
        estudiosImpagosMedicoActuante: state.estudiosReducer.estudiosImpagosMedicoActuante,
        estudiosImpagosMedicoSolicitante: state.estudiosReducer.estudiosImpagosMedicoSolicitante,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchMedicos: searchParams =>
            dispatch({ type: FETCH_MEDICOS, searchParams }),
        fetchEstudiosImpagosMedico: (medicoMatricula, year, month, medicoRole) => {
            const data = { medicoMatricula, year, month };

            if (medicoRole === 'actuante') {
                return dispatch({ type: FETCH_ESTUDIOS_IMPAGOS_MEDICO_ACTUANTE, data });
            }

            return dispatch({ type: FETCH_ESTUDIOS_IMPAGOS_MEDICO_SOLICITANTE, data });
        },
        setSelectedMedico: medico =>
            dispatch(change('searchEstudiosImpagosMedico', 'medico', medico)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PagoAMedicosReduxForm);
