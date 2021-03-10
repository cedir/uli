import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Row, Col } from 'react-bootstrap/dist/react-bootstrap';
import InputRF from '../../../../utilities/InputRF';
import { alpha, alphaNum, required } from '../../../../utilities/reduxFormValidators';

function CabeceraForm({
    opcionesIva,
    lockComprobante,
    opcionesResponsable,
    tiposComprobante,
    subTiposComprobante,
}) {
    return (
        <Row>
            <Col md={ 4 }>
                <Field
                  name='responsable'
                  label='Responsable'
                  component={ InputRF }
                  componentClass='select'
                  validate={ alpha }
                  customErrorMsg='Debe seleccionar una opcion'
                  selectOptions={ opcionesResponsable }
                  staticField={ lockComprobante }
                />
                <Field
                  name='iva'
                  label='Iva'
                  component={ InputRF }
                  componentClass='select'
                  validate={ required }
                  nullValue=''
                  customErrorMsg='Debe seleccionar una opcion'
                  selectOptions={ opcionesIva }
                  selectionValue='gravado'
                  renderOptionHandler={ opcion => opcion.text }
                  optionKey='text'
                  type='number'
                  staticField={ lockComprobante }
                />
            </Col>
            <Col md={ 4 } mdOffset={ 2 }>
                <Field
                  name='tipoComprobante'
                  label='Tipo de comprobante'
                  component={ InputRF }
                  componentClass='select'
                  validate={ alphaNum }
                  customErrorMsg='Debe seleccionar una opcion'
                  selectOptions={ tiposComprobante }
                  selectionValue='value'
                  renderOptionHandler={ opcion => opcion.text }
                  optionKey='text'
                  staticField={ lockComprobante }
                />
                <Field
                  name='subTipo'
                  label='Sub-Tipo'
                  component={ InputRF }
                  componentClass='select'
                  selectOptions={ subTiposComprobante }
                  nullValue=''
                  staticField={ lockComprobante }
                />
            </Col>
        </Row>
    );
}

const { array, bool } = PropTypes;

CabeceraForm.propTypes = {
    opcionesIva: array.isRequired,
    lockComprobante: bool.isRequired,
    opcionesResponsable: array.isRequired,
    tiposComprobante: array.isRequired,
    subTiposComprobante: array.isRequired,
};

export default CabeceraForm;
