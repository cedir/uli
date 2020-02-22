/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes, { string } from 'prop-types';
import { connect } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap/dist/react-bootstrap';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { required } from '../../../utilities/reduxFormValidators';
import InputRF from '../../../utilities/InputRF';
import { LOAD_DATE_VALUE } from '../actionTypes';

function SearchPresentacionesObraSocial(props) {
    const {
        valid, selectedObraSocial, loadDateValue, fecha,
    } = props;
    const [obraSocial, setObraSocial] = useState('');

    useEffect(() => {
        if (selectedObraSocial[0] !== undefined) {
            setObraSocial(selectedObraSocial[0].nombre);
        }
        if (fecha !== undefined) {
            loadDateValue(fecha);
        } else {
            loadDateValue('');
        }
    }, [fecha]);

    return (
        <Form
          inline
        >
            <Row className='search-grid'>
                <Col md={ 8 } style={ { border: 'none' } } >
                    <div style={
                    { marginTop: '2.2rem', marginLeft: '0.2rem',
                        fontSize: '1.6rem', fontWeight: '600' } }
                    >
                        { obraSocial }
                    </div>
                </Col>
                <Col md={ 4 } style={ { border: 'none' } }>
                    <div className='date-picker'>
                        <Field
                          name='fecha'
                          type='date'
                          label='Fecha'
                          component={ InputRF }
                          validate={ required }
                        />
                    </div>
                    <Button
                      type='submit'
                      bsStyle='primary'
                      disabled={ !valid }
                    >
                        Agregar
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}

const SearchPresentacionesObraSocialReduxForm =
    reduxForm({
        form: 'searchPresentacionesObraSocial',
        destroyOnUnmount: false,
        enableReinitialize: true,
    })(SearchPresentacionesObraSocial);

const { array, bool, func } = PropTypes;

SearchPresentacionesObraSocial.propTypes = {
    valid: bool.isRequired,
    selectedObraSocial: array,
    loadDateValue: func,
    fecha: string,
};

const selector = formValueSelector('searchPresentacionesObraSocial');

function mapStateToProps(state) {
    let obraSocial = selector(state, 'obraSocial');
    obraSocial = (obraSocial && Array.isArray(obraSocial))
        ? obraSocial
        : [];
    const fechaSelector = selector(state, 'fecha');
    return {
        selectedObraSocial: obraSocial,
        fecha: fechaSelector,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadDateValue: value =>
            dispatch({ type: LOAD_DATE_VALUE, value }),
    };
}

export default
    connect(mapStateToProps, mapDispatchToProps)(SearchPresentacionesObraSocialReduxForm);
