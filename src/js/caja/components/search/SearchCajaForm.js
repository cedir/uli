import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
import { Row, Col }
    from 'react-bootstrap/dist/react-bootstrap';
import AsyncTypeaheadRF from '../../../utilities/AsyncTypeaheadRF';

import { FETCH_OBRAS_SOCIALES } from '../../../obraSocial/actionTypes';
import { FETCH_PACIENTES } from '../../../paciente/actionTypes';
import { FETCH_PRACTICAS } from '../../../practica/actionTypes';
import { FETCH_MEDICOS_SOLICITANTES } from '../../../medico/actionTypes';


class SearchCajaForm extends Component {
    constructor(props) {
        super(props);

        this.setSelectedObraSocial = this.setSelectedObraSocial.bind(this);
        this.setSelectedPaciente = this.setSelectedPaciente.bind(this);
        this.setSelectedPractica = this.setSelectedPractica.bind(this);
        this.setSelectedMedicoSolicitante =
            this.setSelectedMedicoSolicitante.bind(this);
        this.searchObrasSociales = this.searchObrasSociales.bind(this);
        this.searchPacientes = this.searchPacientes.bind(this);
        this.searchPracticas = this.searchPracticas.bind(this);
        this.searchMedicosSolicitantes =
            this.searchMedicosSolicitantes.bind(this);
    }

    setSelectedObraSocial(selection) {
        if (selection[0] && selection[0].id) {
            this.props.setSelectedObraSocial(selection[0]);
        }
    }

    setSelectedPaciente(selection) {
        if (selection[0] && selection[0].id) {
            this.props.setSelectedPaciente(selection[0]);
        }
    }

