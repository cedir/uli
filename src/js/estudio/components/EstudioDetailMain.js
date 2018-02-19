import React, { Component } from 'react';
import { Button } from 'react-bootstrap/dist/react-bootstrap';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import AsyncTypeaheadRF from '../../utilities/AsyncTypeaheadRF';
import InputRF from '../../utilities/InputRF';
import { FETCH_OBRAS_SOCIALES } from '../../obraSocial/actionTypes';
import { FETCH_MEDICOS_ACTUANTES, FETCH_MEDICOS_SOLICITANTES } from '../../medico/actionTypes';

import { alpha, dni } from '../../utilities/reduxFormValidators';

function initEditFormObject(estudio) {
    return {
        obraSocial: [estudio.obra_social],
        medicoActuante: [estudio.medico],
        medicoSolicitante: [estudio.medico_solicitante],
        fecha: estudio.fecha,
        dniPaciente: `${estudio.paciente.dni}`,
        nombrePaciente: estudio.paciente.nombre,
        apellidoPaciente: estudio.paciente.apellido,
        practica: estudio.practica.descripcion,
    };
}

class EstudioDetailMain extends Component {
    constructor(props) {
        super(props);

        this.setSelectedObraSocial = this.setSelectedObraSocial.bind(this);
        this.setSelectedMedicoActuante = this.setSelectedMedicoActuante.bind(this);
        this.setSelectedMedicoSolicitante = this.setSelectedMedicoSolicitante.bind(this);
        this.saveModifiedEstudio = this.saveModifiedEstudio.bind(this);
        this.searchObrasSociales = this.searchObrasSociales.bind(this);
        this.searchMedicosActuantes = this.searchMedicosActuantes.bind(this);
        this.searchMedicosSolicitantes = this.searchMedicosSolicitantes.bind(this);
        this.renderObraSocialMenuItem = this.renderObraSocialMenuItem.bind(this);
        this.renderMedicoMenuItem = this.renderMedicoMenuItem.bind(this);
        const estudio = this.props.estudioDetail;
        this.state = {
            obraSocial: estudio.obra_social,
            medicoActuante: estudio.medico,
            medicoSolicitante: estudio.medico_solicitante,
            fecha: estudio.fecha,
            paciente: estudio.paciente,
            practica: estudio.practica,
        };
    }

    setSelectedObraSocial(selection) {
        if (selection[0] && selection[0].id) {
            this.setState({ obraSocial: selection[0] });
        }
    }

    setSelectedMedicoActuante(selection) {
        if (selection[0] && selection[0].id) {
            this.setState({ medicoActuante: selection[0] });
        }
    }

    setSelectedMedicoSolicitante(selection) {
        if (selection[0] && selection[0].id) {
            this.setState({ medicoSolicitante: selection[0] });
        }
    }

    saveModifiedEstudio() {
        alert('under development');
    }

    searchMedicosActuantes(searchText) {
        this.props.fetchMedicosActuantes({ searchText });
    }

    searchObrasSociales(nombre) {
        this.props.fetchObrasSociales(nombre);
    }

