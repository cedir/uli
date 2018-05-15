import React, { Component } from 'react';
import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap/dist/react-bootstrap';
import { connect } from 'react-redux';
import { Field, reduxForm, change, formValueSelector } from 'redux-form';
import AsyncTypeaheadRF from '../../utilities/AsyncTypeaheadRF';
import InputRF from '../../utilities/InputRF';
import { FETCH_OBRAS_SOCIALES } from '../../obraSocial/actionTypes';
import { FETCH_MEDICOS_ACTUANTES, FETCH_MEDICOS_SOLICITANTES } from '../../medico/actionTypes';
import { FETCH_ANESTESISTAS } from '../../anestesista/actionTypes';
import { FETCH_PACIENTES } from '../../paciente/actionTypes';
import { FETCH_PRACTICAS } from '../../practica/actionTypes';
import { UPDATE_ESTUDIO, CREATE_ESTUDIO } from '../../estudio/actionTypes';
import { ESTADOS } from '../constants';

import { requiredOption, alphaNum, required } from '../../utilities/reduxFormValidators';
// import { stat } from 'fs';

function initEditFormObject(estudio) {
    return {
        obraSocial: estudio.obra_social ? [estudio.obra_social] : undefined,
        medicoActuante: estudio.medico ? [estudio.medico] : undefined,
        medicoSolicitante: estudio.medico_solicitante ? [estudio.medico_solicitante] : undefined,
        anestesista: estudio.anestesista ? [estudio.anestesista] : undefined,
        paciente: estudio.paciente ? [estudio.paciente] : undefined,
        fecha: estudio.fecha,
        practica: estudio.practica ? [estudio.practica] : undefined,
        informe: estudio.informe,
        motivo: estudio.motivo,
    };
}

