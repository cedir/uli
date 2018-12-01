import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Button, Form, Row, Col } from 'react-bootstrap/dist/react-bootstrap';

import InputRF from '../../utilities/InputRF';
import { required, integerValue } from '../../utilities/reduxFormValidators';
import { FETCH_COMPROBANTES_PAGO } from '../actionTypes';

const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();

const years = Array.from(Array(5).keys()).map(k => currentYear - k);
const months = Array.from(Array(12).keys()).map(k => 1 + ((currentMonth + k) % 12));
years.unshift('--');
months.unshift('--');

class SearchComprobantes extends Component {
    constructor(props) {
        super(props);
        this.fetchComprobantesPago = this.fetchComprobantesPago.bind(this);
    }
    fetchComprobantesPago(params) {
        this.props.fetchComprobantesPago(params.anio, params.mes);
    }

    render() {
        return (
            <Form
              inline
              onSubmit={ this.props.handleSubmit(params =>
                this.fetchComprobantesPago(params)) }
            >
                <Row className='show-grid'>
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

const { func, bool } = PropTypes;

SearchComprobantes.propTypes = {
    handleSubmit: func.isRequired,
    fetchComprobantesPago: func.isRequired,
    valid: bool,
};

const SearchComprobantesReduxForm = reduxForm({
    form: 'searchComprobantes',
    destroyOnUnmount: false,
    enableReinitialize: true,
})(SearchComprobantes);

function mapStateToProps(state) {
    return {
        comprobantes: state.comprobantesReducer.comprobantes,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchComprobantesPago(anio, mes) {
            dispatch({ type: FETCH_COMPROBANTES_PAGO, data: { anio, mes } });
        },
    };
}

export default
    connect(mapStateToProps, mapDispatchToProps)(SearchComprobantesReduxForm);
