import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
import { Row, Col, Button }
    from 'react-bootstrap/dist/react-bootstrap';
import AsyncTypeaheadRF from '../../utilities/AsyncTypeaheadRF';
import InputRF from '../../utilities/InputRF';
import obrasSocialesInitialState from '../../obraSocial/obraSocialReducerInitialState';
import medicosInitialState from '../../medico/medicoReducerInitialState';
import { FETCH_ESTUDIOS_DIARIOS } from '../actionTypes';
import { FETCH_OBRAS_SOCIALES } from '../../obraSocial/actionTypes';
import { FETCH_MEDICOS_ACTUANTES, FETCH_MEDICOS_SOLICITANTES } from '../../medico/actionTypes';
import { required, alpha, dni, dateBeforeThan, dateAfterThan }
    from '../../utilities/reduxFormValidators';

class SearchEstudiosForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedObraSocial: '',
            selectedMedicoActuante: '',
            selectedMedicoSolicitante: '',
        };

        this.setSelectedObraSocial = this.setSelectedObraSocial.bind(this);
        this.setSelectedMedicoActuante = this.setSelectedMedicoActuante.bind(this);
        this.setSelectedMedicoSolicitante = this.setSelectedMedicoSolicitante.bind(this);
        this.searchObrasSociales = this.searchObrasSociales.bind(this);
        this.searchMedicosActuantes = this.searchMedicosActuantes.bind(this);
        this.searchMedicosSolicitantes = this.searchMedicosSolicitantes.bind(this);
        this.renderObraSocialMenuItem = this.renderObraSocialMenuItem.bind(this);
        this.renderMedicoMenuItem = this.renderMedicoMenuItem.bind(this);
        this.searchEstudios = this.searchEstudios.bind(this);
    }

    setSelectedObraSocial(selection) {
        if (selection[0] && selection[0].id) {
            this.props.setSelectedObraSocial(selection[0]);
        }
    }

    setSelectedMedicoActuante(selection) {
        if (selection[0] && selection[0].id) {
            this.props.setSelectedMedicoActuante(selection[0]);
        }
    }

    setSelectedMedicoSolicitante(selection) {
        if (selection[0] && selection[0].id) {
            this.props.setSelectedMedicoSolicitante(selection[0]);
        }
    }

    searchObrasSociales(nombre) {
        this.props.fetchObrasSociales(nombre);
    }

    searchMedicosActuantes(searchText) {
        const selectedMedicoActuante = this.props.selectedMedicoActuante;
        if (selectedMedicoActuante.fullName === searchText && selectedMedicoActuante.id) {
            this.props.fetchMedicosActuantes({ id: selectedMedicoActuante.id });
        } else {
            this.props.fetchMedicosActuantes({ searchText });
        }
    }

    searchMedicosSolicitantes(searchText) {
        const selectedMedicoSolicitante = this.props.selectedMedicoSolicitante;
        if (selectedMedicoSolicitante.fullName === searchText && selectedMedicoSolicitante.id) {
            this.props.fetchMedicosSolicitantes({ id: selectedMedicoSolicitante.id });
        } else {
            this.props.fetchMedicosSolicitantes({ searchText });
        }
    }

    searchEstudios(searchParams) {
        if (this.props.closeModal) {
            this.props.closeModal();
        }

        this.props.fetchEstudios(searchParams);
    }

    filterByCallback(option, text) {
        return (
          option.nombre.toLowerCase().indexOf(text.toLowerCase()) !== -1 ||
          option.apellido.toLowerCase().indexOf(text.toLowerCase()) !== -1
        );
    }

    medicosTypeaheadRenderFunc(option) {
        if (!option.nombre || !option.apellido) {
            return '';
        }

        return `${option.apellido}, ${option.nombre}`;
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
            <div style={ { width: '100%' } } key={ option.id }>
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
                                    <div style={ { position: 'realtive' } }>
                                        <Field
                                          name='obraSocial'
                                          label='Nombre'
                                          align='left'
                                          component={ AsyncTypeaheadRF }
                                          options={ this.props.obrasSociales }
                                          labelKey='nombre'
                                          onSearch={ this.searchObrasSociales }
                                          onChange={ this.setSelectedObraSocial }
                                          selected={ this.props.selectedObraSocial }
                                          renderMenuItemChildren={ this.renderObraSocialMenuItem }
                                          isLoading={ this.props.obrasSocialesApiLoading }
                                        />
                                    </div>
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
                                      options={ this.props.medicosSolicitantes }
                                      filterBy={ this.filterByCallback }
                                      labelKey={ this.medicosTypeaheadRenderFunc }
                                      onSearch={ this.searchMedicosSolicitantes }
                                      onChange={ this.setSelectedMedicoSolicitante }
                                      selected={
                                        this.props.selectedMedicoSolicitante
                                      }
                                      renderMenuItemChildren={ this.renderMedicoMenuItem }
                                      isLoading={ false }
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
                                      options={ this.props.medicosActuantes }
                                      filterBy={ this.filterByCallback }
                                      labelKey={ this.medicosTypeaheadRenderFunc }
                                      onSearch={ this.searchMedicosActuantes }
                                      onChange={ this.setSelectedMedicoActuante }
                                      selected={
                                        this.props.selectedMedicoActuante
                                      }
                                      renderMenuItemChildren={ this.renderMedicoMenuItem }
                                      isLoading={ false }
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

const { func, array, bool } = React.PropTypes;

SearchEstudiosForm.propTypes = {
    handleSubmit: func.isRequired,
    submitting: bool.isRequired,
    valid: bool.isRequired,
    fetchEstudios: func.isRequired,
    fetchObrasSociales: func.isRequired,
    fetchMedicosActuantes: func.isRequired,
    fetchMedicosSolicitantes: func.isRequired,
    setSelectedObraSocial: func.isRequired,
    setSelectedMedicoActuante: func.isRequired,
    setSelectedMedicoSolicitante: func.isRequired,
    selectedObraSocial: array,
    selectedMedicoActuante: array,
    selectedMedicoSolicitante: array,
    obrasSociales: array,
    medicosActuantes: array,
    medicosSolicitantes: array,
    closeModal: func,
    obrasSocialesApiLoading: bool.isRequired,
};

const SearchEstudiosFormReduxForm = reduxForm({
    form: 'searchEstudios',
    destroyOnUnmount: false,
})(SearchEstudiosForm);

const selector = formValueSelector('searchEstudios');

function mapStateToProps(state) {
    let obraSocial = selector(state, 'obraSocial');
    obraSocial = (obraSocial && Array.isArray(obraSocial))
        ? obraSocial
        : [];

    let medicoActuante = selector(state, 'medicoActuante');
    medicoActuante = (medicoActuante && Array.isArray(medicoActuante))
        ? medicoActuante
        : [];

    let medicoSolicitante = selector(state, 'medicoSolicitante');
    medicoSolicitante = (medicoSolicitante && Array.isArray(medicoSolicitante))
            ? medicoSolicitante
            : [];
    return {
        resultPages: state.estudiosReducer.resultPages,
        obrasSociales: state.obraSocialReducer.obrasSociales,
        medicosActuantes: state.medicoReducer.medicosActuantes,
        medicosSolicitantes: state.medicoReducer.medicosSolicitantes,
        selectedObraSocial: obraSocial,
        selectedMedicoActuante: medicoActuante,
        selectedMedicoSolicitante: medicoSolicitante,
        obrasSocialesApiLoading: state.obraSocialReducer.isLoading || false,
        medicoActuanteApiLoading: state.medicoReducer.medicoActuanteApiLoading || false,
        medicoSolicitanteApiLoading: state.medicoReducer.medicoSolicitanteApiLoading || false,
        initialValues: state.estudiosReducer.searchEstudiosParams,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchEstudios: fetchEstudiosParams =>
            dispatch({ type: FETCH_ESTUDIOS_DIARIOS, fetchEstudiosParams }),
        fetchObrasSociales: nombre => dispatch({ type: FETCH_OBRAS_SOCIALES, nombre }),
        fetchMedicosActuantes: searchParams =>
            dispatch({ type: FETCH_MEDICOS_ACTUANTES, searchParams }),
        fetchMedicosSolicitantes: searchParams =>
            dispatch({ type: FETCH_MEDICOS_SOLICITANTES, searchParams }),
        setSelectedObraSocial: obraSocial =>
            dispatch(change('searchEstudios', 'obraSocial', obraSocial)),
        setSelectedMedicoActuante: medicoActuante =>
            dispatch(change('searchEstudios', 'medicoActuante', medicoActuante)),
        setSelectedMedicoSolicitante: medicoSolicitante =>
            dispatch(change('searchEstudios', 'medicoSolicitante', medicoSolicitante)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchEstudiosFormReduxForm);
