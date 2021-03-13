import React from 'react';
import PropTypes from 'prop-types';
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

function SearchEstudiosForm(props) {
    const setSelectedObraSocial = (selection) => {
        if (selection[0] && selection[0].id) {
            props.setSelectedObraSocial(selection[0]);
        }
    };

    const setSelectedMedicoActuante = (selection) => {
        if (selection[0] && selection[0].id) {
            props.setSelectedMedicoActuante(selection[0]);
        }
    };

    const setSelectedMedicoSolicitante = (selection) => {
        if (selection[0] && selection[0].id) {
            props.setSelectedMedicoSolicitante(selection[0]);
        }
    };

    const searchObrasSociales = (nombre) => {
        props.fetchObrasSociales(nombre);
    };

    const searchMedicosActuantes = (searchText) => {
        const selectedMedicoActuante = props.selectedMedicoActuante;
        if (selectedMedicoActuante.fullName === searchText && selectedMedicoActuante.id) {
            props.fetchMedicosActuantes({ id: selectedMedicoActuante.id });
        } else {
            props.fetchMedicosActuantes({ searchText });
        }
    };

    const searchMedicosSolicitantes = (searchText) => {
        const selectedMedicoSolicitante = props.selectedMedicoSolicitante;
        if (selectedMedicoSolicitante.fullName === searchText && selectedMedicoSolicitante.id) {
            props.fetchMedicosSolicitantes({ id: selectedMedicoSolicitante.id });
        } else {
            props.fetchMedicosSolicitantes({ searchText });
        }
    };

    const searchEstudios = (searchParams) => {
        if (props.setModalOpened) {
            props.setModalOpened(false);
        }

        props.fetchEstudios(searchParams);
    };

    const filterByCallback = (option, text) => (
          option.nombre.toLowerCase().indexOf(text.toLowerCase()) !== -1 ||
          option.apellido.toLowerCase().indexOf(text.toLowerCase()) !== -1
        );

    const medicosTypeaheadRenderFunc = (option) => {
        if (!option.nombre || !option.apellido) {
            return '';
        }

        return `${option.apellido}, ${option.nombre}`;
    };

    const renderObraSocialMenuItem = option => (
        <div key={ option.id }>
            { option.nombre }
        </div>
    );

    const renderMedicoMenuItem = option => (
        <div style={ { width: '100%' } } key={ option.id }>
            { `${option.apellido}, ${option.nombre}` }
        </div>
    );

    return (
        <form onSubmit={ props.handleSubmit(searchEstudios) }>
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
                                      options={ props.obrasSociales }
                                      labelKey='nombre'
                                      onSearch={ searchObrasSociales }
                                      onChange={ setSelectedObraSocial }
                                      selected={ props.selectedObraSocial }
                                      renderMenuItemChildren={ renderObraSocialMenuItem }
                                      isLoading={ props.obrasSocialesApiLoading }
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
                                  options={ props.medicosSolicitantes }
                                  filterBy={ filterByCallback }
                                  labelKey={ medicosTypeaheadRenderFunc }
                                  onSearch={ searchMedicosSolicitantes }
                                  onChange={ setSelectedMedicoSolicitante }
                                  selected={
                                    props.selectedMedicoSolicitante
                                  }
                                  renderMenuItemChildren={ renderMedicoMenuItem }
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
                                  options={ props.medicosActuantes }
                                  filterBy={ filterByCallback }
                                  labelKey={ medicosTypeaheadRenderFunc }
                                  onSearch={ searchMedicosActuantes }
                                  onChange={ setSelectedMedicoActuante }
                                  selected={
                                    props.selectedMedicoActuante
                                  }
                                  renderMenuItemChildren={ renderMedicoMenuItem }
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
                      disabled={ props.submitting || !props.valid }
                    >
                        Buscar Estudios
                    </Button>
                </Col>
            </Row>
        </form>
    );
}

SearchEstudiosForm.defaultProps = {
    obrasSociales: obrasSocialesInitialState.obrasSociales,
    medicos: medicosInitialState.medicos,
};

const { func, array, bool } = PropTypes;

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
    setModalOpened: func,
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