    setSelectedPractica(selection) {
        if (selection[0] && selection[0].id) {
            this.props.setSelectedPractica(selection[0]);
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

    searchPacientes(searchText) {
        this.props.fetchPacientes(searchText);
    }

    searchPracticas(searchText) {
        this.props.fetchPracticas(searchText);
    }

    searchMedicosSolicitantes(searchText) {
        const selectedMedicoSolicitante = this.props.selectedMedicoSolicitante;
        if (selectedMedicoSolicitante.fullName === searchText && selectedMedicoSolicitante.id) {
            this.props.fetchMedicosSolicitantes({ id: selectedMedicoSolicitante.id });
        } else {
            this.props.fetchMedicosSolicitantes({ searchText });
        }
    }

    pacientesTypeaheadRenderFunc(option) {
        if (!option.nombre || !option.apellido) {
            return '';
        }

        return `${option.apellido}, ${option.nombre}, DNI: ${option.dni}`;
    }

    practicaTypeaheadRenderFunc(option) {
        if (!option.descripcion) {
            return '';
        }

        return `${option.descripcion}, Codigo: ${option.codigoMedico}`;
    }

    medicosTypeaheadRenderFunc(option) {
        if (!option.nombre || !option.apellido) {
            return '';
        }

        const matricula = option.matricula || '-';

        return `${option.apellido}, ${option.nombre}, Mat: ${matricula}`;
    }

    renderObraSocialMenuItem(option) {
        return (
            <div key={ option.id }>
                { option.nombre }
            </div>
        );
    }

    renderPacienteMenuItem(option) {
        return (
            <div style={ { width: '100%' } } key={ option.id }>
                { `${option.apellido}, ${option.nombre}` }
                <div>DNI: { option.dni }</div>
            </div>
        );
    }

    renderPractica(option) {
        return (
            <div style={ { width: '100%' } } key={ option.id }>
                { option.descripcion }
                <div>Codigo: { option.codigoMedico }</div>
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
            <form>
                <Row>
                    <Col md={ 9 }>
                        <Row>
                            <Col md={ 4 }>
                                <fieldset>
                                    <legend>Obra Social</legend>
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
                                </fieldset>
                            </Col>
                            <Col md={ 5 }>
                                <legend>Paciente</legend>
                                <Field
                                  name='paciente'
                                  label='Nombre o dni'
                                  placeholder='Nombre, apellido o documento'
                                  align='left'
                                  component={ AsyncTypeaheadRF }
                                  options={ this.props.pacientes }
                                  labelKey={ this.pacientesTypeaheadRenderFunc }
                                  onSearch={ this.searchPacientes }
                                  onChange={ this.setSelectedPaciente }
                                  selected={ this.props.selectedPaciente }
                                  renderMenuItemChildren={ this.renderPacienteMenuItem }
                                  isLoading={ this.props.pacienteApiLoading }
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={ 9 }>
                                <fieldset>
                                    <legend>Practica</legend>
                                    <Field
                                      name='practica'
                                      label='Descripcion'
                                      placeholder='descripcion'
                                      align='left'
                                      component={ AsyncTypeaheadRF }
                                      options={ this.props.practicas }
                                      labelKey={ this.practicaTypeaheadRenderFunc }
                                      onSearch={ this.searchPracticas }
                                      onChange={ this.setSelectedPractica }
                                      selected={
                                          this.props.selectedPractica
                                      }
                                      renderMenuItemChildren={ this.renderPractica }
                                      isLoading={ this.props.practicaApiLoading }
                                    />
                                </fieldset>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={ 6 }>
                                <fieldset>
                                    <legend>Medico</legend>
                                    <Field
                                      name='medicoSolicitante'
                                      label='Nombe/Apellido'
                                      placeholder='Nombre'
                                      align='left'
                                      component={ AsyncTypeaheadRF }
                                      options={ this.props.medicosSolicitantes }
                                      labelKey={ this.medicosTypeaheadRenderFunc }
                                      onSearch={ this.searchMedicosSolicitantes }
                                      onChange={ this.setSelectedMedicoSolicitante }
                                      selected={
                                          this.props.selectedMedicoSolicitante
                                      }
                                      renderMenuItemChildren={ this.renderMedicoMenuItem }
                                      isLoading={ this.props.medicoSolicitanteApiLoading }
                                    />
                                </fieldset>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </form>
        );
    }
}

const { func, array, bool } = PropTypes;

SearchCajaForm.propTypes = {
    // handleSubmit: func.isRequired,
    fetchObrasSociales: func.isRequired,
    fetchPacientes: func.isRequired,
    fetchPracticas: func.isRequired,
    fetchMedicosSolicitantes: func.isRequired,
    setSelectedObraSocial: func.isRequired,
    setSelectedPaciente: func.isRequired,
    setSelectedPractica: func.isRequired,
    setSelectedMedicoSolicitante: func.isRequired,
    selectedObraSocial: array,
    selectedPaciente: array,
    selectedPractica: array,
    selectedMedicoSolicitante: array,
    obrasSociales: array,
    pacientes: array,
    practicas: array,
    medicosSolicitantes: array,
    obrasSocialesApiLoading: bool.isRequired,
    pacienteApiLoading: bool.isRequired,
    practicaApiLoading: bool.isRequired,
    medicoSolicitanteApiLoading: bool.isRequired,
};

const SearchCajaFormReduxForm = reduxForm({
    form: 'searchCaja',
    destroyOnUnmount: false,
})(SearchCajaForm);

const selector = formValueSelector('searchCaja');

function mapStateToProps(state) {
    let obraSocial = selector(state, 'obraSocial');
    obraSocial = (obraSocial && Array.isArray(obraSocial))
        ? obraSocial
        : [];

    let paciente = selector(state, 'paciente');
    paciente = (paciente && Array.isArray(paciente))
        ? paciente
        : [];

    let practica = selector(state, 'practica');
    practica = (practica && Array.isArray(practica))
        ? practica
        : [];

    let medicoSolicitante = selector(state, 'medicoSolicitante');
    medicoSolicitante = (medicoSolicitante && Array.isArray(medicoSolicitante))
            ? medicoSolicitante
            : [];

    return {
        obrasSociales: state.obraSocialReducer.obrasSociales,
        pacientes: state.pacienteReducer.pacientes,
        practicas: state.practicaReducer.practicas,
        medicosSolicitantes: state.medicoReducer.medicosSolicitantes,
        selectedObraSocial: obraSocial,
        selectedPaciente: paciente,
        selectedPractica: practica,
        selectedMedicoSolicitante: medicoSolicitante,
        obrasSocialesApiLoading: state.obraSocialReducer.isLoading || false,
        pacienteApiLoading: state.pacienteReducer.pacienteApiLoading || false,
        practicaApiLoading: state.practicaReducer.practicaApiLoading || false,
        medicoSolicitanteApiLoading: state.medicoReducer.medicoSolicitanteApiLoading || false,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchObrasSociales: nombre => dispatch({ type: FETCH_OBRAS_SOCIALES, nombre }),
        fetchPacientes: searchText =>
            dispatch({ type: FETCH_PACIENTES, searchText }),
        fetchPracticas: searchText =>
            dispatch({ type: FETCH_PRACTICAS, searchText }),
        fetchMedicosSolicitantes: searchParams =>
            dispatch({ type: FETCH_MEDICOS_SOLICITANTES, searchParams }),
        setSelectedObraSocial: obraSocial =>
            dispatch(change('searchCaja', 'obraSocial', obraSocial)),
        setSelectedPaciente: paciente =>
            dispatch(change('searchCaja', 'paciente', paciente)),
        setSelectedPractica: practica =>
            dispatch(change('searchCaja', 'practica', practica)),
        setSelectedMedicoSolicitante: medicoSolicitante =>
            dispatch(change('searchEstudios', 'medicoSolicitante', medicoSolicitante)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchCajaFormReduxForm);
