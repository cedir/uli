import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import { Field } from 'redux-form';

import InputRF from '../../../../utilities/InputRF';
import AsyncTypeaheadRF from '../../../../utilities/AsyncTypeaheadRF';
import { required, dniOrCuit, alpha } from '../../../../utilities/reduxFormValidators';
import { normalizeDniCuit } from '../../../../utilities/reduxFormNormalizers';

function CamposCliente({ tiposCondicionFiscal, optionalProps }) {
    const componente = Object.keys(optionalProps).length === 0 ? InputRF : AsyncTypeaheadRF;

    return (
        <React.Fragment>
            <Col md={ 7 }>
                <Field
                  name='nombreCliente'
                  label='Nombre'
                  component={ componente }
                  validate={ required }
                  type='text'
                  { ...optionalProps }
                />
                <Field
                  name='domicilioCliente'
                  label='Domicilio'
                  component={ InputRF }
                  validate={ required }
                  type='text'
                />
            </Col>
            <Col md={ 3 }>
                <Field
                  name='dni'
                  label='DNI/CUIT'
                  component={ InputRF }
                  validate={ [required, dniOrCuit] }
                  type='text'
                  normalize={ normalizeDniCuit }
                />
            </Col>
            <Col md={ 3 }>
                <Field
                  name='condicionFiscal'
                  label='Condicion fiscal'
                  component={ InputRF }
                  componentClass='select'
                  selectOptions={ tiposCondicionFiscal }
                  validate={ alpha }
                  customErrorMsg='Debe seleccionar una opcion'
                  type='text'
                />
            </Col>
        </React.Fragment>
    );
}

const { array, object } = PropTypes;

CamposCliente.propTypes = {
    tiposCondicionFiscal: array.isRequired,
    optionalProps: object.isRequired,
};

export default CamposCliente;
