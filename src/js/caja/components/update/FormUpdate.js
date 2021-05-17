import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, formValueSelector } from 'redux-form';
import { Row, Col } from 'react-bootstrap';

import { required } from '../../../utilities/reduxFormValidators';
import InputRF from '../../../utilities/InputRF';
import MedicoField from '../../../utilities/components/forms/MedicoField';

function FormUpdate({ medico }) {
    const tiposMovimiento = [ // ver de importarlo general asi no se repite
        { text: 'General', value: 1 },
        { text: 'Honorario Médico', value: 2 },
        { text: 'Honorario Anestesista', value: 3 },
        { text: 'Medicación', value: 4 },
        { text: 'Práctica', value: 5 },
        { text: 'Descartable', value: 6 },
        { text: 'Material Específico', value: 7 },
        { text: 'Pago a Médico', value: 8 },
        { text: 'Consultorio 1', value: 9 },
        { text: 'Coseguro', value: 10 },
        { text: 'Egreso', value: 11 },
        { text: 'Consultorio 2', value: 12 },
    ];
    return (
        <Row>
            <Col md={ 4 }>
                <Field
                  name={ 'tipoMovimiento' }
                  label={ 'Descripcion Movimiento' }
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
                  name={ 'concepto' }
                  label={ 'Concepto' }
                  component={ InputRF }
                  nullValue=''
                />
            </Col>
            <Col md={ 4 }>
                <MedicoField
                  nameField={ 'medico' }
                  label={ 'Medico' }
                  type={ 'actuante' }
                  medico={ medico }
                />
            </Col>
        </Row>
    );
}

const selector = formValueSelector('UpdateCajaFormRedux');

function mapStateToProps(state) {
    let medico = selector(state, 'medico');
    medico = (medico && Array.isArray(medico))
            ? medico
            : [];

    return { medico };
}

const { array } = PropTypes;

FormUpdate.propTypes = {
    medico: array.isRequired,
};


export default connect(mapStateToProps)(FormUpdate);
