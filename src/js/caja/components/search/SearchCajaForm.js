import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
import { Row, Col, Button, Glyphicon, Form } from 'react-bootstrap';
import InputRF from '../../../utilities/InputRF';
import MedicoField from '../../../utilities/components/forms/MedicoField';
import PacienteField from '../../../utilities/components/forms/PacienteField';
import initialValues from '../../cajaSearchFormInitialState';
import { getArray } from '../../../utilities/utilFunctions';

function SearchCajaForm({
    actuante,
    paciente,
    closeModal,
    fetchMovimientosCaja,
    handleSubmit,
    tiposMovimiento,
    removeDate,
    valid,
}) {
    const style = { marginTop: '2rem', cursor: 'pointer', padding: '1rem' };
    const booleanOptions = [{ text: 'Si', value: 'True' }, { text: 'No', value: 'False' }];
    return (
        <Form
          onSubmit={ handleSubmit((params) => { closeModal(); fetchMovimientosCaja(params); }) }
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
                    <Field
                      name='concepto'
                      label='Concepto'
                      component={ InputRF }
                    />
                </Col>
            </Row>
            <Row>
                <Col md={ 6 }>
                    <MedicoField
                      nameField='medicoActuante'
                      label='Medico'
                      type='actuante'
                      medico={ actuante }
                    />
                </Col>
                <Col md={ 6 }>
                    <PacienteField
                      name='paciente'
                      label='Paciente'
                      paciente={ paciente }
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
                <Col md={ 4 } style={ { marginTop: '2.5rem' } }>
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
    actuante: array,
    paciente: array,
    tiposMovimiento: array,
    fetchMovimientosCaja: func.isRequired,
    removeDate: func.isRequired,
};

const SearchCajaFormReduxForm = reduxForm({
    form: 'searchCaja',
    destroyOnUnmount: false,
    initialValues,
})(SearchCajaForm);

const selector = formValueSelector('searchCaja');

function mapStateToProps(state) {
    let medicoActuante = selector(state, 'medicoActuante');
    medicoActuante = getArray(paciente);

    let paciente = selector(state, 'paciente');
    paciente = getArray(paciente);

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
        actuante: medicoActuante,
        paciente,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        removeDate: name => dispatch(change('searchCaja', name, '')),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchCajaFormReduxForm);
