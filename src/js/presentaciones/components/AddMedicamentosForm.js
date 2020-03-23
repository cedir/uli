/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap/dist/react-bootstrap';
import { Field, reduxForm, change, formValueSelector } from 'redux-form';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import InputRF from '../../utilities/InputRF';
import addMedicamentosFormInitialState from '../../estudio/addMedicamentosFormInitialState';
import { ADD_DEFAULT_MEDICACION_ESTUDIO, ADD_MEDICACION_ESTUDIO } from '../../medicacion/actionTypes';
import { FETCH_MEDICAMENTOS } from '../../medicamento/actionTypes';

const AddMedicamentosForm = (props) => {
    const {
        handleSubmit,
        medicamentos,
        medicamentosApiLoading,
        selectedMedicamento,
        estudio,
        addMedicacionToEstudio,
        addDefaultMedicacionToEstudio,
        fetchMedicamentos,
        setSelectedMedicamento,
        setImporte,
    } = props;

    const selectedMedicamentoHandler = (selection) => {
        if (selection[0] && selection[0].id) {
            setSelectedMedicamento(selection[0]);
            setImporte(selection[0]);
        }
    };

    const searchMedicamentos = (searchText) => {
        fetchMedicamentos(searchText);
    };

    const addMedicacionToEstudioHandler = (params) => {
        const medicacion = {
            estudio: estudio.id,
            medicamento: params.medicamento[0].id,
            importe: params.importe,
        };
        addMedicacionToEstudio(medicacion);
    };

    const medicamentoIsSelected =
    (Array.isArray(selectedMedicamento) && selectedMedicamento[0]
    && selectedMedicamento[0].id);

    // const { presentacion } = estudioDetail;

    // const estadoPresentacion = presentacion ? presentacion.estado : undefined;

    // const lockEstudioEdition =
    // (estadoPresentacion && estadoPresentacion !== 2) || false;

    return (
        <div>
            <form onSubmit={ handleSubmit(addMedicacionToEstudioHandler) }>
                <h4 style={ { marginBottom: '12px' } }>
                    Buscar medicamento
                </h4>
                <fieldset>
                    <div>
                        <Field
                          name='medicamento'
                          label='Nombre'
                          component={ AsyncTypeahead }
                          options={ medicamentos }
                          labelKey='descripcion'
                          onSearch={ searchMedicamentos }
                          onChange={ selectedMedicamentoHandler }
                          isLoading={ medicamentosApiLoading }
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
                >
                    Agregar
                </Button>
                <Button
                  bsStyle='primary'
                  onClick={ () => addDefaultMedicacionToEstudio(estudio.id) }
                >
                    Medicacion por defecto
                </Button>
            </form>
        </div>
    );
};

const { func, array, bool, string, object } = PropTypes;

AddMedicamentosForm.propTypes = {
    handleSubmit: func.isRequired,
    estudioDetail: object.isRequired,
    medicamentos: array.isRequired,
    medicamentosApiLoading: bool.isRequired,
    selectedMedicamento: array.isRequired,
    importe: string.isRequired,
    setSelectedMedicamento: func.isRequired,
    setImporte: func.isRequired,
    estudio: object.isRequired,
    addMedicacionToEstudio: func.isRequired,
    addDefaultMedicacionToEstudio: func.isRequired,
    fetchMedicamentos: func.isRequired,
};

AddMedicamentosForm.defaultProps = {
    medicamentos: [],
    medicamentosApiLoading: false,
    selectedMedicamento: [],
    importe: '',
};

const AddMedicamentosFormReduxForm = reduxForm({
    form: 'searchMedicamentosNew',
})(AddMedicamentosForm);

const selector = formValueSelector('searchMedicamentos');

function mapStateToProps(state) {
    return {
        medicamentos: state.medicamentoReducer.medicamentos || [],
        medicamentosApiLoading: state.medicamentoReducer.medicamentosApiLoading,
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
            dispatch(change('searchMedicamentosNew', 'medicamento', medicamento)),
        setImporte: medicamento =>
            dispatch(change('searchMedicamentosNew', 'importe', medicamento.importe)),
        addMedicationToEstudio: medicacion =>
            dispatch({ type: ADD_MEDICACION_ESTUDIO, medicacion }),
        addDefaultMedicacionToEstudio: estudioId =>
            dispatch({ type: ADD_DEFAULT_MEDICACION_ESTUDIO, estudioId }),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(AddMedicamentosFormReduxForm);