class EstudioDetailMain extends Component {
    constructor(props) {
        super(props);

        this.setSelectedObraSocial = this.setSelectedObraSocial.bind(this);
        this.setSelectedMedicoActuante = this.setSelectedMedicoActuante.bind(this);
        this.setSelectedMedicoSolicitante = this.setSelectedMedicoSolicitante.bind(this);
        this.setSelectedAnestesista = this.setSelectedAnestesista.bind(this);
        this.setSelectedPaciente = this.setSelectedPaciente.bind(this);
        this.setSelectedPractica = this.setSelectedPractica.bind(this);
        this.searchObrasSociales = this.searchObrasSociales.bind(this);
        this.searchMedicosActuantes = this.searchMedicosActuantes.bind(this);
        this.searchMedicosSolicitantes = this.searchMedicosSolicitantes.bind(this);
        this.searchAnestesista = this.searchAnestesista.bind(this);
        this.searchPacientes = this.searchPacientes.bind(this);
        this.searchPracticas = this.searchPracticas.bind(this);
        this.updateEstudio = this.updateEstudio.bind(this);
        this.createEstudio = this.createEstudio.bind(this);
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

    setSelectedAnestesista(selection) {
        if (selection[0] && selection[0].id) {
            this.props.setSelectedAnestesista(selection[0]);
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

    getObraSocialText(obraSocial) {
        if (obraSocial.length === 1) {
            const { nombre } = obraSocial[0];
            return nombre;
        }

        return 'vacio';
    }

    getPacienteText(paciente) {
        if (paciente.length === 1) {
            const { apellido, nombre, dni } = paciente[0];
            return `${apellido}, ${nombre} - DNI: ${dni}`;
        }

        return 'vacio';
    }

    getMedicoText(medico) {
        if (medico.length === 1) {
            const { apellido, nombre, matricula } = medico[0];
            return `${apellido}, ${nombre} - Mat: ${matricula}`;
        }

        return 'vacio';
    }

    getPracticaText(practica) {
        if (practica.length === 1) {
            const { descripcion, codigoMedico } = practica[0];
            return `${descripcion}, Codigo: ${codigoMedico}`;
        }

        return 'vacio';
    }

    updateEstudio(estudio) {
        const params = Object.assign({}, estudio, { id: this.props.estudioDetail.id });
        this.props.updateEstudio(params);
    }

    createEstudio(newEstudio) {
        this.props.createEstudio(newEstudio);
    }

    handleFormSubmit(estudio) {
        const { estudioDetailFormMode } = this.props;
        if (estudioDetailFormMode === 'edit') {
            this.updateEstudio(estudio);
        } else {
            this.createEstudio(estudio);
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

    searchAnestesista(searchText) {
        this.props.fetchAnestesista(searchText);
    }

    searchPacientes(searchText) {
        this.props.fetchPacientes(searchText);
    }

    searchPracticas(searchText) {
        this.props.fetchPracticas(searchText);
    }

    anestesistaTypeaheadRenderFunc(option) {
        if (!option.nombre || !option.apellido) {
            return '';
        }
        const matricula = option.matricula || '-';

        return `${option.nombre}, ${option.apellido}, Mat: ${matricula}`;
    }

    medicosTypeaheadRenderFunc(option) {
        if (!option.nombre || !option.apellido) {
            return '';
        }

        const matricula = option.matricula || '-';

        return `${option.apellido}, ${option.nombre}, Mat: ${matricula}`;
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

    renderObraSocialMenuItem(option) {
        return (
            <div key={ option.id }>
                { option.nombre }
            </div>
        );
    }

    renderMedicoMenuItem(option) {
        const matricula = option.matricula || '-';
        return (
            <div style={ { width: '100%' } } key={ option.id }>
                { `${option.apellido}, ${option.nombre}` }
                <div>Matricula: { matricula }</div>
            </div>
        );
    }

    renderAnestesistaMenuItem(option) {
        const matricula = option.matricula || '-';
        return (
            <div style={ { width: '100%' } } key={ option.id }>
                { `${option.apellido}, ${option.nombre}` }
                <div>Matricula: { matricula }</div>
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

    render() {
        const { presentacion } = this.props.estudioDetail;
        const estadoPresentacion = presentacion ? presentacion.estado : undefined;
        const lockEstudioEdition =
            (estadoPresentacion && estadoPresentacion !== ESTADOS.ABIERTO) || false;
        // const { selectedPaciente } = this.props;
        return (
            <div className='estudio-detail-main' style={ { marginBottom: '20px' } }>
                <form
                  onSubmit={ this.props.handleSubmit(editParams =>
                    this.handleFormSubmit(editParams)) }
                >
                    <Field
                      name='fecha'
                      type='date'
                      label='fecha'
                      staticField={ lockEstudioEdition }
                      component={ InputRF }
                      validate={ required }
                    />
                    <fieldset>
                        <legend>Obra Social</legend>
                        <OverlayTrigger
                          overlay={
                              <Tooltip id={ 1 }>
                                  { this.getObraSocialText(this.props.selectedObraSocial) }
                              </Tooltip> }
                          placement='top'
                        >
                            <div>
                                <Field
                                  name='obraSocial'
                                  label='Nombre'
                                  staticField={ lockEstudioEdition }
                                  placeholder='nombre'
                                  align='left'
                                  validate={ requiredOption }
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
                        </OverlayTrigger>
                    </fieldset>
                    <fieldset>
                        <legend>Paciente</legend>
                        <OverlayTrigger
                          overlay={
                              <Tooltip id='t-paciente'>
                                  { this.getPacienteText(this.props.selectedPaciente) }
                              </Tooltip> }
                          placement='top'
                        >
                            <div>
                                <Field
                                  name='paciente'
                                  label='Nombre o dni'
                                  staticField={ lockEstudioEdition }
                                  placeholder='Nombre, apellido o documento'
                                  align='left'
                                  validate={ requiredOption }
                                  component={ AsyncTypeaheadRF }
                                  options={ this.props.pacientes }
                                  labelKey={ this.pacientesTypeaheadRenderFunc }
                                  onSearch={ this.searchPacientes }
                                  onChange={ this.setSelectedPaciente }
                                  selected={ this.props.selectedPaciente }
                                  renderMenuItemChildren={ this.renderPacienteMenuItem }
                                  isLoading={ this.props.pacienteApiLoading }
                                />
                            </div>
                        </OverlayTrigger>
                    </fieldset>
                    <fieldset>
                        <legend>Medico Actuante</legend>
                        <OverlayTrigger
                          overlay={
                              <Tooltip id='t-medico-actuante'>
                                  { this.getMedicoText(this.props.selectedMedicoActuante) }
                              </Tooltip> }
                          placement='top'
                        >
                            <div>
                                <Field
                                  name='medicoActuante'
                                  label='Nombe/Apellido'
                                  staticField={ lockEstudioEdition }
                                  placeholder='Nombre'
                                  align='left'
                                  validate={ requiredOption }
                                  component={ AsyncTypeaheadRF }
                                  options={ this.props.medicosActuantes }
                                  labelKey={ this.medicosTypeaheadRenderFunc }
                                  onSearch={ this.searchMedicosActuantes }
                                  onChange={ this.setSelectedMedicoActuante }
                                  selected={
                                      this.props.selectedMedicoActuante
                                  }
                                  renderMenuItemChildren={ this.renderMedicoMenuItem }
                                  isLoading={ this.props.medicoActuanteApiLoading }
                                />
                            </div>
                        </OverlayTrigger>
                    </fieldset>
                    <fieldset>
                        <legend>Medico Solicitante</legend>
                        <OverlayTrigger
                          overlay={
                              <Tooltip id='t-medico-solicitante'>
                                  { this.getMedicoText(this.props.selectedMedicoSolicitante) }
                              </Tooltip> }
                          placement='top'
                        >
                            <div>
                                <Field
                                  name='medicoSolicitante'
                                  label='Nombe/Apellido'
                                  staticField={ lockEstudioEdition }
                                  placeholder='Nombre'
                                  align='left'
                                  validate={ requiredOption }
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
                            </div>
                        </OverlayTrigger>
                    </fieldset>
                    <fieldset>
                        <legend>Anestesista</legend>
                        <OverlayTrigger
                          overlay={
                              <Tooltip id='t-anestesista'>
                                  { this.getMedicoText(this.props.selectedAnestesista) }
                              </Tooltip> }
                          placement='top'
                        >
                            <div>
                                <Field
                                  name='anestesista'
                                  label='Nombe/Apellido o matricula'
                                  staticField={ lockEstudioEdition }
                                  placeholder='Nombre'
                                  align='left'
                                  component={ AsyncTypeaheadRF }
                                  options={ this.props.anestesistas }
                                  labelKey={ this.anestesistaTypeaheadRenderFunc }
                                  onSearch={ this.searchAnestesista }
                                  onChange={ this.setSelectedAnestesista }
                                  selected={
                                      this.props.selectedAnestesista
                                  }
                                  renderMenuItemChildren={ this.renderAnestesistaMenuItem }
                                  isLoading={ this.props.anestesistaApiLoading }
                                />
                            </div>
                        </OverlayTrigger>
                    </fieldset>
                    <fieldset>
                        <legend>Practica</legend>
                        <OverlayTrigger
                          overlay={
                              <Tooltip id='t-anestesista'>
                                  { this.getPracticaText(this.props.selectedPractica) }
                              </Tooltip> }
                          placement='top'
                        >
                            <div>
                                <Field
                                  name='practica'
                                  label='Descripcion'
                                  staticField={ lockEstudioEdition }
                                  placeholder='descripcion'
                                  align='left'
                                  validate={ requiredOption }
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
                                  clearButton
                                />
                            </div>
                        </OverlayTrigger>
                    </fieldset>
                    <Field
                      name='motivo'
                      staticField={ lockEstudioEdition }
                      type='text'
                      label='Motivo'
                      validate={ alphaNum }
                      component={ InputRF }
                    />
                    <Field
                      name='informe'
                      staticField={ lockEstudioEdition }
                      type='textarea'
                      label='Informe'
                      style={ { height: '200px' } }
                      validate={ alphaNum }
                      component={ InputRF }
                    />
                    <div className='pull-right'>
                        <Button
                          type='submit'
                          bsStyle='primary'
                          disabled={ !this.props.valid || lockEstudioEdition }
                        >
                            { this.props.estudioDetailFormMode === 'edit' ? 'Guardar' : 'Crear' }
                        </Button>
                    </div>
                    <div className='clearfix' />
                </form>

            </div>
        );
    }
}

const { func, array, bool, object, string } = React.PropTypes;

EstudioDetailMain.propTypes = {
    handleSubmit: func.isRequired,
    estudioDetail: object.isRequired,
    fetchObrasSociales: func.isRequired,
    fetchMedicosActuantes: func.isRequired,
    fetchMedicosSolicitantes: func.isRequired,
    fetchAnestesista: func.isRequired,
    fetchPracticas: func.isRequired,
    fetchPacientes: func.isRequired,
    setSelectedObraSocial: func.isRequired,
    setSelectedMedicoActuante: func.isRequired,
    setSelectedMedicoSolicitante: func.isRequired,
    setSelectedAnestesista: func.isRequired,
    setSelectedPaciente: func.isRequired,
    setSelectedPractica: func.isRequired,
    selectedObraSocial: array,
    selectedMedicoActuante: array,
    selectedMedicoSolicitante: array,
    selectedAnestesista: array,
    selectedPaciente: array,
    selectedPractica: array,
    obrasSociales: array,
    medicosActuantes: array,
    medicosSolicitantes: array,
    anestesistas: array,
    practicas: array,
    pacientes: array,
    obrasSocialesApiLoading: bool.isRequired,
    medicoActuanteApiLoading: bool.isRequired,
    medicoSolicitanteApiLoading: bool.isRequired,
    anestesistaApiLoading: bool.isRequired,
    pacienteApiLoading: bool.isRequired,
    practicaApiLoading: bool.isRequired,
    valid: bool,
    updateEstudio: func.isRequired,
    createEstudio: func.isRequired,
    estudioDetailFormMode: string.isRequired,
};

const EstudioDetailMainReduxForm = reduxForm({
    form: 'editEstudio',
    // destroyOnUnmount: false,
    enableReinitialize: true,
})(EstudioDetailMain);

const selector = formValueSelector('editEstudio');

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
    let anestesista = selector(state, 'anestesista');
    anestesista = (anestesista && Array.isArray(anestesista))
            ? anestesista
            : [];
    let paciente = selector(state, 'paciente');
    paciente = (paciente && Array.isArray(paciente))
            ? paciente
            : [];

    let practica = selector(state, 'practica');
    practica = (practica && Array.isArray(practica))
            ? practica
            : [];

    return {
        estudioDetail: state.estudiosReducer.estudioDetail,
        initialValues: initEditFormObject(state.estudiosReducer.estudioDetail),
        obrasSociales: state.obraSocialReducer.obrasSociales,
        medicosActuantes: state.medicoReducer.medicosActuantes,
        medicosSolicitantes: state.medicoReducer.medicosSolicitantes,
        anestesistas: state.anestesistaReducer.anestesistas,
        pacientes: state.pacienteReducer.pacientes,
        practicas: state.practicaReducer.practicas,
        selectedObraSocial: obraSocial,
        selectedMedicoActuante: medicoActuante,
        selectedMedicoSolicitante: medicoSolicitante,
        selectedAnestesista: anestesista,
        selectedPaciente: paciente,
        selectedPractica: practica,
        obrasSocialesApiLoading: state.obraSocialReducer.isLoading || false,
        medicoActuanteApiLoading: state.medicoReducer.medicoActuanteApiLoading || false,
        medicoSolicitanteApiLoading: state.medicoReducer.medicoSolicitanteApiLoading || false,
        anestesistaApiLoading: state.anestesistaReducer.anestesistaApiLoading || false,
        pacienteApiLoading: state.pacienteReducer.pacienteApiLoading || false,
        practicaApiLoading: state.practicaReducer.practicaApiLoading || false,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchObrasSociales: nombre => dispatch({ type: FETCH_OBRAS_SOCIALES, nombre }),
        fetchMedicosActuantes: searchParams =>
            dispatch({ type: FETCH_MEDICOS_ACTUANTES, searchParams }),
        fetchMedicosSolicitantes: searchParams =>
            dispatch({ type: FETCH_MEDICOS_SOLICITANTES, searchParams }),
        fetchAnestesista: searchParams =>
            dispatch({ type: FETCH_ANESTESISTAS, searchParams }),
        fetchPacientes: searchText =>
            dispatch({ type: FETCH_PACIENTES, searchText }),
        fetchPracticas: searchText =>
            dispatch({ type: FETCH_PRACTICAS, searchText }),
        setSelectedObraSocial: obraSocial =>
            dispatch(change('editEstudio', 'obraSocial', obraSocial)),
        setSelectedMedicoActuante: medicoActuante =>
            dispatch(change('editEstudio', 'medicoActuante', medicoActuante)),
        setSelectedMedicoSolicitante: medicoSolicitante =>
            dispatch(change('editEstudio', 'medicoSolicitante', medicoSolicitante)),
        setSelectedAnestesista: anestesista =>
            dispatch(change('editEstudio', 'anestesista', anestesista)),
        setSelectedPaciente: paciente =>
            dispatch(change('editEstudio', 'paciente', paciente)),
        setSelectedPractica: practica =>
            dispatch(change('editEstudio', 'practica', practica)),
        updateEstudio: estudio =>
            dispatch({ type: UPDATE_ESTUDIO, estudio }),
        createEstudio: estudio =>
            dispatch({ type: CREATE_ESTUDIO, estudio }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EstudioDetailMainReduxForm);
