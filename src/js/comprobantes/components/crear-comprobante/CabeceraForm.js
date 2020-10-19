import React from 'react';
import { Field } from 'redux-form';
import { Row, Col } from 'react-bootstrap/dist/react-bootstrap';
import InputRF from '../../../utilities/InputRF';
import { alpha, alphaNum, required } from '../../../utilities/reduxFormValidators';

function CabeceraForm() {
    const opcionesResponsable = ['Cedir', 'Brunetti'];
    const opcionesIva = [
      { text: 'Exento', value: 0 },
      { text: 'Iva inscripto 10.5', value: 10.5 },
      { text: 'Iva inscripto 21', value: 21 },
    ];
    const tiposComprobante = [
      { text: 'Factura', value: 1 },
      { text: 'Liquidacion', value: 2 },
      { text: 'Nota De Debito', value: 3 },
      { text: 'Nota De Credito', value: 4 },
      { text: 'Factura Electronica', value: 5 },
      { text: 'Nota de Debito Electronica', value: 6 },
      { text: 'Nota de Credito Electronica', value: 7 },
    ];
    const subTiposComprobante = ['A', 'B'];
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
                  selectionValue='value'
                  renderOptionHandler={ opcion => opcion.text }
                  optionKey='text'
                  type='number'
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
                />
                <Field
                  name='subTipo'
                  label='Sub-Tipo'
                  component={ InputRF }
                  componentClass='select'
                  selectOptions={ subTiposComprobante }
                  nullValue=''
                />
            </Col>
        </Row>
    );
}

export default CabeceraForm;
