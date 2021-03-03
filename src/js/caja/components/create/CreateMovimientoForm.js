import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Col, Panel } from 'react-bootstrap';
import { required, integerValue } from '../../../utilities/reduxFormValidators';
import InputRF from '../../../utilities/InputRF';
import AsyncTypeaheadRF from '../../../utilities/AsyncTypeaheadRF';

export default function CreateMovimientoForm({
  tiposMovimientos,
  index,
  movimiento,
  opcionesMedicos,
  selectedMedico,
  onChange,
  isLoading,
  onSearch,
  render,
}) {
    return (
        <Panel>
            <Col md={ 5 }>
                <Field
                  name={ `tipoMovimiento-${index}` }
                  label='Tipo de movimiento'
                  component={ InputRF }
                  componentClass='select'
                  selectOptions={ tiposMovimientos }
                  validate={ [required] }
                  input={ { defaultValue: movimiento } }
                />
            </Col>
            <Col md={ 5 }>
                <Field
                  name={ 'medico' }
                  label='Medico'
                  component={ AsyncTypeaheadRF }
                  placeholder='Nombre'
                  options={ opcionesMedicos }
                  onSearch={ onSearch }
                  onChange={ onChange }
                  selected={ selectedMedico }
                  renderMenuItemChildren={ render }
                  isLoading={ isLoading }
                  nullValue=''
                />
            </Col>
            <Col md={ 5 }>
                <Field
                  name={ `concepto-${index}` }
                  label='Concepto'
                  component={ InputRF }
                  validate={ [required] }
                  nullValue=''
                />
            </Col>
            <Col md={ 5 }>
                <Field
                  name={ `monto-${index}` }
                  label='Monto'
                  placeholder='0.00'
                  component={ InputRF }
                  validate={ [required, integerValue] }
                  nullValue=''
                />
            </Col>
        </Panel>
    );
}

const { array, number, bool, func, string } = PropTypes;

CreateMovimientoForm.propTypes = {
    tiposMovimientos: array,
    index: number,
    movimiento: string,
    opcionesMedicos: array,
    selectedMedico: array,
    onChange: func,
    isLoading: bool,
    render: func,
    onSearch: func,
};
