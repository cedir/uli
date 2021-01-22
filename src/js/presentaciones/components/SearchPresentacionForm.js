import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Row, Col, Button }
    from 'react-bootstrap/dist/react-bootstrap';
import InputRF from '../../utilities/InputRF';
import AsyncTypeaheadRF from '../../utilities/AsyncTypeaheadRF';
import { integerValue }
from '../../utilities/reduxFormValidators';

const today = new Date();
const currentYear = today.getFullYear();
const years = Array.from(Array(5).keys()).map(k => currentYear - k);

export function SearchPresentacionForm(props) {
    const [bandera, setBandera] = useState(false);
    return (
        <form
          onSubmit={
            props.handleSubmit(searchParams => props.apretar(searchParams, bandera))
          }
          className='search-Presentacion-form'
        >
            <Row>
                <Col md={ 5 }>
                    <Field
                      name='tipoComprobante'
                      label='Tipo de Comprobante'
                      componentClass='select'
                      component={ InputRF }
                      selectOptions={ props.tiposComprobante }
                      nullValue=''
                    />
                </Col>
                <Col md={ 4 }>
                    <Field
                      name='numero'
                      label='Numero'
                      validate={ [integerValue] }
                      component={ InputRF }
                    />
                </Col>
            </Row>
            <Row>
                <Col md={ 2 }>
                    <Field
                      name='EstadoPresentacion'
                      label='Estado de la presentacion'
                      type='checkbox'
                      // componentClass='checkbox'
                      component={ InputRF }
                    />
                </Col>
                <Col md={ 4 }>
                    <Field
                      name='tipoPresentacion'
                      label='Tipo de Presentacion'
                      componentClass='select'
                      component={ InputRF }
                      selectOptions={ props.tiposPresentacion }
                      nullValue=''
                    />
                </Col>
            </Row>
            <Row>
                <Col md={ 7 }>
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
                </Col>
                <Col md={ 2 }>
                    <Field
                      name='anio'
                      label='Año'
                      validate={ [integerValue] }
                      component={ InputRF }
                      componentClass='select'
                      selectOptions={ years }
                    />
                </Col>
                <Col md={ 3 }>
                    <Button
                      className='pull-right'
                      bsStyle='primary'
                      type='submit'
                    >
                        Buscar
                    </Button>
                    <Button
                      className='pull-right'
                      bsStyle='primary'
                      type='submit'
                      onClick={ () => setBandera(true) }
                    >
                        Nueva
                    </Button>
                </Col>
            </Row>
        </form>
    );
}

const { func, array, bool } = PropTypes;

SearchPresentacionForm.propTypes = {
    handleSubmit: func.isRequired,
    // presentacionClickHandler: func.isRequired,
    tiposPresentacion: array,
    tiposComprobante: array,
    opcionesObraSocial: array.isRequired,
    onSearchObraSocial: func.isRequired,
    onChangeObraSocial: func.isRequired,
    selectedObraSocial: array,
    renderMenuItemChildren: func.isRequired,
    isLoading: bool,
    apretar: func.isRequired,
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
