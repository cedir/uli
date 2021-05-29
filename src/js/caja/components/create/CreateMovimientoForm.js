import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import InputRF from '../../../utilities/InputRF';
import MedicoField from '../../../utilities/components/forms/MedicoField';

function CreateMovimientoForm({
  tiposMovimientos,
  index,
  idMovimiento,
  medico,
}) {
    const style = { padding: '0 0.5rem', margin: 0 };

    const controlMonto = (value, allValues) => {
        if (!allValues.movimientos) {
            return undefined;
        }
        const fieldsMovimiento = allValues.movimientos[idMovimiento];

        if (value === undefined &&
            (fieldsMovimiento.concepto !== undefined || medico.length !== 0)) {
            return 'El monto no puede ser nulo';
        }
        return undefined;
    };

    return (
        <tr>
            <td style={ style }>
                <MedicoField
                  nameField={ `${index}.medico` }
                  type='actuante'
                  medico={ medico }
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

const { array, string, number } = PropTypes;

CreateMovimientoForm.propTypes = {
    tiposMovimientos: array.isRequired,
    index: string.isRequired,
    medico: array.isRequired,
    idMovimiento: number.isRequired,
};

export default CreateMovimientoForm;
