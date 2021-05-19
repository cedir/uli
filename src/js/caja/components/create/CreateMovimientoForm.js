import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import InputRF from '../../../utilities/InputRF';
import AsyncTypeaheadRF from '../../../utilities/AsyncTypeaheadRF';

function CreateMovimientoForm({
  tiposMovimientos,
  index,
  opcionesMedicos,
  isLoading,
  onSearch,
  renderMenu,
  labelKey,
  idMovimiento,
}) {
    const style = { padding: '0 0.5rem', margin: 0 };

    const controlMonto = (value, allValues) => {
        if (!allValues.movimientos) {
            return undefined;
        }
        const fieldsMovimiento = allValues.movimientos[idMovimiento];

        const medico = fieldsMovimiento.medico ? fieldsMovimiento.medico : [];

        if (value === undefined &&
            (fieldsMovimiento.concepto !== undefined || medico.length !== 0)) {
            return 'El monto no puede ser nulo';
        }
        return undefined;
    };

    return (
        <tr>
            <td style={ style }>
                <Field
                  name={ `${index}.medico` }
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
            <td style={ style }>
                <Field
                  name={ `${index}.concepto` }
                  component={ InputRF }
                  nullValue=''
                />
            </td>
            <td style={ style }>
                <Field
                  name={ `${index}.tipoMovimiento` }
                  component={ InputRF }
                  componentClass='select'
                  selectOptions={ tiposMovimientos }
                  type='text'
                  showNullValue={ false }
                />
            </td>
            <td style={ { ...style, width: '15%' } }>
                <Field
                  name={ `${index}.monto` }
                  placeholder='0.00'
                  component={ InputRF }
                  autoComplete='off'
                  validate={ controlMonto }
                  nullValue=''
                />
            </td>
        </tr>
    );
}

const { array, string, bool, func, number } = PropTypes;

CreateMovimientoForm.propTypes = {
    tiposMovimientos: array.isRequired,
    index: string.isRequired,
    opcionesMedicos: array.isRequired,
    isLoading: bool.isRequired,
    renderMenu: func.isRequired,
    onSearch: func.isRequired,
    labelKey: func.isRequired,
    idMovimiento: number.isRequired,
};

export default CreateMovimientoForm;
