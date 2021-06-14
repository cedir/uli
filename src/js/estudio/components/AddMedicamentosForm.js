/* eslint-disable no-undef */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap/dist/react-bootstrap';
import { Field, reduxForm, change, formValueSelector } from 'redux-form';
import { FETCH_MEDICAMENTOS } from '../../medicamento/actionTypes';
import { ADD_MEDICACION_ESTUDIO, ADD_DEFAULT_MEDICACION_ESTUDIO } from '../../medicacion/actionTypes';
import addMedicamentosFormInitialState from '../addMedicamentosFormInitialState';
import AsyncTypeaheadRF from '../../utilities/AsyncTypeaheadRF';
import InputRF from '../../utilities/InputRF';
import { ESTADOS } from '../constants';

class AddMedicamentosForm extends Component {
    constructor(props) {
        super(props);

        this.searchMedicamentos = this.searchMedicamentos.bind(this);
        this.setSelectedMedicamento = this.setSelectedMedicamento.bind(this);
        this.addMedicacionToEstudio = this.addMedicacionToEstudio.bind(this);
        this.addDefaultMedicacionToEstudio = this.addDefaultMedicacionToEstudio.bind(this);
    }

    setSelectedMedicamento(selection) {
        if (selection[0] && selection[0].id) {
            this.props.setSelectedMedicamento(selection[0]);
            this.props.setImporte(selection[0]);
        } else {
            this.props.resetImporteMedicamento();
        }
    }

    searchMedicamentos(searchText) {
        this.props.fetchMedicamentos(searchText);
    }

    addMedicacionToEstudio(params) {
        const medicacion = {
            estudio: this.props.estudioDetail.id,
            medicamento: params.medicamento[0].id,
            importe: params.importe,
        };
        const { seccion } = this.props.params;
        this.props.addMedicacionToEstudio(medicacion, seccion);
    }

    addDefaultMedicacionToEstudio() {
        const estudioId = this.props.estudioDetail.id;
        const { seccion } = this.props.params;

        this.props.addDefaultMedicacionToEstudio(estudioId, seccion);
    }

    render() {
        const { selectedMedicamento, importe } = this.props;
        const medicamentoIsSelected =
            (Array.isArray(selectedMedicamento) && selectedMedicamento[0]
            && selectedMedicamento[0].id);
        const { presentacion } = this.props.estudioDetail;
        const estadoPresentacion = presentacion ? presentacion.estado : undefined;
        const isPresentacionEditable =
            estadoPresentacion === ESTADOS.ABIERTO;
        const lockEstudioEdition =
            (estadoPresentacion && isPresentacionEditable) || false;
        return (
            <div>
                <form onSubmit={ this.props.handleSubmit(this.addMedicacionToEstudio) }>
                    <h4 style={ { marginBottom: '12px' } }>Buscar medicamento</h4>
                    <fieldset>
                        <div>
                            <Field
                              name='medicamento'
                              label='Nombre'
                              staticField={ lockEstudioEdition }
                              align='left'
                              component={ AsyncTypeaheadRF }
                              options={ this.props.medicamentos }
                              labelKey='descripcion'
                              onSearch={ this.searchMedicamentos }
                              onChange={ this.setSelectedMedicamento }
                              isLoading={ this.props.medicamentosApiLoading }
                            />
                        </div>
                    </fieldset>
                    <Field
                      name='importe'
                      type='number'
                      staticField={ !medicamentoIsSelected }
                      label='Importe'
                      component={ InputRF }
                    />
                    <Button
                      type='submit'
                      bsStyle='primary'
                      style={ { marginRight: '12px' } }
                      disabled={ !(medicamentoIsSelected && importe && !lockEstudioEdition) }
                    >
                        Agregar
                    </Button>
                    <Button
                      bsStyle='primary'
                      onClick={ this.addDefaultMedicacionToEstudio }
                      disabled={ lockEstudioEdition }
                    >
                        Medicacion Por defecto
                    </Button>
                </form>
            </div>
        );
    }
}

const { func, array, bool, string, object } = PropTypes;

AddMedicamentosForm.propTypes = {
    handleSubmit: func.isRequired,
    estudioDetail: object.isRequired,
    medicamentos: array.isRequired,
    medicamentosApiLoading: bool.isRequired,
    selectedMedicamento: array.isRequired,
    importe: string.isRequired,
    fetchMedicamentos: func.isRequired,
    setSelectedMedicamento: func.isRequired,
    setImporte: func.isRequired,
    resetImporteMedicamento: func.isRequired,
    addMedicacionToEstudio: func.isRequired,
    addDefaultMedicacionToEstudio: func.isRequired,
    params: object.isRequired,
};

AddMedicamentosForm.defaultProps = {
    medicamentos: [],
    medicamentosApiLoading: false,
    selectedMedicamento: [],
    importe: '',
};

const AddMedicamentosFormReduxForm = reduxForm({
    form: 'searchMedicamentos',
})(AddMedicamentosForm);

const selector = formValueSelector('searchMedicamentos');

function mapStateToProps(state) {
    return {
        estudioDetail: state.estudiosReducer.estudioDetail,
        medicamentos: state.medicamentoReducer.medicamentos || [],
        medicamentosApiLoading: state.medicamentoReducer.medicamentosApiLoading || false,
        selectedMedicamento: selector(state, 'medicamento'),
        importe: selector(state, 'importe'),
        initialValues: addMedicamentosFormInitialState,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchMedicamentos: descripcion =>
            dispatch({ type: FETCH_MEDICAMENTOS, descripcion }),
        setSelectedMedicamento: medicamento =>
            dispatch(change('searchMedicamentos', 'medicamento', medicamento)),
        setImporte: medicamento =>
            dispatch(change('searchMedicamentos', 'importe', medicamento.importe)),
        resetImporteMedicamento: () => dispatch(change('searchMedicamentos', 'importe', '')),
        addMedicacionToEstudio: (medicacion, seccion) =>
            dispatch({ type: ADD_MEDICACION_ESTUDIO, medicacion, seccion }),
        addDefaultMedicacionToEstudio: (estudioId, seccion) =>
            dispatch({ type: ADD_DEFAULT_MEDICACION_ESTUDIO, estudioId, seccion }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMedicamentosFormReduxForm);
