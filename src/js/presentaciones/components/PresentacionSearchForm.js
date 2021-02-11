import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'react-bootstrap';
import { Field } from 'redux-form';
import InputRF from '../../utilities/InputRF';
import AsyncTypeaheadRF from '../../utilities/AsyncTypeaheadRF';

export default function PresentacionSearchForm({
    opcionesObraSocial,
    onSearchObraSocial,
    onChangeObraSocial,
    selectedObraSocial,
    renderMenuItemChildren,
    isLoading,
    presentacionesCobradas,
    setPresentacionesCobradas,
}) {
    const today = new Date();
    const currentYear = today.getFullYear();
    const years = Array.from(Array(5).keys()).map(k => currentYear - k);

    return (
        <React.Fragment>
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
            <Field
              name='anio'
              label='Año'
              component={ InputRF }
              componentClass='select'
              selectOptions={ years }
              nullValue=''
            />
            <label htmlFor='estadoPresentacion'>Estado presentacion:</label>
            <Checkbox
              title='estadoPresentacion'
              checked={ !presentacionesCobradas }
              onChange={ () => setPresentacionesCobradas(!presentacionesCobradas) }
            >
                Pendientes/Abiertas
            </Checkbox>
        </React.Fragment>
    );
}

const { func, array, bool } = PropTypes;

PresentacionSearchForm.propTypes = {
    opcionesObraSocial: array,
    onSearchObraSocial: func,
    onChangeObraSocial: func,
    selectedObraSocial: array,
    renderMenuItemChildren: func,
    isLoading: bool,
    presentacionesCobradas: bool,
    setPresentacionesCobradas: func,
};
