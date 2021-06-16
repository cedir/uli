import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import { Field } from 'redux-form';

import InputRF from '../../../../utilities/InputRF';
import { required, dniOrCuit, alpha } from '../../../../utilities/reduxFormValidators';
import { normalizeDniCuit } from '../../../../utilities/reduxFormNormalizers';
import ObraSocialField from '../../../../utilities/components/forms/ObraSocialField';
import PacienteField from '../../../../utilities/components/forms/PacienteField';

function CamposCliente({
    tiposCondicionFiscal,
    selectedOption,
    updateForm,
    lockComprobante,
    tipoCliente,
}) {
    useEffect(() => {
        if (tipoCliente !== 0 && selectedOption.length > 0) {
            updateForm('domicilioCliente', selectedOption[0].direccion || selectedOption[0].domicilio);
            updateForm('dni', (selectedOption[0].nro_cuit || selectedOption[0].dni).toString());
            updateForm('condicionFiscal', selectedOption[0].condicion_fiscal);
        } else {
            updateForm('domicilioCliente', '');
            updateForm('dni', '');
            updateForm('condicionFiscal', '');
        }
    }, [selectedOption]);

    const clientProps = {
        name: 'nombreCliente',
        label: 'Nombre',
        type: 'text',
        component: InputRF,
        staticField: lockComprobante,
        paciente: selectedOption,
        obraSocial: selectedOption,
        validate: required,
        required: true,
    };

    return (
        <React.Fragment>
            <Col md={ 7 }>
                {tipoCliente === 0 && <Field { ...clientProps } />}
                {tipoCliente === 1 && <PacienteField { ...clientProps } />}
                {tipoCliente === 2 && <ObraSocialField { ...clientProps } />}
                <Field
                  name='domicilioCliente'
                  label='Domicilio'
                  component={ InputRF }
                  validate={ required }
                  type='text'
                  staticField={ lockComprobante }
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
                  staticField={ lockComprobante }
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
                  staticField={ lockComprobante }
                />
            </Col>
        </React.Fragment>
    );
}

const { array, func, bool, number } = PropTypes;

CamposCliente.propTypes = {
    tiposCondicionFiscal: array.isRequired,
    selectedOption: array,
    updateForm: func.isRequired,
    lockComprobante: bool.isRequired,
    tipoCliente: number.isRequired,
};

export default CamposCliente;
