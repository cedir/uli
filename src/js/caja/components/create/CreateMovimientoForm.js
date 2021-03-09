import React, { useEffect, useState } from 'react';
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
  valid,
  setValid,
}) {
    const [validateArray, setValidateArray] = useState([true, false, false]);
    useEffect(() => {
        if (!valid) {
            setValid(validateArray[0] && validateArray[1] && validateArray[2]);
        }
    }, validateArray);
    return (
        <Col md={ 6 }>
            <Panel>
                <Col md={ 6 }>
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
                <Col md={ 6 }>
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
                <Col md={ 6 }>
                    <Field
                      name={ `concepto-${index}` }
                      label='Concepto'
                      component={ InputRF }
                      validate={ [required] }
                      nullValue=''
                      onChange={ () => {
                          setValidateArray([validateArray[0], true, validateArray[2]]);
                      } }
                    />
                </Col>
                <Col md={ 6 }>
                    <Field
                      name={ `monto-${index}` }
                      label='Monto'
                      placeholder='0.00'
                      component={ InputRF }
                      validate={ [required, integerValue] }
                      nullValue=''
                      onChange={ () => {
                          setValidateArray([validateArray[0], validateArray[1], true]);
                      } }
                    />
                </Col>
            </Panel>
        </Col>
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
    valid: bool,
    setValid: func,
};
