import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, reduxForm, FieldArray } from 'redux-form';
import Panel from 'react-bootstrap/lib/Panel';
import CabeceraForm from './cabecera-form/CabeceraForm';
import ClienteForm from './cliente-form/ClienteForm';
import LineasForm from './linea-form/LineasForm';
import { nonEmpty } from '../../../utilities/reduxFormValidators';
import BotonesForm from './BotonesForm';
import ConfirmationModal from './ConfirmationModal';

const formName = 'CreateComprobanteForm';

function CreateComprobante({
    crearComprobante,
    valid,
    handleSubmit,
    cae,
    apiLoading,
    lockComprobante,
    updateForm,
    viewMode,
}) {
    const getNombreCliente = (nombreCliente) => {
        if (Array.isArray(nombreCliente)) {
            const { apellido, nombre } = nombreCliente[0];
            return apellido ? `${nombre} ${apellido}` : `${nombre}`;
        }
        return nombreCliente;
    };

    const [modalOpened, setModalOpened] = useState(false);

    return (
        <Form
          onSubmit={ handleSubmit(comprobante =>
              crearComprobante({
                  ...comprobante,
                  nombreCliente: getNombreCliente(comprobante.nombreCliente),
              }),
          ) }
          id={ formName }
        >
            <h1> Crear comprobante </h1>
            <Panel header='Cliente' collapsible defaultExpanded>
                <ClienteForm lockComprobante={ lockComprobante } updateForm={ updateForm } />
            </Panel>
            <Panel header='Cabecera' collapsible defaultExpanded>
                <CabeceraForm
                  lockComprobante={ lockComprobante }
                  updateForm={ updateForm }
                  viewMode={ viewMode }
                />
            </Panel>
            <Panel header='Lineas' collapsible defaultExpanded>
                <FieldArray
                  name='lineas'
                  component={ LineasForm }
                  validate={ nonEmpty }
                  lockComprobante={ lockComprobante }
                />
            </Panel>
            <ConfirmationModal
              modalOpened={ modalOpened }
              closeModal={ () => setModalOpened(false) }
              apiLoading={ apiLoading }
              lockComprobante={ lockComprobante }
              formName={ formName }
            />
            <BotonesForm
              valid={ valid }
              cae={ cae }
              lockComprobante={ lockComprobante }
              viewMode={ viewMode }
              openModal={ () => setModalOpened(true) }
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
    viewMode: bool.isRequired,
};

const CreateComprobanteForm = reduxForm({
    form: formName,
})(CreateComprobante);

export default CreateComprobanteForm;
