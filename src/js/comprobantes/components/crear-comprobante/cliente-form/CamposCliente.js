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
    selected,
    updateForm,
    lockComprobante,
    tipoCliente,
}) {
    useEffect(() => {
        if (selected[0] && selected[0].nombre) {
            updateForm('domicilioCliente', selected[0].direccion || selected[0].domicilio);
            updateForm('dni', (selected[0].nro_cuit || selected[0].dni).toString());
            updateForm('condicionFiscal', selected[0].condicion_fiscal);
        } else {
            updateForm('domicilioCliente', '');
            updateForm('dni', '');
            updateForm('condicionFiscal', '');
        }
    }, [selected[0] && selected[0].nombre]);

    const clientProps = {
        name: 'nombreCliente',
        label: 'Nombre',
        type: 'text',
        component: InputRF,
        staticField: lockComprobante,
        paciente: selected,
        validate: required,
        required: true,
    };

    return (
        <React.Fragment>
            <Col md={ 7 }>
                {tipoCliente === 0 && <Field { ...clientProps } />}
                {tipoCliente === 1 && <PacienteField { ...clientProps } />}
                {tipoCliente === 2 &&
                    <ObraSocialField
                      obraSocial={ selected }
                      { ...clientProps }
                    />
                }
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
    selected: array,
    updateForm: func.isRequired,
    lockComprobante: bool.isRequired,
    tipoCliente: number.isRequired,
};

export default CamposCliente;
