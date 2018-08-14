import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, change, formValueSelector } from 'redux-form';
import { Button, Form, Row, Col } from 'react-bootstrap/dist/react-bootstrap';

import AsyncTypeaheadRF from '../../utilities/AsyncTypeaheadRF';
import InputRF from '../../utilities/InputRF';
import { FETCH_ANESTESISTAS } from '../actionTypes';
import { requiredOption, required, integerValue } from '../../utilities/reduxFormValidators';
import { ANESTESIA_SIN_ANESTESISTA } from '../../estudio/constants';

const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();

const years = Array.from(Array(5).keys()).map(k => currentYear - k);
const months = Array.from(Array(12).keys()).map(k => 1 + ((currentMonth + k) % 12));
years.unshift('--');
months.unshift('--');

class ControlPagoAnestesistaPres extends React.Component {
    constructor(props) {
        super(props);
        this.fetch = this.fetch.bind(this);
        this.setSelectedAnestesista = this.setSelectedAnestesista.bind(this);
        this.searchAnestesistas = this.searchAnestesistas.bind(this);
    }

    setSelectedAnestesista(selection) {
        if (selection[0] && selection[0].id) {
            this.props.setSelectedAnestesista(selection[0]);
        }
    }

    searchAnestesistas(searchText) {
        this.props.fetchAnestesista(searchText);
    }

    anestesistaTypeaheadRenderFunc(option) {
        if (!option.nombre || !option.apellido) {
            return '';
        }
        const matricula = option.matricula || '-';

        return `${option.nombre}, ${option.apellido}, Mat: ${matricula}`;
    }

    fetch(params) {
        const { anestesista, mes, anio } = params;
        this.props.fetch(anestesista[0].id, mes, anio);
    }

    renderAnestesistaMenuItem(option) {
        const matricula = option.matricula || '-';
        const nombre = (option.apellido.toLowerCase() === ANESTESIA_SIN_ANESTESISTA)
            ? option.apellido
            : `${option.apellido}, ${option.nombre}`;
        return (
            <div style={ { width: '100%' } } key={ option.id }>
                { nombre }
                <div>Matricula: { matricula }</div>
            </div>
        );
    }

    render() {
        return (
            <Form
              inline
              onSubmit={ this.props.handleSubmit(params =>
                this.fetch(params)) }
            >
                <Row className='show-grid'>
                    <Col md={ 4 } style={ { border: 'none' } }>
                        <Field
                          name='anestesista'
                          label='Anestesista'
                          placeholder='nombre o matricula'
                          align='left'
                          validate={ requiredOption }
                          component={ AsyncTypeaheadRF }
                          options={ this.props.anestesistas }
                          labelKey={ this.anestesistaTypeaheadRenderFunc }
                          onSearch={ this.searchAnestesistas }
                          onChange={ this.setSelectedAnestesista }
                          selected={ this.props.selectedAnestesista }
                          renderMenuItemChildren={ this.renderAnestesistaMenuItem }
                          isLoading={ this.props.anestesistaApiLoading }
                        />
                    </Col>
                    <Col md={ 3 } style={ { border: 'none' } }>
                        <Field
                          name='anio'
                          label='Año'
                          validate={ [required, integerValue] }
                          component={ InputRF }
                          componentClass='select'
                          selectOptions={ years }
                        />
                    </Col>
                    <Col md={ 3 } style={ { border: 'none' } }>
                        <Field
                          name='mes'
                          label='Mes'
                          validate={ [required, integerValue] }
                          component={ InputRF }
                          componentClass='select'
                          selectOptions={ months }
                        />
                    </Col>
                    <Col md={ 2 } style={ { border: 'none' } }>
                        <Button
                          type='submit'
                          bsStyle='primary'
                          disabled={ !this.props.valid }
                        >
                            Aceptar
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}

const { func, array, bool } = PropTypes;

ControlPagoAnestesistaPres.propTypes = {
    handleSubmit: func.isRequired,
    valid: bool,
    fetch: func.isRequired,
    fetchAnestesista: func.isRequired,
    setSelectedAnestesista: func.isRequired,
    selectedAnestesista: array.isRequired,
    anestesistas: array.isRequired,
    anestesistaApiLoading: bool.isRequired,
};

const ControlPagoAnestesistaPresReduxForm = reduxForm({
    form: 'pagoAnestesistas',
    destroyOnUnmount: false,
    enableReinitialize: true,
})(ControlPagoAnestesistaPres);

const selector = formValueSelector('pagoAnestesistas');

function mapStateToProps(state) {
    let anestesista = selector(state, 'anestesista');
    anestesista = (anestesista && Array.isArray(anestesista))
            ? anestesista
            : [];
    return {
        selectedAnestesista: anestesista,
        anestesistas: state.anestesistaReducer.anestesistas,
        anestesistaApiLoading: state.anestesistaReducer.anestesistaApiLoading || false,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchAnestesista: searchParams =>
            dispatch({ type: FETCH_ANESTESISTAS, searchParams }),
        setSelectedAnestesista: anestesista =>
            dispatch(change('pagoAnestesistas', 'anestesista', anestesista)),
        fetch: (id, mes, año) => dispatch({ type: 'FETCH_PAGO_ANESTESISTA', id, mes, año }),
    };
}

export const ControlPagoAnestesista =
    connect(mapStateToProps, mapDispatchToProps)(ControlPagoAnestesistaPresReduxForm);