    searchMedicosSolicitantes(searchText) {
        this.props.fetchMedicosSolicitantes({ searchText });
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
        const estudio = this.props.estudioDetail;
        // const obraSocial = estudio.obra_social;
        const medicoActuante = estudio.medico;
        const medicoSolicitante = estudio.medico_solicitante;

        return (
            <div>
                <form onSubmit={ this.props.handleSubmit(editParams => console.log(editParams)) }>
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
                              type='text'
                              label='Nombre'
                              align='left'
                              component={ AsyncTypeaheadRF }
                              options={ this.props.obrasSociales }
                              labelKey='nombre'
                              onSearch={ this.searchObrasSociales }
                              onChange={ this.setSelectedObraSocial }
                              defaultSelected={ [this.state.obraSocial] }
                              renderMenuItemChildren={ this.renderObraSocialMenuItem }
                              isLoading={ this.props.obrasSocialesApiLoading }
                            />
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Paciente</legend>
                        <Field
                          name='dniPaciente'
                          type='text'
                          label='dni'
                          validate={ dni }
                          component={ InputRF }
                          staticField
                        />
                        <Field
                          name='nombrePaciente'
                          type='text'
                          label='Nombre'
                          validate={ alpha }
                          component={ InputRF }
                          staticField
                        />
                        <Field
                          name='apellidoPaciente'
                          type='text'
                          label='Apellido'
                          validate={ alpha }
                          component={ InputRF }
                          staticField
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Medico Actuante</legend>
                        <Field
                          name='medicoActuante'
                          label='Nombe/Apellido'
                          component={ AsyncTypeaheadRF }
                          options={ this.props.medicosActuantes }
                          labelKey={ option => `${option.apellido}, ${option.nombre}` }
                          onSearch={ this.searchMedicosActuantes }
                          onChange={ this.setSelectedMedicoActuante }
                          defaultSelected={ [medicoActuante] }
                          renderMenuItemChildren={ this.renderMedicoMenuItem }
                          isLoading={ this.props.medicoActuanteApiLoading }
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Medico Solicitante</legend>
                        <Field
                          name='medicoSolicitante'
                          label='Nombe/Apellido'
                          component={ AsyncTypeaheadRF }
                          options={ this.props.medicosSolicitantes }
                          filterBy={ this.filterByCallback }
                          labelKey={ option => `${option.apellido}, ${option.nombre}` }
                          onSearch={ this.searchMedicosSolicitantes }
                          onChange={ this.setSelectedMedicoSolicitante }
                          defaultSelected={ [medicoSolicitante] }
                          renderMenuItemChildren={ this.renderMedicoMenuItem }
                          isLoading={ this.props.medicoSolicitanteApiLoading }
                        />
                    </fieldset>
                    <Field
                      name='practica'
                      type='text'
                      label='Practica'
                      validate={ alpha }
                      component={ InputRF }
                    />
                    <Button
                      type='submit'
                      bsStyle='primary'
                    >
                        Guardar
                    </Button>
                </form>

            </div>
        );
    }
}

const { object, func, array, bool } = React.PropTypes;

EstudioDetailMain.propTypes = {
    handleSubmit: func.isRequired,
    estudioDetail: object.isRequired,
    fetchObrasSociales: func.isRequired,
    fetchMedicosActuantes: func.isRequired,
    fetchMedicosSolicitantes: func.isRequired,
    obrasSociales: array,
    medicosActuantes: array,
    medicosSolicitantes: array,
    obrasSocialesApiLoading: bool.isRequired,
    medicoActuanteApiLoading: bool.isRequired,
    medicoSolicitanteApiLoading: bool.isRequired,
};

const EstudioDetailMainReduxForm = reduxForm({
    form: 'editEstudio',
    destroyOnUnmount: true,
    enableReinitialize: true,
})(EstudioDetailMain);

function mapStateToProps(state) {
    return {
        estudioDetail: state.estudiosReducer.estudioDetail,
        initialValues: initEditFormObject(state.estudiosReducer.estudioDetail),
        obrasSociales: state.obraSocialReducer.obrasSociales,
        medicosActuantes: state.medicoReducer.medicosActuantes,
        medicosSolicitantes: state.medicoReducer.medicosSolicitantes,
        obrasSocialesApiLoading: state.obraSocialReducer.isLoading || false,
        medicoActuanteApiLoading: state.medicoReducer.medicoActuanteApiLoading || false,
        medicoSolicitanteApiLoading: state.medicoReducer.medicoSolicitanteApiLoading || false,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchObrasSociales: nombre => dispatch({ type: FETCH_OBRAS_SOCIALES, nombre }),
        fetchMedicosActuantes: searchParams =>
            dispatch({ type: FETCH_MEDICOS_ACTUANTES, searchParams }),
        fetchMedicosSolicitantes: searchParams =>
            dispatch({ type: FETCH_MEDICOS_SOLICITANTES, searchParams }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EstudioDetailMainReduxForm);
