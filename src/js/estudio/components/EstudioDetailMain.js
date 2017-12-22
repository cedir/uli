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
        obraSocial: estudio.obra_social.nombre,
        medicoActuante: `${estudio.medico.apellido}, ${estudio.medico.nombre}`,
        medicoSolicitante:
            `${estudio.medico_solicitante.apellido}, ${estudio.medico_solicitante.nombre}`,
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

        this.saveModifiedEstudio = this.saveModifiedEstudio.bind(this);
        this.searchObrasSociales = this.searchObrasSociales.bind(this);
        this.searchMedicosActuantes = this.searchMedicosActuantes.bind(this);
        this.searchMedicosSolicitantes = this.searchMedicosSolicitantes.bind(this);
        this.renderObraSocialMenuItem = this.renderObraSocialMenuItem.bind(this);
        this.renderMedicoMenuItem = this.renderMedicoMenuItem.bind(this);
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
        const obraSocial = estudio.obra_social;
        const medicoActuante = estudio.medico;
        const medicoSolicitante = estudio.medico_solicitante;

        return (
            <div>
                <form>
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
                              defaultSelected={ [obraSocial] }
                              renderMenuItemChildren={ this.renderObraSocialMenuItem }
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
                        />
                        <Field
                          name='nombrePaciente'
                          type='text'
                          label='Nombre'
                          validate={ alpha }
                          component={ InputRF }
                        />
                        <Field
                          name='apellidoPaciente'
                          type='text'
                          label='Apellido'
                          validate={ alpha }
                          component={ InputRF }
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
                          defaultSelected={ [medicoActuante] }
                          renderMenuItemChildren={ this.renderMedicoMenuItem }
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
                          defaultSelected={ [medicoSolicitante] }
                          renderMenuItemChildren={ this.renderMedicoMenuItem }
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
                      onClick={ this.saveModifiedEstudio }
                      bsStyle='primary'
                    >
                        Guardar
                    </Button>
                </form>

            </div>
        );
    }
}

const { object, func, array } = React.PropTypes;

EstudioDetailMain.propTypes = {
    estudioDetail: object.isRequired,
    fetchObrasSociales: func.isRequired,
    fetchMedicosActuantes: func.isRequired,
    fetchMedicosSolicitantes: func.isRequired,
    obrasSociales: array,
    medicosActuantes: array,
    medicosSolicitantes: array,
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
