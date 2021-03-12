import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Field, formValueSelector, change } from 'redux-form';
import { connect } from 'react-redux';
import { required, integerValue, alpha } from '../../../utilities/reduxFormValidators';
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
  updateForm,
}) {
    const style = { padding: '0 0.5rem', margin: 0 };

    useEffect(() => {
        updateForm(`tipoMovimiento-${index}`, tiposMovimientos[index]);
    }, []);

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
            <td style={ style }>
                <Field
                  name={ `concepto-${index}` }
                  component={ InputRF }
                  nullValue=''
                />
            </td>
            <td style={ style }>
                <Field
                  name={ `tipoMovimiento-${index}` }
                  component={ InputRF }
                  componentClass='select'
                  selectOptions={ tiposMovimientos }
                  validate={ validate ? [alpha] : [] }
                  customErrorMsg='Debe seleccionar una opcion'
                  type='text'
                />
            </td>
            <td style={ { ...style, width: '15%' } }>
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
    tiposMovimientos: array.isRequired,
    index: number.isRequired,
    opcionesMedicos: array.isRequired,
    isLoading: bool.isRequired,
    renderMenu: func.isRequired,
    onSearch: func.isRequired,
    labelKey: func.isRequired,
    validate: bool.isRequired,
    updateForm: func.isRequired,
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

function mapDispatchToProps(dispatch) {
    return {
        updateForm: (name, value) => dispatch(change('CreateCajaFormRedux', name, value)),
    };
}

export default
    connect(mapStateToProps, mapDispatchToProps)(CreateMovimientoForm);
