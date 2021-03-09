import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { required, integerValue } from '../../../utilities/reduxFormValidators';
import InputRF from '../../../utilities/InputRF';
import AsyncTypeaheadRF from '../../../utilities/AsyncTypeaheadRF';

export default function CreateMovimientoForm({
  tiposMovimientos,
  index,
  movimiento,
  opcionesMedicos,
  isLoading,
  onSearch,
  renderMenu,
  labelKey,
  valid,
  setValid,
}) {
    const [validateArray, setValidateArray] = useState([true, false, false]);
    useEffect(() => {
        if (!valid) {
            setValid(validateArray[0] && validateArray[1] && validateArray[2]);
        }
    }, validateArray);
    const style = { padding: '0 0.5rem', margin: 0 };
    return (
        <tr>
            <td style={ style }>
                <Field
                  name={ 'medico' }
                  component={ AsyncTypeaheadRF }
                  placeholder='Nombre'
                  type='text'
                  options={ opcionesMedicos }
                  onSearch={ onSearch }
                  renderMenuItemChildren={ renderMenu }
                  isLoading={ isLoading }
                  labelKey={ labelKey }
                  nullValue=''
                />
            </td>
            <td style={ { padding: '0 0.5rem', margin: 0 } }>
                <Field
                  name={ `concepto-${index}` }
                  component={ InputRF }
                  validate={ [required] }
                  nullValue=''
                  onChange={ () => {
                      setValidateArray([validateArray[0], true, validateArray[2]]);
                  } }
                />
            </td>
            <td style={ { padding: '0 0.5rem', margin: 0 } }>
                <Field
                  name={ `tipoMovimiento-${index}` }
                  component={ InputRF }
                  componentClass='select'
                  selectOptions={ tiposMovimientos }
                  validate={ [required] }
                  input={ { defaultValue: movimiento } }
                />
            </td>
            <td style={ { padding: '0 0.5rem', margin: 0, width: '15%' } }>
                <Field
                  name={ `monto-${index}` }
                  placeholder='0.00'
                  component={ InputRF }
                  validate={ [required, integerValue] }
                  nullValue=''
                  onChange={ () => {
                      setValidateArray([validateArray[0], validateArray[1], true]);
                  } }
                />
            </td>
        </tr>
    );
}

const { array, number, bool, func, string } = PropTypes;

CreateMovimientoForm.propTypes = {
    tiposMovimientos: array,
    index: number,
    movimiento: string,
    opcionesMedicos: array,
    isLoading: bool,
    renderMenu: func,
    onSearch: func,
    valid: bool,
    setValid: func,
    labelKey: func,
};
