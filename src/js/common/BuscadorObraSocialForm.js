import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap/dist/react-bootstrap';
import { Field, reduxForm, change, formValueSelector } from 'redux-form';
import AsyncTypeaheadRF from '../utilities/AsyncTypeaheadRF';
import { requiredOption } from '../utilities/reduxFormValidators';
import { FETCH_OBRAS_SOCIALES } from '../obraSocial/actionTypes';


class SearchObraSocial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buscarClicked: false,
        };

        this.setSelectedObraSocial = this.setSelectedObraSocial.bind(this);
        this.searchObrasSociales = this.searchObrasSociales.bind(this);
        this.buscarButtonClickHandler = this.buscarButtonClickHandler.bind(this);
        this.nuevaButtonClickHandler = this.nuevaButtonClickHandler.bind(this);
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

    buscarButtonClickHandler() {
        this.setState({ buscarClicked: true });
    }

    nuevaButtonClickHandler() {
        this.setState({ buscarClicked: false });
    }

    handleFormSubmit(params) {
        const { buscarClicked } = this.state;
        if (buscarClicked) {
            this.props.fetchBusquedaObraSocial(params, this.props.action);
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
                <Row className='search-grid'>
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
                          onClick={ this.buscarButtonClickHandler }
                        >
                            Buscar
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}

SearchObraSocial.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    setSelectedObraSocial: PropTypes.func.isRequired,
    fetchObrasSociales: PropTypes.func.isRequired,
    fetchBusquedaObraSocial: PropTypes.func.isRequired,
    selectedObraSocial: PropTypes.array,
    valid: PropTypes.bool.isRequired,
    obrasSociales: PropTypes.array,
    obrasSocialesApiLoading: PropTypes.bool,
    action: PropTypes.string.isRequired,
};

const SearchObraSocialReduxForm =
    reduxForm({
        form: 'searchObraSocial',
        destroyOnUnmount: false,
        enableReinitialize: true,
    })(SearchObraSocial);

const selector = formValueSelector('searchObraSocial');

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
        fetchBusquedaObraSocial: (params, action) => dispatch({
            type: action,
            id: params.obraSocial[0].id,
        }),
        setSelectedObraSocial: obraSocial =>
            dispatch(change('searchObraSocial', 'obraSocial', obraSocial)),
    };
}

export default
connect(mapStateToProps, mapDispatchToProps)(SearchObraSocialReduxForm);
