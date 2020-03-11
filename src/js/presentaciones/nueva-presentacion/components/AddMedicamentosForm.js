/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap/dist/react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import InputRF from '../../../utilities/InputRF';
import { ADD_DEFAULT_MEDICACION_ESTUDIO } from '../../../medicacion/actionTypes';
import { FETCH_MEDICAMENTOS } from '../../../medicamento/actionTypes';

const AddMedicamentosForm = (props) => {
    const {
        handleSubmit,
        medicamentos,
        medicamentosApiLoading,
        selectedMedicamento,
        estudio,
        addDefaultMedicacionToEstudio,
        fetchMedicamentos,
    } = props;

    const searchMedicamentos = (searchText) => {
        fetchMedicamentos(searchText);
    };

    const setSelectedMedicamento = () => {
        console.log('set selected');
    };

    const medicamentoIsSelected =
    (Array.isArray(selectedMedicamento) && selectedMedicamento[0]
    && selectedMedicamento[0].id);

    // const { presentacion } = estudioDetail;

    // const estadoPresentacion = presentacion ? presentacion.estado : undefined;

    // const lockEstudioEdition =
    // (estadoPresentacion && estadoPresentacion !== 2) || false;

    console.log(estudio.id);
    return (
        <div>
            <form onSubmit={ handleSubmit }>
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
                          onChange={ setSelectedMedicamento }
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
    estudio: object.isRequired,
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

function mapDispatchToProps(dispatch) {
    return {
        fetchMedicamentos: descripcion =>
            dispatch({ type: FETCH_MEDICAMENTOS, descripcion }),
        addDefaultMedicacionToEstudio: estudioId =>
            dispatch({ type: ADD_DEFAULT_MEDICACION_ESTUDIO, estudioId }),
    };
}


export default connect(null, mapDispatchToProps)(AddMedicamentosFormReduxForm);
