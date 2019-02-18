import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
import { Row, Col, Button }
    from 'react-bootstrap/dist/react-bootstrap';
import InputRF from '../../../utilities/InputRF';
import AsyncTypeaheadRF from '../../../utilities/AsyncTypeaheadRF';
import CheckboxRF from '../../../utilities/CheckboxRF';
import { FETCH_MEDICOS_ACTUANTES } from '../../../medico/actionTypes';
import { required, dateBeforeThan, dateAfterThan }
    from '../../../utilities/reduxFormValidators';
import './SearchCajaForm.css';


class SearchCajaForm extends Component {
    constructor(props) {
        super(props);

        this.setSelectedMedicoActuante =
            this.setSelectedMedicoActuante.bind(this);
        this.searchMedicosActuantes =
            this.searchMedicosActuantes.bind(this);
    }

    setSelectedMedicoActuante(selection) {
        if (selection[0] && selection[0].id) {
            this.props.setSelectedMedicoActuante(selection[0]);
        }
    }

    searchMedicosActuantes(searchText) {
        const selectedMedicoActuante = this.props.selectedMedicoActuante;
        if (selectedMedicoActuante.fullName === searchText && selectedMedicoActuante.id) {
            this.props.fetchMedicosActuantes({ id: selectedMedicoActuante.id });
        } else {
            this.props.fetchMedicosActuantes({ searchText });
        }
    }

    medicosTypeaheadRenderFunc(option) {
        if (!option.nombre || !option.apellido) {
            return '';
        }

        return `${option.apellido}, ${option.nombre}`;
    }

    renderMedicoMenuItem(option) {
        return (
            <div style={ { width: '100%' } } key={ option.id }>
                { `${option.apellido}, ${option.nombre}` }
            </div>
        );
    }

    render() {
        return (
            <form className='search-caja-form'>
                <Row>
                    <Col md={ 12 }>
                        <Row>
                            <Col md={ 6 }>
                                <Field
                                  name='tipoMovimiento'
                                  label='Tipo de movimiento'
                                  componentClass='select'
                                  component={ InputRF }
                                  selectOptions={ this.props.tiposMovimiento }
                                />
                            </Col>
                            <Col md={ 6 }>
                                <Field
                                  name='concepto'
                                  label='Concepto'
                                  component={ InputRF }
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={ 6 }>
                                <Field
                                  name='medicoActuante'
                                  label='Medico'
                                  placeholder='Nombre'
                                  align='left'
                                  component={ AsyncTypeaheadRF }
                                  options={ this.props.medicosActuantes }
                                  labelKey={ this.medicosTypeaheadRenderFunc }
                                  onSearch={ this.searchMedicosActuantes }
                                  onChange={ this.setSelectedMedicoActuante }
                                  selected={
                                      this.props.selectedMedicoActuante
                                  }
                                  renderMenuItemChildren={ this.renderMedicoMenuItem }
                                  isLoading={ this.props.medicoActuanteApiLoading }
                                />
                            </Col>
                            <Col md={ 3 }>
                                <Field
                                  name='fechaDesde'
                                  type='date'
                                  label='Fecha desde'
                                  component={ InputRF }
                                  validate={ [required, dateBeforeThan('fechaHasta', 'Debe ser menor que la fecha hasta')] }
                                />
                            </Col>
                            <Col md={ 3 }>
                                <Field
                                  name='fechaHasta'
                                  type='date'
                                  label='Fecha hasta'
                                  component={ InputRF }
                                  validate={ dateAfterThan('fechaDesde', 'Debe ser mayor que la fecha desde') }
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={ 6 }>
                                <Row>
                                    <Field
                                      className='padding-left-15'
                                      name='pagado'
                                      label='Pagado'
                                      component={ CheckboxRF }
                                    />
                                    <Field
                                      className='padding-left-15'
                                      name='incluirEstudio'
                                      label='Incluir estudio'
                                      component={ CheckboxRF }
                                    />
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={ 12 }>
                                <Button
                                  className='pull-right'
                                  bsStyle='primary'
                                  disabled={ !this.props.valid }
                                  onClick={ this.props.closeModal }
                                >
                                    Buscar Movimientos
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </form>
        );
    }
}

const { func, array, bool } = PropTypes;

SearchCajaForm.propTypes = {
    // handleSubmit: func.isRequired,
    valid: bool.isRequired,
    closeModal: func.isRequired,
    fetchMedicosActuantes: func.isRequired,
    setSelectedMedicoActuante: func.isRequired,
    selectedMedicoActuante: array,
    medicosActuantes: array,
    tiposMovimiento: array,
    medicoActuanteApiLoading: bool.isRequired,
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
        medicosActuantes: state.medicoReducer.medicosActuantes,
        selectedMedicoActuante: medicoActuante,
        medicoActuanteApiLoading: state.medicoReducer.medicoActuanteApiLoading || false,
        tiposMovimiento: [
            'Sin definir',
            'General',
            'Honorarios medico',
            'Honorarios anestesista',
            'Practica',
            'Descartables',
        ],
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchMedicosActuantes: searchParams =>
            dispatch({ type: FETCH_MEDICOS_ACTUANTES, searchParams }),
        setSelectedMedicoActuante: medicoActuante =>
            dispatch(change('searchCaja', 'medicoActuante', medicoActuante)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchCajaFormReduxForm);
