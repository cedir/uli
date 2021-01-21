import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Col, Button }
    from 'react-bootstrap/dist/react-bootstrap';
import InputRF from '../../utilities/InputRF';
import AsyncTypeaheadRF from '../../utilities/AsyncTypeaheadRF';
import { integerValue }
from '../../utilities/reduxFormValidators';

const today = new Date();
const currentYear = today.getFullYear();
const years = Array.from(Array(5).keys()).map(k => currentYear - k);

export function SearchPresentacionForm(props) {
    return (
        <form
          onSubmit={
            props.handleSubmit(searchParams => props.presentacionClickHandler(searchParams))
          }
          className='search-Presentacion-form'
        >
            <Col md={ 9 }>
                <Col>
                    <Field
                      name='EstadoPresentacion'
                      label='Estado de la presentacion'
                      type='checkbox'
                      // componentClass='checkbox'
                      component={ InputRF }
                    />
                    <Field
                      name='tipoComprobante'
                      label='Tipo de Comprobante'
                      componentClass='select'
                      component={ InputRF }
                      selectOptions={ props.tiposComprobante }
                      nullValue=''
                    />
                    <Field
                      name='numero'
                      label='Numero'
                      validate={ [integerValue] }
                      component={ InputRF }
                    />
                    <Field
                      name='tipoPresentacion'
                      label='Tipo de Presentacion'
                      componentClass='select'
                      component={ InputRF }
                      selectOptions={ props.tiposPresentacion }
                      nullValue=''
                    />
                </Col>
                <Col>
                </Col>
                <Col>
                    <Field
                      name='obraSocial'
                      label='Obra Social'
                      placeholder='nombre'
                      align='left'
                      component={ AsyncTypeaheadRF }
                      options={ props.opcionesObraSocial }
                      labelKey='nombre'
                      onSearch={ props.onSearchObraSocial }
                      onChange={ props.onChangeObraSocial }
                      selected={ props.selectedObraSocial }
                      renderMenuItemChildren={ props.renderMenuItemChildren }
                      isLoading={ props.isLoading }
                    />
                    <Field
                      name='anio'
                      label='Año'
                      validate={ [integerValue] }
                      component={ InputRF }
                      componentClass='select'
                      selectOptions={ years }
                    />
                </Col>
            </Col>
            <Col md={ 3 }>
                <Button
                  className='pull-right'
                  bsStyle='primary'
                  type='submit'
                >
                    Buscar
                </Button>
            </Col>
        </form>
    );
}

const { func, array, bool } = PropTypes;

SearchPresentacionForm.propTypes = {
    handleSubmit: func.isRequired,
    presentacionClickHandler: func.isRequired,
    tiposPresentacion: array,
    tiposComprobante: array,
    opcionesObraSocial: array.isRequired,
    onSearchObraSocial: func.isRequired,
    onChangeObraSocial: func.isRequired,
    selectedObraSocial: array,
    renderMenuItemChildren: func.isRequired,
    isLoading: bool,
    // fetchMovimientosPresentacion: func.isRequired,
};

const SearchPresentacionFormReduxForm = reduxForm({
    form: 'searchPresentacion',
    destroyOnUnmount: false,
})(SearchPresentacionForm);

function mapStateToProps() {
    return {
        tiposPresentacion: [
            'Directa',
            'AMR',
        ],
        tiposComprobante: [
            'Factura',
            'Liquidacion',
            'Factura electronica',
        ],
    };
}

export default connect(mapStateToProps)(SearchPresentacionFormReduxForm);
