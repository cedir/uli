import React, { useState } from 'react';
import { Row } from 'react-bootstrap/dist/react-bootstrap';
import TipoClienteSelect from './TipoClienteSelect';
import CamposCliente from './CamposCliente';

function ClienteForm() {
    const tiposCondicionFiscal = ['RESPONSABLE INSCRIPTO', 'EXENTO', 'CONSUMIDOR FINAL'];
    const [tipoCliente, setTipoCliente] = useState(0);
    const setTipoClienteHandler = value =>
        (tipoCliente === value ? setTipoCliente(0) : setTipoCliente(value));

    return (
        <Row>
            <TipoClienteSelect
              tipoCliente={ tipoCliente }
              setTipoCliente={ setTipoClienteHandler }
            />
            <CamposCliente tiposCondicionFiscal={ tiposCondicionFiscal } />
        </Row>
    );
}

ClienteForm.fields = [
    'nombreCliente',
    'domicilioCliente',
    'dni',
    'tipoDocumento',
    'condicionFiscal',
];

export default ClienteForm;
