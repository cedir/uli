import React from 'react';
import PropTypes from 'prop-types';
import { Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { required, alpha, numberValue } from '../../../utilities/reduxFormValidators';
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
                  validate={ validate && [alpha, required] }
                  customErrorMsg='Debe seleccionar una opcion'
                  type='text'
                />
            </td>
            <td style={ { ...style, width: '15%' } }>
                <Field
                  name={ `${index}.monto` }
                  placeholder='0.00'
                  component={ InputRF }
                  validate={ validate && [required, numberValue] }
                  nullValue=''
                />
            </td>
        </tr>
    );
}

const { array, string, bool, func } = PropTypes;

CreateMovimientoForm.propTypes = {
    tiposMovimientos: array.isRequired,
    index: string.isRequired,
    opcionesMedicos: array.isRequired,
    isLoading: bool.isRequired,
    renderMenu: func.isRequired,
    onSearch: func.isRequired,
    labelKey: func.isRequired,
    validate: bool.isRequired,
};

const selector = formValueSelector('CreateCajaFormRedux');

function mapStateToProps(state, ownProps) {
    const { index } = ownProps;
    const concepto = selector(state, `${index}.concepto`);
    let medico = selector(state, `${index}.medico`);
    const monto = selector(state, `${index}.monto`);
    medico = (medico && Array.isArray(medico))
        ? medico
        : [];
    const validate = concepto !== undefined || monto !== undefined || medico.length !== 0;
    return {
        validate,
    };
}

export default
    connect(mapStateToProps)(CreateMovimientoForm);
