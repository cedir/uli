import React from 'react';
import PropTypes from 'prop-types';
import { Form, reduxForm, FieldArray } from 'redux-form';
import Panel from 'react-bootstrap/lib/Panel';
import CabeceraForm from './cabecera-form/CabeceraForm';
import ClienteForm from './cliente-form/ClienteForm';
import LineasForm from './linea-form/LineasForm';
import { nonEmpty } from '../../../utilities/reduxFormValidators';
import BotonesForm from './BotonesForm';

function CreateComprobante({
    crearComprobante,
    valid,
    handleSubmit,
    cae,
    apiLoading,
    lockComprobante,
    updateForm,
}) {
    const opcionesIva = [
        { text: 'Exento', porcentaje: 0, gravado: 1 },
        { text: 'Iva inscripto 10.5', porcentaje: 10.5, gravado: 2 },
        { text: 'Iva inscripto 21', porcentaje: 21, gravado: 3 },
    ];

    const getNombreCliente = (nombreCliente) => {
        if (Array.isArray(nombreCliente)) {
            const { apellido, nombre } = nombreCliente[0];
            return apellido ? `${nombre} ${apellido}` : `${nombre}`;
        }
        return nombreCliente;
    };

    return (
        <Form
          onSubmit={ handleSubmit(comprobante =>
              crearComprobante({
                  ...comprobante,
                  nombreCliente: getNombreCliente(comprobante.nombreCliente),
              }),
          ) }
        >
            <h1> Crear comprobante </h1>
            <Panel header='Cliente' collapsible defaultExpanded>
                <ClienteForm lockComprobante={ lockComprobante } updateForm={ updateForm } />
            </Panel>
            <Panel header='Cabecera' collapsible defaultExpanded>
                <CabeceraForm
                  opcionesIva={ opcionesIva }
                  lockComprobante={ lockComprobante }
                  updateForm={ updateForm }
                />
            </Panel>
            <Panel header='Lineas' collapsible defaultExpanded>
                <FieldArray
                  name='lineas'
                  component={ LineasForm }
                  validate={ nonEmpty }
                  opcionesIva={ opcionesIva }
                  lockComprobante={ lockComprobante }
                />
            </Panel>
            <BotonesForm
              valid={ valid }
              cae={ cae }
              apiLoading={ apiLoading }
              lockComprobante={ lockComprobante }
            />
        </Form>
    );
}

const { func, bool, string } = PropTypes;

CreateComprobante.propTypes = {
    crearComprobante: func.isRequired,
    valid: bool.isRequired,
    handleSubmit: func.isRequired,
    cae: string,
    apiLoading: bool.isRequired,
    lockComprobante: bool.isRequired,
    updateForm: func.isRequired,
};

const CreateComprobanteForm = reduxForm({
    form: 'CreateComprobanteForm',
})(CreateComprobante);

export default CreateComprobanteForm;
