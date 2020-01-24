import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap/dist/react-bootstrap';
import { Field, reduxForm, change, formValueSelector } from 'redux-form';
import AsyncTypeaheadRF from '../../../utilities/AsyncTypeaheadRF';
import { requiredOption } from '../../../utilities/reduxFormValidators';
import { FETCH_OBRAS_SOCIALES } from '../../../obraSocial/actionTypes';
import { FETCH_PRESENTACIONES_OBRA_SOCIAL } from '../../../presentaciones/actionTypes';
import Fecha from './Fecha';

function SearchPresentacionesObraSocial(props) {
    const {
        handleSubmit,
        valid,
        fetchObrasSociales,
        fetchPresentacionesObraSocial,
        setSelectedObraSocial,
        selectedObraSocial,
        obrasSociales,
        obrasSocialesApiLoading,
    } = props;

    const setSelectObraSocial = (selection) => {
        if (selection[0] && selection[0].id) {
            setSelectedObraSocial(selection[0]);
        }
    };

    const searchObrasSociales = (nombre) => {
        fetchObrasSociales(nombre);
    };

    function renderObraSocialMenuItem(option) {
        return (
            <div key={ option.id }>
                { option.nombre }
            </div>
        );
    }

    return (
        <Form
          inline
          onSubmit={ handleSubmit(params =>
          fetchPresentacionesObraSocial(params)) }
        >
            <Row className='search-grid'>
                <Col md={ 8 } style={ { border: 'none' } } >
                    <Field
                      name='obraSocial'
                      label='Obra Social'
                      placeholder='nombre'
                      align='left'
                      validate={ requiredOption }
                      component={ AsyncTypeaheadRF }
                      options={ obrasSociales }
                      labelKey='nombre'
                      onSearch={ searchObrasSociales }
                      onChange={ setSelectObraSocial }
                      selected={ selectedObraSocial }
                      renderMenuItemChildren={ renderObraSocialMenuItem }
                      isLoading={ obrasSocialesApiLoading }
                    />
                </Col>
                <Col md={ 4 } style={ { border: 'none' } }>
                    <Fecha />
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

const { func, array, bool } = PropTypes;

SearchPresentacionesObraSocial.propTypes = {
    handleSubmit: func.isRequired,
    valid: bool.isRequired,
    fetchObrasSociales: func.isRequired,
    fetchPresentacionesObraSocial: func.isRequired,
    setSelectedObraSocial: func.isRequired,
    selectedObraSocial: array,
    obrasSociales: array,
    obrasSocialesApiLoading: bool,
};

const selector = formValueSelector('searchPresentacionesObraSocial');

function mapStateToProps(state) {
    let obraSocial = selector(state, 'obraSocial');
    obraSocial = (obraSocial && Array.isArray(obraSocial))
        ? obraSocial
        : [];
    return {
        selectedObraSocial: obraSocial,
        obrasSociales: state.obraSocialReducer.obrasSociales,
        obrasSocialesApiLoading: state.obraSocialReducer.isLoading || false,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchObrasSociales: nombre => dispatch({ type: FETCH_OBRAS_SOCIALES, nombre }),
        fetchPresentacionesObraSocial: params => dispatch({
            type: FETCH_PRESENTACIONES_OBRA_SOCIAL,
            id: params.obraSocial[0].id,
        }),
        setSelectedObraSocial: obraSocial =>
            dispatch(change('searchPresentacionesObraSocial', 'obraSocial', obraSocial)),
    };
}

export default
    connect(mapStateToProps, mapDispatchToProps)(SearchPresentacionesObraSocialReduxForm);
