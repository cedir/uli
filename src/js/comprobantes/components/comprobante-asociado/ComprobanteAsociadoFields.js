import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Field } from 'redux-form';
import { opcionesIva, tiposComprobante } from '../../../utilities/generalUtilities';
import InputRF from '../../../utilities/InputRF';
import { twoDecimals } from '../../../utilities/reduxFormNormalizers';
import { required } from '../../../utilities/reduxFormValidators';

function ComprobanteAsociadoFields() {
    return (
        <React.Fragment>
            <Row>
                <Col md={ 4 }>
                    <Field
                      name='importe'
                      label='Importe'
                      component={ InputRF }
                      normalize={ twoDecimals }
                      validate={ required }
                      autoComplete='off'
                    />
                </Col>
                <Col md={ 4 }>
                    <Field
                      name='iva'
                      label='Iva'
                      component={ InputRF }
                      componentClass='select'
                      validate={ required }
                      nullValue=''
                      selectOptions={ opcionesIva }
                      selectionValue='gravado'
                      renderOptionHandler={ opcion => opcion.text }
                      optionKey='text'
                    />
                </Col>
                <Col md={ 4 }>
                    <Field
                      name='tipo'
                      label='Tipo de comprobante'
                      component={ InputRF }
                      componentClass='select'
                      selectOptions={ tiposComprobante }
                      selectionValue='value'
                      renderOptionHandler={ opcion => opcion.text }
                      optionKey='text'
                    />
                </Col>
            </Row>

            <Row>
                <Col md={ 12 }>
                    <Field
                      name='concepto'
                      label='Concepto'
                      component={ InputRF }
                    />
                </Col>
            </Row></React.Fragment>
    );
}

export default ComprobanteAsociadoFields;
