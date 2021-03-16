import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, Form } from 'redux-form';
import { Row, Col, Button }
    from 'react-bootstrap/dist/react-bootstrap';
import AsyncTypeaheadRF from '../../utilities/AsyncTypeaheadRF';
import InputRF from '../../utilities/InputRF';
import obrasSocialesInitialState from '../../obraSocial/obraSocialReducerInitialState';
import medicosInitialState from '../../medico/medicoReducerInitialState';
import { FETCH_ESTUDIOS_DIARIOS } from '../actionTypes';
import { FETCH_OBRAS_SOCIALES } from '../../obraSocial/actionTypes';
import { FETCH_MEDICOS_ACTUANTES, FETCH_MEDICOS_SOLICITANTES } from '../../medico/actionTypes';
import { required, dateBeforeThan, dateAfterThan }
    from '../../utilities/reduxFormValidators';
import ObraSocialForm from './search-estudios/ObraSocialForm';
import PacienteForm from './search-estudios/PacienteForm';

function SearchEstudiosForm({
    fetchObrasSociales,
    fetchMedicosActuantes,
    fetchSolicitantes,
    medicoActuante,
    medicoSolicitante,
    setModalOpened,
    fetchEstudios,
    handleSubmit,
    obrasSocialesApiLoading,
    obrasSociales,
    obraSocial,
    medicosSolicitantes,
    medicosActuantes,
    submitting,
    valid,
}) {
    const buscarMedicos = (id, searchText, searchMedics) => searchMedics({ id, searchText });

    const medicosTypeaheadRenderFunc = (option) => {
        if (!option.nombre || !option.apellido) {
            return '';
        }

        return `${option.apellido}, ${option.nombre}`;
    };

    const renderMedicoMenuItem = option => (
        <div style={ { width: '100%' } } key={ option.id }>
            { `${option.apellido}, ${option.nombre}` }
        </div>
    );

    return (
        <Form
          onSubmit={ handleSubmit((params) => { setModalOpened(false); fetchEstudios(params); }) }
        >
            <Row>
                <Col md={ 9 }>
                    <Row>
                        <Col md={ 3 }>
                            <ObraSocialForm
                              obrasSociales={ obrasSociales }
                              obraSocial={ obraSocial }
                              fetchObrasSociales={ fetchObrasSociales }
                              apiLoading={ obrasSocialesApiLoading }
                            />
                        </Col>
                        <Col md={ 9 }>
                            <PacienteForm />
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
                                  options={ medicosSolicitantes }
                                  labelKey={ medicosTypeaheadRenderFunc }
                                  onSearch={ text =>
                                    buscarMedicos(medicoSolicitante.id, text, fetchSolicitantes) }
                                  selected={ medicoSolicitante }
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
                                  options={ medicosActuantes }
                                  labelKey={ medicosTypeaheadRenderFunc }
                                  onSearch={ text =>
                                    buscarMedicos(medicoActuante.id, text, fetchMedicosActuantes) }
                                  selected={ medicoActuante }
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
                      disabled={ submitting || !valid }
                    >
                        Buscar Estudios
                    </Button>
                </Col>
            </Row>
        </Form>
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
    fetchSolicitantes: func.isRequired,
    obraSocial: array.isRequired,
    medicoActuante: array.isRequired,
    medicoSolicitante: array.isRequired,
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
        obraSocial,
        medicoActuante,
        medicoSolicitante,
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
        fetchSolicitantes: searchParams =>
            dispatch({ type: FETCH_MEDICOS_SOLICITANTES, searchParams }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchEstudiosFormReduxForm);
