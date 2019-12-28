import React from 'react';
import PropTypes from 'prop-types';

function listar({
    NombreCliente,
    Numero,
    TotalFacturado,
    TotalCobrado,
    FechaEmision,
    TipoComprobante,
}) {
    return (
        <tr>
            <td>{NombreCliente}</td>
            <td>{Numero}</td>
            <td>{TotalFacturado}</td>
            <td>{TotalCobrado}</td>
            <td>{FechaEmision}</td>
            <td>{TipoComprobante}</td>
        </tr>
    );
}

listar.propTypes = {
    NombreCliente: PropTypes.string.isRequired,
    Numero: PropTypes.number.isRequired,
    TotalFacturado: PropTypes.string.isRequired,
    TotalCobrado: PropTypes.string.isRequired,
    FechaEmision: PropTypes.string.isRequired,
    TipoComprobante: PropTypes.string.isRequired,
};

export default listar;
