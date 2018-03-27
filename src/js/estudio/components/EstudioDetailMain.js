import React, { Component } from 'react';
import { Button } from 'react-bootstrap/dist/react-bootstrap';
import { connect } from 'react-redux';
import { Field, reduxForm, change, formValueSelector } from 'redux-form';
import AsyncTypeaheadRF from '../../utilities/AsyncTypeaheadRF';
import InputRF from '../../utilities/InputRF';
import { FETCH_OBRAS_SOCIALES } from '../../obraSocial/actionTypes';
import { FETCH_MEDICOS_ACTUANTES, FETCH_MEDICOS_SOLICITANTES } from '../../medico/actionTypes';
import { FETCH_PACIENTES } from '../../paciente/actionTypes';
import { FETCH_PRACTICAS } from '../../practica/actionTypes';
import { UPDATE_ESTUDIO } from '../../estudio/actionTypes';

import { requiredOption, alphaNum } from '../../utilities/reduxFormValidators';
// import { stat } from 'fs';

function initEditFormObject(estudio) {
    return {
        obraSocial: [estudio.obra_social],
        medicoActuante: [estudio.medico],
        medicoSolicitante: [estudio.medico_solicitante],
        paciente: [estudio.paciente],
        fecha: estudio.fecha,
        practica: [estudio.practica],
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
        this.setSelectedPaciente = this.setSelectedPaciente.bind(this);
        this.setSelectedPractica = this.setSelectedPractica.bind(this);
        this.searchObrasSociales = this.searchObrasSociales.bind(this);
        this.searchMedicosActuantes = this.searchMedicosActuantes.bind(this);
        this.searchMedicosSolicitantes = this.searchMedicosSolicitantes.bind(this);
        this.searchPacientes = this.searchPacientes.bind(this);
        this.searchPracticas = this.searchPracticas.bind(this);
        this.medicosTypeaheadRenderFunc = this.medicosTypeaheadRenderFunc.bind(this);
        this.pacientesTypeaheadRenderFunc = this.pacientesTypeaheadRenderFunc.bind(this);
        this.renderObraSocialMenuItem = this.renderObraSocialMenuItem.bind(this);
        this.renderMedicoMenuItem = this.renderMedicoMenuItem.bind(this);
        this.renderPacienteMenuItem = this.renderPacienteMenuItem.bind(this);
        this.updateEstudio = this.updateEstudio.bind(this);
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

    updateEstudio(estudio) {
        const params = Object.assign({}, estudio, { id: this.props.estudioDetail.id });
        this.props.updateEstudio(params);
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

    searchPacientes(searchText) {
        this.props.fetchPacientes(searchText);
    }

    searchPracticas(searchText) {
        this.props.fetchPracticas(searchText);
    }

    medicosTypeaheadRenderFunc(option) {
        if (!option.nombre || !option.apellido) {
            return '';
        }

        return `${option.apellido}, ${option.nombre}`;
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

        return option.descripcion;
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

    renderPacienteMenuItem(option) {
        return (
            <div style={ { width: '100%' } } key={ option.id }>
                { `${option.apellido}, ${option.nombre}` }
                <div>{ option.dni }</div>
            </div>
        );
    }

    renderPractica(option) {
        return (
            <div style={ { width: '100%' } } key={ option.id }>
                { option.descripcion }
            </div>
        );
    }

    render() {
        return (
            <div>
                <form onSubmit={ this.props.handleSubmit(editParams =>
                    this.updateEstudio(editParams)) }
                >
                    <Field
                      name='fecha'
                      type='date'
                      label='fecha'
                      component={ InputRF }
                    />
                    <fieldset>
                        <legend>Obra Social</legend>
                        <div style={ { position: 'realtive' } }>
                            <Field
                              name='obraSocial'
                              label='Nombre'
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
                    </fieldset>
                    <fieldset>
                        <legend>Paciente</legend>
                        <Field
                          name='paciente'
                          label='Nombre'
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
                    </fieldset>
                    <fieldset>
                        <legend>Medico Actuante</legend>
                        <Field
                          name='medicoActuante'
                          label='Nombe/Apellido'
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
                    </fieldset>
                    <fieldset>
                        <legend>Medico Solicitante</legend>
                        <Field
                          name='medicoSolicitante'
                          label='Nombe/Apellido'
                          placeholder='Nombre'
                          align='left'
                          validate={ requiredOption }
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
                          isLoading={ this.props.medicoSolicitanteApiLoading }
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Practica</legend>
                        <Field
                          name='practica'
                          label='Descripcion'
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
                        />
                    </fieldset>
                    <Field
                      name='motivo'
                      type='text'
                      label='Motivo'
                      validate={ alphaNum }
                      component={ InputRF }
                    />
                    <Field
                      name='informe'
                      type='textarea'
                      label='Informe'
                      validate={ alphaNum }
                      component={ InputRF }
                    />
                    <Button
                      type='submit'
                      bsStyle='primary'
                      disabled={ !this.props.valid }
                    >
                        Guardar
                    </Button>
                </form>

            </div>
        );
    }
}

const { func, array, bool, object } = React.PropTypes;

EstudioDetailMain.propTypes = {
    handleSubmit: func.isRequired,
    estudioDetail: object.isRequired,
    fetchObrasSociales: func.isRequired,
    fetchMedicosActuantes: func.isRequired,
    fetchMedicosSolicitantes: func.isRequired,
    fetchPracticas: func.isRequired,
    fetchPacientes: func.isRequired,
    setSelectedObraSocial: func.isRequired,
    setSelectedMedicoActuante: func.isRequired,
    setSelectedMedicoSolicitante: func.isRequired,
    setSelectedPaciente: func.isRequired,
    setSelectedPractica: func.isRequired,
    selectedObraSocial: array,
    selectedMedicoActuante: array,
    selectedMedicoSolicitante: array,
    selectedPaciente: array,
    selectedPractica: array,
    obrasSociales: array,
    medicosActuantes: array,
    medicosSolicitantes: array,
    practicas: array,
    pacientes: array,
    obrasSocialesApiLoading: bool.isRequired,
    medicoActuanteApiLoading: bool.isRequired,
    medicoSolicitanteApiLoading: bool.isRequired,
    pacienteApiLoading: bool.isRequired,
    practicaApiLoading: bool.isRequired,
    valid: bool,
    updateEstudio: func.isRequired,
};

const EstudioDetailMainReduxForm = reduxForm({
    form: 'editEstudio',
    destroyOnUnmount: false,
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
        pacientes: state.pacienteReducer.pacientes,
        practicas: state.practicaReducer.practicas,
        selectedObraSocial: obraSocial,
        selectedMedicoActuante: medicoActuante,
        selectedMedicoSolicitante: medicoSolicitante,
        selectedPaciente: paciente,
        selectedPractica: practica,
        obrasSocialesApiLoading: state.obraSocialReducer.isLoading || false,
        medicoActuanteApiLoading: state.medicoReducer.medicoActuanteApiLoading || false,
        medicoSolicitanteApiLoading: state.medicoReducer.medicoSolicitanteApiLoading || false,
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
        setSelectedPaciente: paciente =>
            dispatch(change('editEstudio', 'paciente', paciente)),
        setSelectedPractica: practica =>
            dispatch(change('editEstudio', 'practica', practica)),
        updateEstudio: estudio =>
            dispatch({ type: UPDATE_ESTUDIO, estudio }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EstudioDetailMainReduxForm);
