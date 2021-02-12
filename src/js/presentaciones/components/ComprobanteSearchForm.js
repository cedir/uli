import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Field } from 'redux-form';
import InputRF from '../../utilities/InputRF';
import { integerValue } from '../../utilities/reduxFormValidators';

export default function ComprobanteSearchForm() {
    const tiposComprobante = [
        { text: 'Factura', value: 1 },
        { text: 'Liquidacion', value: 2 },
        { text: 'Factura Electronica', value: 5 },
    ];

    return (
        <Row>
            <Col md={ 3 }>
                <Field
                  name='tipoComprobante'
                  label='Tipo de Comprobante'
                  componentClass='select'
                  component={ InputRF }
                  selectOptions={ tiposComprobante }
                  nullValue=''
                  selectionValue='value'
                  renderOptionHandler={ opcion => opcion.text }
                  optionKey='text'
                />
            </Col>
            <Col md={ 3 } mdOffset={ 1 }>
                <Field
                  name='numero'
                  label='Numero'
                  validate={ [integerValue] }
                  component={ InputRF }
                  nullValue=''
                />
            </Col>
        </Row>
    );
}
