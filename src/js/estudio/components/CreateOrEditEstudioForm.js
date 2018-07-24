import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Row, Col, Button }
    from 'react-bootstrap/dist/react-bootstrap';
import AsyncTypeaheadRF from '../../utilities/AsyncTypeaheadRF';
import InputRF from '../../utilities/InputRF';
import initialState from '../searchEstudiosFormInitialState';
import obrasSocialesInitialState from '../../obraSocial/obraSocialReducerInitialState';
import medicosInitialState from '../../medico/medicoReducerInitialState';
import { FETCH_OBRAS_SOCIALES } from '../../obraSocial/actionTypes';
import { FETCH_MEDICOS } from '../../medico/actionTypes';
import { alpha, dni } from '../../utilities/reduxFormValidators';

class CreateOrEditEstudioForm extends React.Component {
    constructor(props) {
        super(props);

        this.searchObrasSociales = this.searchObrasSociales.bind(this);
        this.searchMedicos = this.searchMedicos.bind(this);
        this.renderObraSocialMenuItem = this.renderObraSocialMenuItem.bind(this);
        this.renderMedicoMenuItem = this.renderMedicoMenuItem.bind(this);
    }

    searchObrasSociales(nombre) {
        this.props.fetchObrasSociales(nombre);
    }

    searchMedicos(searchText) {
        this.props.fetchMedicos(searchText);
    }

    filterByCallback(option, text) {
        return (
          option.nombre.toLowerCase().indexOf(text.toLowerCase()) !== -1 ||
          option.apellido.toLowerCase().indexOf(text.toLowerCase()) !== -1
        );
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
        const mode = this.props.mode;
        const modeText = mode.toLowerCase() === 'edit' ? 'Editar' : 'Crear';
        return (
            <form
              onSubmit={ this.props.handleSubmit(() => console.log(modeText)) }
            >
                <Row>
                    <Col md={ 9 }>
                        <Row>
                            <Col md={ 3 }>
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
                                          renderMenuItemChildren={ this.renderObraSocialMenuItem }
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
                                      options={ this.props.medicos }
                                      filterBy={ this.filterByCallback }
                                      labelKey={ option => `${option.apellido}, ${option.nombre}` }
                                      onSearch={ this.searchMedicos }
                                      renderMenuItemChildren={ this.renderMedicoMenuItem }
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
                                      options={ this.props.medicos }
                                      labelKey={ option => `${option.apellido}, ${option.nombre}` }
                                      onSearch={ this.searchMedicos }
                                      renderMenuItemChildren={ this.renderMedicoMenuItem }
                                    />
                                </fieldset>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={ 3 }>
                        <Field
                          name='fechaDesde'
                          type='date'
                          label='fecha'
                          component={ InputRF }
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={ 12 } style={ { textAlign: 'right' } }>
                        <Button
                          bsStyle='primary'
                          type='submit'
                          disabled={ this.props.submitting || !this.props.valid }
                        >
                            { `${modeText} estudio` }
                        </Button>
                    </Col>
                </Row>
            </form>
        );
    }
}

CreateOrEditEstudioForm.defaultProps = {
    obrasSociales: obrasSocialesInitialState.obrasSociales,
    medicos: medicosInitialState.medicos,
};

const { func, array, bool, string } = PropTypes;

CreateOrEditEstudioForm.propTypes = {
    mode: string.isRequired,
    handleSubmit: func.isRequired,
    submitting: bool.isRequired,
    valid: bool.isRequired,
    fetchObrasSociales: func.isRequired,
    fetchMedicos: func.isRequired,
    obrasSociales: array,
    medicos: array,
};

const CreateOrEditEstudioFormReduxForm = reduxForm({
    form: 'createOrEditEstudio',
    initialValues: initialState,
    destroyOnUnmount: false,
})(CreateOrEditEstudioForm);

function mapStateToProps(state) {
    return {
        resultPages: state.estudiosReducer.resultPages,
        obrasSociales: state.obraSocialReducer.obrasSociales,
        medicos: state.medicoReducer.medicos,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchObrasSociales: nombre => dispatch({ type: FETCH_OBRAS_SOCIALES, nombre }),
        fetchMedicos: searchText => dispatch({ type: FETCH_MEDICOS, searchText }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrEditEstudioFormReduxForm);
