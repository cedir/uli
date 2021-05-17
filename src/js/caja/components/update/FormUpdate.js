import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, formValueSelector, change } from 'redux-form';
import { Row, Col } from 'react-bootstrap';

import { required } from '../../../utilities/reduxFormValidators';
import InputRF from '../../../utilities/InputRF';
import MedicoField from '../../../utilities/components/forms/MedicoField';
import { tiposMovimiento } from '../../../utilities/generalUtilities';

function FormUpdate({ medico, updateForm, movimiento }) {
    const [medicoField, setMedicoField] = useState(null);

    useEffect(() => {
        updateForm('concepto', movimiento.concepto);
        updateForm('tipo', movimiento.tipo.id);
    }, []);

    useEffect(() => {
        if (!medicoField) {
            setMedicoField(movimiento.medico ? [movimiento.medico] : []);
        } else {
            setMedicoField(medico);
        }
    }, [medico]);

    return (
        <Row>
            <Col md={ 4 }>
                <Field
                  name='tipo'
                  label='Descripcion Movimiento'
                  component={ InputRF }
                  componentClass='select'
                  selectOptions={ tiposMovimiento }
                  validate={ required }
                  customErrorMsg='Debe seleccionar una opcion'
                  selectionValue='value'
                  renderOptionHandler={ opcion => opcion.text }
                  optionKey='text'
                />
            </Col>
            <Col md={ 4 }>
                <Field
                  name='concepto'
                  label='Concepto'
                  component={ InputRF }
                  nullValue=''
                />
            </Col>
            <Col md={ 4 }>
                <MedicoField
                  nameField='medico'
                  label='Medico'
                  type='actuante'
                  medico={ medicoField }
                />
            </Col>
        </Row>
    );
}

const selector = formValueSelector('UpdateCajaFormRedux');

const { array, func, object } = PropTypes;

FormUpdate.propTypes = {
    medico: array.isRequired,
    updateForm: func.isRequired,
    movimiento: object.isRequired,
};

function mapStateToProps(state) {
    let medico = selector(state, 'medico');
    medico = (medico && Array.isArray(medico))
            ? medico
            : [];

    return { medico };
}

function mapDispatchToProps(dispatch) {
    return {
        updateForm: (name, value) => dispatch(change('UpdateCajaFormRedux', name, value)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FormUpdate);
