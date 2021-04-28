import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector, Form, change } from 'redux-form';
import { Row, Col, Button } from 'react-bootstrap/dist/react-bootstrap';
import obrasSocialesInitialState from '../../obraSocial/obraSocialReducerInitialState';
import medicosInitialState from '../../medico/medicoReducerInitialState';
import { FETCH_ESTUDIOS_DIARIOS, FETCH_ESTUDIOS_DIARIOS_CON_ASOCIADOS } from '../actionTypes';
import { FETCH_OBRAS_SOCIALES } from '../../obraSocial/actionTypes';
import { FETCH_MEDICOS_ACTUANTES, FETCH_MEDICOS_SOLICITANTES } from '../../medico/actionTypes';
import ObraSocialForm from './search-estudios/ObraSocialForm';
import PacienteForm from './search-estudios/PacienteForm';
import MedicoForm from './search-estudios/MedicoForm';
import FechaForm from './search-estudios/FechaForm';
import { FETCH_PRACTICAS } from '../../practica/actionTypes';
import PracticaForm from './search-estudios/PracticaForm';

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
    fetchEstudiosConAsociados,
    handleSubmit,
    obrasSocialesApiLoading,
    obrasSociales,
    obraSocial,
    medicosSolicitantes,
    medicosActuantes,
    removeDate,
    practicas,
    practica,
    fetchPracticas,
    practicaApiLoading,
    submitting,
    valid,
    fromCaja,
}) {
    const buscarMedicos = (id, searchText, searchMedics) => searchMedics({ id, searchText });
    return (
        <Form
          onSubmit={ handleSubmit((params) => {
              setModalOpened(false);
              if (fromCaja) {
                  fetchEstudiosConAsociados(params);
              } else {
                  fetchEstudios(params);
              }
          }) }
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
                    <FechaForm removeDate={ removeDate } />
                </Col>
            </Row>
            <Row>
                <Col md={ 9 }>
                    <PracticaForm
                      practicas={ practicas }
                      practica={ practica }
                      apiLoading={ practicaApiLoading }
                      fetchPracticas={ fetchPracticas }
                    />
                </Col>
                <Col md={ 3 } style={ { textAlign: 'right', marginTop: '8rem' } }>
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
    fetchEstudiosConAsociados: func.isRequired,
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
    removeDate: func.isRequired,
    practicas: array.isRequired,
    practica: array.isRequired,
    fetchPracticas: func.isRequired,
    practicaApiLoading: bool.isRequired,
    fromCaja: bool,
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

    let practica = selector(state, 'practica');
    practica = (practica && Array.isArray(practica))
            ? practica
            : [];

    return {
        resultPages: state.estudiosReducer.resultPages,
        obrasSociales: state.obraSocialReducer.obrasSociales,
        medicosActuantes: state.medicoReducer.medicosActuantes,
        medicosSolicitantes: state.medicoReducer.medicosSolicitantes,
        obraSocial,
        medicoActuante,
        medicoSolicitante,
        practica,
        obrasSocialesApiLoading: state.obraSocialReducer.isLoading || false,
        medicoActuanteApiLoading: state.medicoReducer.medicoActuanteApiLoading || false,
        medicoSolicitanteApiLoading: state.medicoReducer.medicoSolicitanteApiLoading || false,
        initialValues: state.estudiosReducer.searchEstudiosParams,
        practicas: state.practicaReducer.practicas,
        practicaApiLoading: state.practicaReducer.practicaApiLoading || false,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchEstudios: fetchEstudiosParams =>
            dispatch({ type: FETCH_ESTUDIOS_DIARIOS, fetchEstudiosParams }),
        fetchEstudiosConAsociados: fetchEstudiosParams =>
            dispatch({ type: FETCH_ESTUDIOS_DIARIOS_CON_ASOCIADOS, fetchEstudiosParams }),
        fetchObrasSociales: nombre => dispatch({ type: FETCH_OBRAS_SOCIALES, nombre }),
        fetchActuantes: searchParams =>
            dispatch({ type: FETCH_MEDICOS_ACTUANTES, searchParams }),
        fetchSolicitantes: searchParams =>
            dispatch({ type: FETCH_MEDICOS_SOLICITANTES, searchParams }),
        removeDate: name => dispatch(change('searchEstudios', name, '')),
        fetchPracticas: searchText => dispatch({ type: FETCH_PRACTICAS, searchText }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchEstudiosFormReduxForm);
