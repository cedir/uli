import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap/dist/react-bootstrap';
import { Field, reduxForm, change, formValueSelector } from 'redux-form';
import AsyncTypeaheadRF from '../../utilities/AsyncTypeaheadRF';
import { requiredOption } from '../../utilities/reduxFormValidators';
import { FETCH_OBRAS_SOCIALES } from '../../obraSocial/actionTypes';
import { FETCH_PRESENTACIONES_OBRA_SOCIAL } from '../actionTypes';
import { FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL } from '../nueva-presentacion/actionTypes';
import initialState from '../nueva-presentacion/estudiosSinPresentarReducerInitialState';

class SearchPresentacionesObraSocial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buscarClicked: false,
        };

        this.setSelectedObraSocial = this.setSelectedObraSocial.bind(this);
        this.searchObrasSociales = this.searchObrasSociales.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    setSelectedObraSocial(selection) {
        if (selection[0] && selection[0].id) {
            this.props.setSelectedObraSocial(selection[0]);
        }
    }

    searchObrasSociales(nombre) {
        this.props.fetchObrasSociales(nombre);
    }

    handleFormSubmit(params) {
        const { buscarClicked } = this.state;
        const {
            fetchEstudiosSinPresentarObraSocial,
            fetchPresentacionesObraSocial,
            estudios,
            history,
            selectedObraSocial,
            obraSocial,
        } = this.props;

        if (buscarClicked) {
            fetchPresentacionesObraSocial(params);
        } else if (
            estudios.length === 0 ||
            selectedObraSocial[0].id !== obraSocial.id
        ) {
            fetchEstudiosSinPresentarObraSocial(params);
            history.push('/presentaciones-obras-sociales/nueva-presentacion');
        } else {
            history.push('/presentaciones-obras-sociales/nueva-presentacion');
        }
    }

    renderObraSocialMenuItem(option) {
        return (
            <div key={ option.id }>
                { option.nombre }
            </div>
        );
    }

    render() {
        return (
            <Form
              inline
              onSubmit={ this.props.handleSubmit(params =>
                this.handleFormSubmit(params)) }
            >
                <Row className='search-grid search-grid-presentaciones'>
                    <Col md={ 9 } style={ { border: 'none' } } >
                        <Field
                          name='obraSocial'
                          label='Obra Social'
                          placeholder='nombre'
                          align='left'
                          validate={ requiredOption }
                          component={ AsyncTypeaheadRF }
                          options={ this.props.obrasSociales }
                          labelKey='nombre'
                          onSearch={ this.searchObrasSociales }
                          onChange={ this.setSelectedObraSocial }
                          selected={ this.props.selectedObraSocial }
                          renderMenuItemChildren={ this.renderObraSocialMenuItem }
                          isLoading={ this.props.obrasSocialesApiLoading }
                        />
                    </Col>
                    <Col md={ 3 } style={ { border: 'none' } }>
                        <Button
                          type='submit'
                          bsStyle='primary'
                          disabled={ !this.props.valid }
                          onClick={ () => this.setState({ buscarClicked: true }) }
                        >
                            Buscar
                        </Button>
                        <Button
                          type='submit'
                          bsStyle='primary'
                          disabled={ !this.props.valid }
                          onClick={ () => this.setState({ buscarClicked: false }) }
                        >
                            Nueva
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}

const SearchPresentacionesObraSocialReduxForm =
    reduxForm({
        form: 'searchPresentacionesObraSocial',
        destroyOnUnmount: false,
        enableReinitialize: true,
    })(SearchPresentacionesObraSocial);

const { func, array, bool, object } = PropTypes;

SearchPresentacionesObraSocial.propTypes = {
    handleSubmit: func.isRequired,
    valid: bool.isRequired,
    fetchObrasSociales: func.isRequired,
    fetchPresentacionesObraSocial: func.isRequired,
    fetchEstudiosSinPresentarObraSocial: func.isRequired,
    setSelectedObraSocial: func.isRequired,
    selectedObraSocial: array,
    obrasSociales: array,
    obrasSocialesApiLoading: bool,
    history: object.isRequired,
    estudios: array.isRequired,
    obraSocial: object.isRequired,
};

SearchPresentacionesObraSocial.defaultProps = {
    estudios: initialState.nuevaPresentacion.estudios,
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
        estudios: state.estudiosSinPresentarReducer.nuevaPresentacion.estudios,
        obraSocial: state.estudiosSinPresentarReducer.nuevaPresentacion.obraSocial,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchObrasSociales: nombre => dispatch({ type: FETCH_OBRAS_SOCIALES, nombre }),
        fetchPresentacionesObraSocial: params => dispatch({
            type: FETCH_PRESENTACIONES_OBRA_SOCIAL,
            id: params.obraSocial[0].id,
        }),
        fetchEstudiosSinPresentarObraSocial: params => dispatch({
            type: FETCH_ESTUDIOS_SIN_PRESENTAR_OBRA_SOCIAL,
            obraSocial: params.obraSocial[0],
        }),
        setSelectedObraSocial: obraSocial =>
            dispatch(change('searchPresentacionesObraSocial', 'obraSocial', obraSocial)),
    };
}

export default
    connect(mapStateToProps, mapDispatchToProps)(SearchPresentacionesObraSocialReduxForm);
