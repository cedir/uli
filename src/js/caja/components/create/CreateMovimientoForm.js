import React from 'react';
import PropTypes from 'prop-types';
import { Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { required, integerValue } from '../../../utilities/reduxFormValidators';
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
  validate,
}) {
    const style = { padding: '0 0.5rem', margin: 0 };
    return (
        <tr>
            <td style={ style }>
                <Field
                  name={ `medico-${index}` }
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
                  nullValue=''
                />
            </td>
            <td style={ { padding: '0 0.5rem', margin: 0 } }>
                <Field
                  name={ `tipoMovimiento-${index}` }
                  component={ InputRF }
                  componentClass='select'
                  selectOptions={ tiposMovimientos }
                  validate={ [] } // falta poner requiered
                  type='text'
                  input={ { defaultValue: tiposMovimientos[index] } }
                />
            </td>
            <td style={ { padding: '0 0.5rem', margin: 0, width: '15%' } }>
                <Field
                  name={ `monto-${index}` }
                  placeholder='0.00'
                  component={ InputRF }
                  validate={ validate ? [required, integerValue] : [] }
                  nullValue=''
                />
            </td>
        </tr>
    );
}

const { array, number, bool, func } = PropTypes;

CreateMovimientoForm.propTypes = {
    tiposMovimientos: array,
    index: number,
    opcionesMedicos: array,
    isLoading: bool,
    renderMenu: func,
    onSearch: func,
    labelKey: func,
    validate: bool,
};

const selector = formValueSelector('CreateCajaFormRedux');

function mapStateToProps(state, ownProps) {
    const { index } = ownProps;
    const concepto = selector(state, `concepto-${index}`);
    let medico = selector(state, `medico-${index}`);
    const monto = selector(state, `monto-${index}`);
    medico = (medico && Array.isArray(medico))
    ? medico
    : [];
    let validate;
    if (concepto || monto || medico.length !== 0) {
        validate = true;
    } else {
        validate = false;
    }

    return {
        validate,
    };
}

export default
    connect(mapStateToProps)(CreateMovimientoForm);
