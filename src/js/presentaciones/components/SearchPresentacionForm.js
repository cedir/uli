import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Row, Col, Button, Checkbox }
    from 'react-bootstrap';
import InputRF from '../../utilities/InputRF';
import AsyncTypeaheadRF from '../../utilities/AsyncTypeaheadRF';
import ComprobanteSearchForm from './ComprobanteSearchForm';

const today = new Date();
const currentYear = today.getFullYear();
const years = Array.from(Array(5).keys()).map(k => currentYear - k);

const tiposPresentacion = ['Directa', 'AMR'];

export default function SearchPresentacionForm({
    handleSubmit,
    opcionesObraSocial,
    onSearchObraSocial,
    onChangeObraSocial,
    selectedObraSocial,
    renderMenuItemChildren,
    isLoading,
    presentacionClickHandler,
    nuevaClickHandler,
}) {
    const seleccionada = () => {
        if (selectedObraSocial.length === 0) {
            return true;
        }
        return false;
    };

    const [presentacionesCobradas, setPresentacionesCobradas] = useState(false);

    return (
        <form
          onSubmit={
            handleSubmit(searchParams => presentacionClickHandler({
                ...searchParams,
                presentacionesCobradas,
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
                      options={ opcionesObraSocial }
                      labelKey='nombre'
                      onSearch={ onSearchObraSocial }
                      onChange={ onChangeObraSocial }
                      selected={ selectedObraSocial }
                      renderMenuItemChildren={ renderMenuItemChildren }
                      isLoading={ isLoading }
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
                      checked={ !presentacionesCobradas }
                      onChange={ () => setPresentacionesCobradas(!presentacionesCobradas) }
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
                      disabled={ seleccionada(selectedObraSocial) }
                      onClick={ () => nuevaClickHandler(selectedObraSocial) }
                    >
                        Nueva
                    </Button>
                </Col>
            </Row>
            <ComprobanteSearchForm />
        </form>
    );
}

const { func, array, bool } = PropTypes;

SearchPresentacionForm.propTypes = {
    handleSubmit: func.isRequired,
    opcionesObraSocial: array.isRequired,
    onSearchObraSocial: func.isRequired,
    onChangeObraSocial: func.isRequired,
    selectedObraSocial: array,
    renderMenuItemChildren: func.isRequired,
    isLoading: bool,
    presentacionClickHandler: func.isRequired,
    nuevaClickHandler: func.isRequired,
};
