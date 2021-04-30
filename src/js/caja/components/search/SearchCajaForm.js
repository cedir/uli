import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
import { Row, Col, Button, Glyphicon, Form } from 'react-bootstrap';
import InputRF from '../../../utilities/InputRF';
import AsyncTypeaheadRF from '../../../utilities/AsyncTypeaheadRF';
import { FETCH_MEDICOS_ACTUANTES } from '../../../medico/actionTypes';

function SearchCajaForm({
    actuante,
    fetchActuantes,
    closeModal,
    fetchMovimientosCaja,
    handleSubmit,
    tiposMovimiento,
    medicosActuantes,
    medicoApiLoading,
    resetPageNumber,
    removeDate,
    valid,
}) {
    const buscarMedico = (id, text) => fetchActuantes({ id, text });

    const renderMedicoText = (option) => {
        if (!option.nombre || !option.apellido) {
            return '';
        }

        return `${option.apellido}, ${option.nombre}`;
    };

    const searchMovimientos = (searchParams) => {
        closeModal();
        resetPageNumber();
        fetchMovimientosCaja({ ...searchParams });
    };

    const renderMedicoItem = option => (
        <div style={ { width: '100%' } } key={ option.id }>
            { renderMedicoText(option) }
        </div>
    );

    const style = { marginTop: '2rem', cursor: 'pointer', padding: '1rem' };
    const booleanOptions = [{ text: 'Si', value: 'True' }, { text: 'No', value: 'False' }];
    return (
        <Form
          onSubmit={ handleSubmit(searchMovimientos) }
          style={ { width: '750px' } }
        >
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
                      name='medicoActuante'
                      label='Medico'
                      component={ AsyncTypeaheadRF }
                      options={ medicosActuantes }
                      labelKey={ renderMedicoText }
                      onSearch={ text => buscarMedico(actuante.id, text) }
                      selected={ actuante }
                      renderMenuItemChildren={ renderMedicoItem }
                      isLoading={ medicoApiLoading }
                    />
                </Col>
            </Row>
            <Row>
                <Col md={ 12 }>
                    <Field
                      name='concepto'
                      label='Concepto'
                      component={ InputRF }
                    />
                </Col>
            </Row>
            <Row>
                <Col md={ 3 }>
                    <Field
                      name='fechaDesde'
                      type='date'
                      label='Fecha desde'
                      component={ InputRF }
                    />
                </Col>
                <Col md={ 1 }>
                    <Glyphicon
                      glyph='remove'
                      onClick={ () => removeDate('fechaDesde') }
                      style={ style }
                    />
                </Col>
                <Col md={ 3 }>
                    <Field
                      name='fechaHasta'
                      type='date'
                      label='Fecha hasta'
                      component={ InputRF }
                    />
                </Col>
                <Col md={ 1 }>
                    <Glyphicon
                      glyph='remove'
                      onClick={ () => removeDate('fechaHasta') }
                      style={ style }
                    />
                </Col>
                <Col md={ 4 }>
                    <Field
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
        </Form>
    );
}

const { func, array, bool } = PropTypes;

SearchCajaForm.propTypes = {
    handleSubmit: func.isRequired,
    valid: bool.isRequired,
    closeModal: func.isRequired,
    fetchActuantes: func.isRequired,
    actuante: array,
    medicosActuantes: array,
    tiposMovimiento: array,
    medicoApiLoading: bool.isRequired,
    fetchMovimientosCaja: func.isRequired,
    resetPageNumber: func.isRequired,
    removeDate: func.isRequired,
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
        actuante: medicoActuante,
        medicoApiLoading: state.medicoReducer.medicoActuanteApiLoading || false,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchActuantes: searchParams =>
            dispatch({ type: FETCH_MEDICOS_ACTUANTES, searchParams }),
        removeDate: name => dispatch(change('searchCaja', name, '')),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchCajaFormReduxForm);
