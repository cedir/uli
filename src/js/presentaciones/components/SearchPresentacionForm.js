import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { Row, Col, Button, Checkbox }
    from 'react-bootstrap/dist/react-bootstrap';
import InputRF from '../../utilities/InputRF';
import AsyncTypeaheadRF from '../../utilities/AsyncTypeaheadRF';
import { integerValue }
from '../../utilities/reduxFormValidators';

const today = new Date();
const currentYear = today.getFullYear();
const years = Array.from(Array(5).keys()).map(k => currentYear - k);

const tiposPresentacion = ['Directa', 'AMR'];
const tiposComprobante = [
    { text: 'Factura', value: 1 },
    { text: 'Liquidacion', value: 2 },
    { text: 'Factura Electronica', value: 5 },
];

export function SearchPresentacionForm(props) {
    const seleccionada = (selectedObraSocial) => {
        if (selectedObraSocial.length !== 0) {
            return false;
        }
        return true;
    };
    const [estado, setEstado] = useState(true);
    return (
        <form
          onSubmit={
            props.handleSubmit(searchParams => props.presentacionClickHandler({
                ...searchParams,
                presentacionAbierta: estado,
            }))
          }
          className='search-Presentacion-form'
        >
            <Row>
                <Col md={ 6 }>
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
                      nullValue=''
                    />
                </Col>
                <Col md={ 2 }>
                    <Field
                      name='anio'
                      label='Año'
                      component={ InputRF }
                      componentClass='select'
                      selectOptions={ years }
                      nullValue=''
                    />
                </Col>
            </Row>
            <Row>
                <Col md={ 2 }>
                    <label htmlFor='estadoPresentacion'>Estado presentacion:</label>
                    <Checkbox
                      title='estadoPresentacion'
                      checked={ estado }
                      onChange={ () => setEstado(!estado) }
                    >
                          Pendientes/Abiertas
                    </Checkbox>
                </Col>
                <Col md={ 4 }>
                    <Field
                      name='tipoPresentacion'
                      label='Tipo de Presentacion'
                      componentClass='select'
                      component={ InputRF }
                      selectOptions={ tiposPresentacion }
                      nullValue=''
                    />
                </Col>
                <Col md={ 4 }>
                    <Button
                      className='pull-right'
                      bsStyle='primary'
                      type='submit'
                    >
                        Buscar
                    </Button>
                </Col>
                <Col md={ 1 }>
                    <Button
                      className='pull-right'
                      bsStyle='primary'
                      disabled={ seleccionada(props.selectedObraSocial) }
                      onClick={ () => props.nuevaClickHandler(props.selectedObraSocial) }
                    >
                        Nueva
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col md={ 4 }>
                    <Field
                      name='tipoComprobante'
                      label='Tipo de Comprobante'
                      componentClass='select'
                      component={ InputRF }
                      selectOptions={ tiposComprobante }
                      nullValue=''
                      selectionValue='value'
                      renderOptionHandler={ opcion => opcion.text }
                      optionKey='text'
                    />
                </Col>
                <Col md={ 4 }>
                    <Field
                      name='numero'
                      label='Numero'
                      validate={ [integerValue] }
                      component={ InputRF }
                      nullValue=''
                    />
                </Col>
            </Row>
        </form>
    );
}

const { func, array, bool } = PropTypes;

SearchPresentacionForm.propTypes = {
    handleSubmit: func.isRequired,
    // presentacionClickHandler: func.isRequired,
    opcionesObraSocial: array.isRequired,
    onSearchObraSocial: func.isRequired,
    onChangeObraSocial: func.isRequired,
    selectedObraSocial: array,
    renderMenuItemChildren: func.isRequired,
    isLoading: bool,
    presentacionClickHandler: func.isRequired,
    nuevaClickHandler: func.isRequired,
    // fetchMovimientosPresentacion: func.isRequired,
};
