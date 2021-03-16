import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector, Form } from 'redux-form';
import { Row, Col, Button } from 'react-bootstrap/dist/react-bootstrap';
import obrasSocialesInitialState from '../../obraSocial/obraSocialReducerInitialState';
import medicosInitialState from '../../medico/medicoReducerInitialState';
import { FETCH_ESTUDIOS_DIARIOS } from '../actionTypes';
import { FETCH_OBRAS_SOCIALES } from '../../obraSocial/actionTypes';
import { FETCH_MEDICOS_ACTUANTES, FETCH_MEDICOS_SOLICITANTES } from '../../medico/actionTypes';
import ObraSocialForm from './search-estudios/ObraSocialForm';
import PacienteForm from './search-estudios/PacienteForm';
import MedicoForm from './search-estudios/MedicoForm';
import FechaForm from './search-estudios/FechaForm';

function SearchEstudiosForm({
    fetchObrasSociales,
    fetchActuantes,
    fetchSolicitantes,
    medicoActuante,
    medicoSolicitante,
    medicoSolicitanteApiLoading,
    medicoActuanteApiLoading,
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
                        <MedicoForm
                          medicosSolicitantes={ medicosSolicitantes }
                          medicosActuantes={ medicosActuantes }
                          solicitante={ medicoSolicitante }
                          actuante={ medicoActuante }
                          buscarMedicos={ buscarMedicos }
                          fetchSolicitantes={ fetchSolicitantes }
                          fetchActuantes={ fetchActuantes }
                          apiLoading={ medicoActuanteApiLoading || medicoSolicitanteApiLoading }
                        />
                    </Row>
                </Col>
                <Col md={ 3 }>
                    <FechaForm />
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
    fetchActuantes: func.isRequired,
    fetchSolicitantes: func.isRequired,
    obraSocial: array.isRequired,
    medicoActuante: array.isRequired,
    medicoSolicitante: array.isRequired,
    obrasSociales: array,
    medicosActuantes: array,
    medicosSolicitantes: array,
    setModalOpened: func,
    obrasSocialesApiLoading: bool.isRequired,
    medicoSolicitanteApiLoading: bool.isRequired,
    medicoActuanteApiLoading: bool.isRequired,
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
        fetchActuantes: searchParams =>
            dispatch({ type: FETCH_MEDICOS_ACTUANTES, searchParams }),
        fetchSolicitantes: searchParams =>
            dispatch({ type: FETCH_MEDICOS_SOLICITANTES, searchParams }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchEstudiosFormReduxForm);
