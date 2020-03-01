/* eslint-disable no-unused-vars */
import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap/dist/react-bootstrap';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { required } from '../../../utilities/reduxFormValidators';
import InputRF from '../../../utilities/InputRF';
import {
    LOAD_DATE_VALUE_NUEVA, FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_AGREGAR,
} from '../actionTypes';
import { LOAD_DATE_VALUE_MODIFICAR } from '../../actionTypes';
import ModalAgregarEstudio from '../components/ModalAgregarEstudio';

function SearchPresentacionesObraSocial(props) {
    const {
        valid, selectedObraSocial, loadDateValueNueva, fecha,
        fetchEstudiosSinPresentarAgregar, loadDateValueModificar,
        page,
    } = props;
    const [obraSocial, setObraSocial] = useState('');
    const [modal, setModal] = useState(false);

    useEffect(() => {
        if (selectedObraSocial[0] !== undefined) {
            setObraSocial(selectedObraSocial[0].nombre);
        }
        if (page === 'Nueva') {
            if (fecha !== undefined) {
                loadDateValueNueva(fecha);
            } else {
                loadDateValueNueva('');
            }
        } else {
            /* eslint-disable no-lonely-if */
            if (fecha !== undefined) {
                loadDateValueModificar(fecha);
            } else {
                loadDateValueModificar('');
            }
        }
        return () => {
            loadDateValueNueva('');
            loadDateValueModificar('');
        };
    }, [fecha]);

    const agregarClickHandler = () => {
        setModal(!modal);
        fetchEstudiosSinPresentarAgregar(selectedObraSocial[0].id);
    };

    return (
        <Fragment>
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
                          type='button'
                          bsStyle='primary'
                          onClick={ agregarClickHandler }
                        >
                            Agregar
                        </Button>
                    </Col>
                </Row>
            </Form>
            <ModalAgregarEstudio
              show={ modal }
              onClickClose={ () => setModal(!modal) }
            />
        </Fragment>
    );
}

const SearchPresentacionesObraSocialReduxForm =
    reduxForm({
        form: 'searchPresentacionesObraSocial',
        enableReinitialize: true,
    })(SearchPresentacionesObraSocial);

const { array, bool, func, string } = PropTypes;

SearchPresentacionesObraSocial.propTypes = {
    valid: bool.isRequired,
    selectedObraSocial: array.isRequired,
    fetchEstudiosSinPresentarAgregar: func.isRequired,
    loadDateValueNueva: func.isRequired,
    loadDateValueModificar: func.isRequired,
    fecha: string.isRequired,
    page: string.isRequired,
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
        loadDateValueNueva: value =>
            dispatch({ type: LOAD_DATE_VALUE_NUEVA, value }),
        loadDateValueModificar: value =>
            dispatch({ type: LOAD_DATE_VALUE_MODIFICAR, value }),
        fetchEstudiosSinPresentarAgregar: idObraSocial =>
            dispatch({
                type: FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL_AGREGAR,
                id: idObraSocial,
            }),
    };
}

export default
    connect(mapStateToProps, mapDispatchToProps)(SearchPresentacionesObraSocialReduxForm);
