import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
import { Row, Col, Button }
    from 'react-bootstrap/dist/react-bootstrap';
import InputRF from '../../../utilities/InputRF';
import AsyncTypeaheadRF from '../../../utilities/AsyncTypeaheadRF';
import { FETCH_MEDICOS_ACTUANTES } from '../../../medico/actionTypes';
import { required, dateBeforeThan, dateAfterThan }
    from '../../../utilities/reduxFormValidators';
import './SearchCajaForm.css';

import { FETCH_MOVIMIENTOS_CAJA } from '../../actionTypes';

function SearchCajaForm({
    setSelectedMedicoActuante,
    selectedMedicoActuante,
    fetchMedicosActuantes,
    closeModal,
    fetchMovimientosCaja,
    handleSubmit,
    tiposMovimiento,
    medicosActuantes,
    medicoActuanteApiLoading,
    valid,
}) {
    const setSelectedMedicoActuanteFunc = (selection) => {
        if (selection[0] && selection[0].id) {
            setSelectedMedicoActuante(selection[0]);
        }
    };

    const searchMedicosActuantes = (searchText) => {
        if (selectedMedicoActuante.fullName === searchText && selectedMedicoActuante.id) {
            fetchMedicosActuantes({ id: selectedMedicoActuante.id });
        } else {
            fetchMedicosActuantes({ searchText });
        }
    };

    const medicosTypeaheadRenderFunc = (option) => {
        if (!option.nombre || !option.apellido) {
            return '';
        }

        return `${option.apellido}, ${option.nombre}`;
    };

    const searchMovimientosCajaFunc = (searchParams) => {
        closeModal();
        fetchMovimientosCaja(searchParams);
    };

    const renderMedicoMenuItem = option => (
        <div style={ { width: '100%' } } key={ option.id }>
            { `${option.apellido}, ${option.nombre}` }
        </div>
    );

    const booleanOptions = [{ text: 'Si', value: 'True' }, { text: 'No', value: 'False' }];
    return (
        <form
          onSubmit={
            handleSubmit(searchParams => searchMovimientosCajaFunc(searchParams))
          }
          className='search-caja-form'
        >
            <Row>
                <Col md={ 12 }>
                    <Row>
                        <Col md={ 6 }>
                            <Field
                              name='tipoMovimiento'
                              label='Tipo de movimiento'
                              componentClass='select'
                              component={ InputRF }
                              selectOptions={ tiposMovimiento }
                              nullValue=''
                            />
                        </Col>
                        <Col md={ 6 }>
                            <Field
                              name='concepto'
                              label='Concepto'
                              component={ InputRF }
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={ 6 }>
                            <Field
                              name='medicoActuante'
                              label='Medico'
                              placeholder='Nombre'
                              align='left'
                              component={ AsyncTypeaheadRF }
                              options={ medicosActuantes }
                              labelKey={ medicosTypeaheadRenderFunc }
                              onSearch={ searchMedicosActuantes }
                              onChange={ setSelectedMedicoActuanteFunc }
                              selected={
                                  selectedMedicoActuante
                              }
                              renderMenuItemChildren={ renderMedicoMenuItem }
                              isLoading={ medicoActuanteApiLoading }
                            />
                        </Col>
                        <Col md={ 3 }>
                            <Field
                              name='fechaDesde'
                              type='date'
                              label='Fecha desde'
                              component={ InputRF }
                              validate={ [required, dateBeforeThan('fechaHasta', 'Debe ser menor que la fecha hasta')] }
                            />
                        </Col>
                        <Col md={ 3 }>
                            <Field
                              name='fechaHasta'
                              type='date'
                              label='Fecha hasta'
                              component={ InputRF }
                              validate={ dateAfterThan('fechaDesde', 'Debe ser mayor que la fecha desde') }
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={ 6 }>
                            <Field
                              className='padding-left-15'
                              name='incluirEstudio'
                              label='Incluir estudio'
                              componentClass='select'
                              component={ InputRF }
                              selectOptions={ booleanOptions }
                              renderOptionHandler={ opcion => opcion.text }
                              selectionValue='value'
                              optionKey='text'
                              nullValue=''
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={ 12 }>
                            <Button
                              className='pull-right'
                              bsStyle='primary'
                              type='submit'
                              disabled={ !valid }
                            >
                                Buscar Movimientos
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </form>
    );
}

const { func, array, bool } = PropTypes;

SearchCajaForm.propTypes = {
    handleSubmit: func.isRequired,
    valid: bool.isRequired,
    closeModal: func.isRequired,
    fetchMedicosActuantes: func.isRequired,
    setSelectedMedicoActuante: func.isRequired,
    selectedMedicoActuante: array,
    medicosActuantes: array,
    tiposMovimiento: array,
    medicoActuanteApiLoading: bool.isRequired,
    fetchMovimientosCaja: func.isRequired,
};

const SearchCajaFormReduxForm = reduxForm({
    form: 'searchCaja',
    destroyOnUnmount: false,
})(SearchCajaForm);

const selector = formValueSelector('searchCaja');

function mapStateToProps(state) {
    let medicoActuante = selector(state, 'medicoActuante');
    medicoActuante = (medicoActuante && Array.isArray(medicoActuante))
            ? medicoActuante
            : [];

    return {
        tiposMovimiento: [
            'General',
            'Honorario Médico',
            'Honorario Anestesista',
            'Medicación',
            'Práctica',
            'Descartable',
            'Material Específico',
            'Pago a Médico',
            'Consultorio 1',
            'Coseguro',
            'Egreso',
            'Consultorio 2',
        ],
        medicosActuantes: state.medicoReducer.medicosActuantes,
        selectedMedicoActuante: medicoActuante,
        medicoActuanteApiLoading: state.medicoReducer.medicoActuanteApiLoading || false,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchMedicosActuantes: searchParams =>
            dispatch({ type: FETCH_MEDICOS_ACTUANTES, searchParams }),
        setSelectedMedicoActuante: medicoActuante =>
            dispatch(change('searchCaja', 'medicoActuante', medicoActuante)),
        fetchMovimientosCaja: searchParams =>
            dispatch({ type: FETCH_MOVIMIENTOS_CAJA, searchParams }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchCajaFormReduxForm);
