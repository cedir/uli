import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Row, Col, Button }
    from 'react-bootstrap/dist/react-bootstrap';
import AsyncTypeaheadRF from '../../utilities/AsyncTypeaheadRF';
import InputRF from '../../utilities/InputRF';
import initialState from '../searchEstudiosFormInitialState';
import obrasSocialesInitialState from '../../obraSocial/obraSocialReducerInitialState';
import medicosInitialState from '../../medico/medicoReducerInitialState';
import { FETCH_ESTUDIOS_DIARIOS } from '../actionTypes';
import { FETCH_OBRAS_SOCIALES } from '../../obraSocial/actionTypes';
import { FETCH_MEDICOS } from '../../medico/actionTypes';
import { required, alpha, dni, dateBeforeThan, dateAfterThan } from '../../utilities/reduxFormValidators';

const { func, array, bool } = React.PropTypes;

class SearchEstudiosForm extends React.Component {
    constructor(props) {
        super(props);

        this.searchObrasSociales = this.searchObrasSociales.bind(this);
        this.searchMedicos = this.searchMedicos.bind(this);
        this.renderObraSocialMenuItem = this.renderObraSocialMenuItem.bind(this);
        this.renderMedicoMenuItem = this.renderMedicoMenuItem.bind(this);
        this.searchEstudios = this.searchEstudios.bind(this);
    }

    searchObrasSociales(nombre) {
        this.props.fetchObrasSociales(nombre);
    }

    searchMedicos(searchText) {
        this.props.fetchMedicos(searchText);
    }

    searchEstudios(searchParams) {
        const fetchEstudiosParams = {
            searchParams,
        };
        this.props.fetchEstudios(fetchEstudiosParams);
    }

    filterByCallback(option, text) {
        return (
          option.nombre.toLowerCase().indexOf(text.toLowerCase()) !== -1 ||
          option.apellido.toLowerCase().indexOf(text.toLowerCase()) !== -1
        );
    }

    renderObraSocialMenuItem(option) {
        return (
            <div key={ option.id }>
                { option.nombre }
            </div>
        );
    }

    renderMedicoMenuItem(option) {
        return (
            <div key={ option.id }>
                { `${option.apellido}, ${option.nombre}` }
            </div>
        );
    }

    render() {
        return (
            <form onSubmit={ this.props.handleSubmit(this.searchEstudios) }>
                <Row>
                    <Col md={ 9 }>
                        <Row>
                            <Col md={ 3 }>
                                <fieldset>
                                    <legend>Obra Social</legend>
                                    <Field
                                      name='obraSocial'
                                      type='text'
                                      label='Nombre'
                                      component={ AsyncTypeaheadRF }
                                      options={ this.props.obrasSociales }
                                      labelKey='nombre'
                                      onSearch={ this.searchObrasSociales }
                                      renderMenuItemChildren={ this.renderObraSocialMenuItem }
                                    />
                                </fieldset>
                            </Col>
                            <Col md={ 9 }>
                                <fieldset>
                                    <legend>Paciente</legend>
                                    <Row>
                                        <Col md={ 4 }>
                                            <Field
                                              name='dniPaciente'
                                              type='text'
                                              label='dni'
                                              validate={ dni }
                                              component={ InputRF }
                                            />
                                        </Col>
                                        <Col md={ 4 }>
                                            <Field
                                              name='nombrePaciente'
                                              type='text'
                                              label='Nombre'
                                              validate={ alpha }
                                              component={ InputRF }
                                            />
                                        </Col>
                                        <Col md={ 4 }>
                                            <Field
                                              name='apellidoPaciente'
                                              type='text'
                                              label='Apellido'
                                              validate={ alpha }
                                              component={ InputRF }
                                            />
                                        </Col>
                                    </Row>
                                </fieldset>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={ 6 }>
                                <fieldset>
                                    <legend>Medico Solicitante</legend>
                                    <Field
                                      name='medicoSolicitante'
                                      label='Nombe/Apellido'
                                      component={ AsyncTypeaheadRF }
                                      options={ this.props.medicos }
                                      filterBy={ this.filterByCallback }
                                      labelKey={ option => `${option.apellido}, ${option.nombre}` }
                                      onSearch={ this.searchMedicos }
                                      renderMenuItemChildren={ this.renderMedicoMenuItem }
                                    />
                                </fieldset>
                            </Col>
                            <Col md={ 6 }>
                                <fieldset>
                                    <legend>Medico Actuante</legend>
                                    <Field
                                      name='medicoActuante'
                                      label='Nombe/Apellido'
                                      component={ AsyncTypeaheadRF }
                                      options={ this.props.medicos }
                                      labelKey={ option => `${option.apellido}, ${option.nombre}` }
                                      onSearch={ this.searchMedicos }
                                      renderMenuItemChildren={ this.renderMedicoMenuItem }
                                    />
                                </fieldset>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={ 3 }>
                        <fieldset>
                            <legend>Periodo</legend>
                            <Field
                              name='fechaDesde'
                              type='date'
                              label='Desde'
                              component={ InputRF }
                              validate={ [required, dateBeforeThan('fechaHasta', 'Debe ser menor que la fecha hasta')] }
                            />
                            <Field
                              name='fechaHasta'
                              type='date'
                              label='Hasta'
                              component={ InputRF }
                              validate={ dateAfterThan('fechaDesde', 'Debe ser mayo que la fecha desde') }
                            />
                        </fieldset>
                    </Col>
                </Row>
                <Row>
                    <Col md={ 12 } style={ { textAlign: 'right' } }>
                        <Button
                          bsStyle='primary'
                          type='submit'
                          disabled={ this.props.submitting || !this.props.valid }
                        >
                            Buscar Estudios
                        </Button>
                    </Col>
                </Row>
            </form>
        );
    }
}

SearchEstudiosForm.defaultProps = {
    obrasSociales: obrasSocialesInitialState.obrasSociales,
    medicos: medicosInitialState.medicos,
};

SearchEstudiosForm.propTypes = {
    handleSubmit: func.isRequired,
    submitting: bool.isRequired,
    valid: bool.isRequired,
    fetchEstudios: func.isRequired,
    fetchObrasSociales: func.isRequired,
    fetchMedicos: func.isRequired,
    obrasSociales: array,
    medicos: array,
};

const SearchEstudiosFormReduxForm = reduxForm({
    form: 'searchEstudios',
    initialValues: initialState,
})(SearchEstudiosForm);

const selector = formValueSelector('searchEstudios');

function mapStateToProps(state) {
    return {
        resultPages: state.estudiosReducer.resultPages,
        obrasSociales: state.obraSocialReducer.obrasSociales,
        medicos: state.medicoReducer.medicos,
        fechaDesde: selector(state, 'fechaDesde'),
        fechaHasta: selector(state, 'fechaHasta'),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchEstudios: fetchEstudiosParams =>
            dispatch({ type: FETCH_ESTUDIOS_DIARIOS, fetchEstudiosParams }),
        fetchObrasSociales: nombre => dispatch({ type: FETCH_OBRAS_SOCIALES, nombre }),
        fetchMedicos: searchText => dispatch({ type: FETCH_MEDICOS, searchText }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchEstudiosFormReduxForm);
