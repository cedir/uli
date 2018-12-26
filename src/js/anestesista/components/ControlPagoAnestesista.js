import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, change } from 'redux-form';
import { Button, Form, Row, Col } from 'react-bootstrap/dist/react-bootstrap';

import InputRF from '../../utilities/InputRF';
import { FETCH_ANESTESISTAS } from '../actionTypes';
import { required, integerValue } from '../../utilities/reduxFormValidators';
import { ANESTESIA_SIN_ANESTESISTA } from '../../estudio/constants';

const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();

const years = Array.from(Array(5).keys()).map(k => currentYear - k);
const months = Array.from(Array(12).keys()).map(k => 1 + ((currentMonth + k) % 12));

class ControlPagoAnestesistaPres extends React.Component {
    constructor(props) {
        super(props);
        this.fetch = this.fetch.bind(this);
    }

    componentDidMount() {
        this.props.fetchAnestesista();
    }

    fetch(params) {
        const { anestesista, mes, anio } = params;
        this.props.fetch(anestesista, mes, anio);
    }

    renderAnestesistaMenuItem(option) {
        const nombre = (option.apellido.toLowerCase() === ANESTESIA_SIN_ANESTESISTA)
            ? option.apellido
            : `${option.apellido}, ${option.nombre}`;
        return nombre;
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
                          validate={ [required, integerValue] }
                          component={ InputRF }
                          componentClass='select'
                          selectOptions={ this.props.anestesistas }
                          selectionValue='id'
                          renderOptionHandler={ this.renderAnestesistaMenuItem }
                          optionKey='id'
                          customErrorMsg='No es un anestesista valido'
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
    anestesistas: array.isRequired,
};

const ControlPagoAnestesistaPresReduxForm = reduxForm({
    form: 'pagoAnestesistas',
    destroyOnUnmount: false,
    enableReinitialize: true,
})(ControlPagoAnestesistaPres);

function mapStateToProps(state) {
    return {
        anestesistas: state.anestesistaReducer.anestesistas,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchAnestesista: () =>
            dispatch({ type: FETCH_ANESTESISTAS }),
        setSelectedAnestesista: anestesista =>
            dispatch(change('pagoAnestesistas', 'anestesista', anestesista)),
        fetch: (id, mes, año) => dispatch({ type: 'FETCH_PAGO_ANESTESISTA', id, mes, año }),
    };
}

export const ControlPagoAnestesista =
    connect(mapStateToProps, mapDispatchToProps)(ControlPagoAnestesistaPresReduxForm);
