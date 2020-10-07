import React from 'react';
import { Field } from 'redux-form';
import { Row, Col } from 'react-bootstrap/dist/react-bootstrap';
import InputRF from '../../../utilities/InputRF';
import { alpha, required } from '../../../utilities/reduxFormValidators';

function CabeceraForm() {
    const opcionesResponsable = ['Cedir', 'Brunetti'];
    const opcionesIva = ['Iva inscripto 21', 'Iva inscripto 10.5', 'Exento'];
    const tiposComprobante = ['Factura', 'Liquidacion', 'Nota De Debito', 'Nota De Credito', 'Factura Electronica', 'Nota de Debito Electronica', 'Nota de Credito Electronica'];
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
                  type='text'
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
                  type='text'
                />
            </Col>
            <Col md={ 4 } mdOffset={ 2 }>
                <Field
                  name='tipoComprobante'
                  label='Tipo de comprobante'
                  component={ InputRF }
                  componentClass='select'
                  validate={ alpha }
                  customErrorMsg='Debe seleccionar una opcion'
                  selectOptions={ tiposComprobante }
                  type='text'
                />
                <Field
                  name='subTipo'
                  label='Sub-Tipo'
                  component={ InputRF }
                  componentClass='select'
                  selectOptions={ subTiposComprobante }
                  nullValue=''
                  type='text'
                />
            </Col>
        </Row>
    );
}

export default CabeceraForm;
