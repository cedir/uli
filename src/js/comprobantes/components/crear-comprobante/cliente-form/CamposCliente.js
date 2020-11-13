import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import { Field } from 'redux-form';

import InputRF from '../../../../utilities/InputRF';
import { required, dniOrCuit, alpha } from '../../../../utilities/reduxFormValidators';
import { normalizeDniCuit } from '../../../../utilities/reduxFormNormalizers';

function CamposCliente({ tiposCondicionFiscal }) {
    return (
        <React.Fragment>
            <Col md={ 7 }>
                <Field
                  name='nombreCliente'
                  label='Nombre'
                  component={ InputRF }
                  validate={ required }
                  type='text'
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
                  label='DNI'
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

const { array } = PropTypes;

CamposCliente.propTypes = {
    tiposCondicionFiscal: array.isRequired,
};

export default CamposCliente;
