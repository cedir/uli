import React from 'react';
import PropTypes from 'prop-types';

function ComprobanteRow({
    NombreCliente,
    Numero,
    TotalFacturado,
    TotalCobrado,
    FechaEmision,
    TipoComprobante,
    setShowImporteModal,
    setComprobanteId,
    setTipoComprobante,
    idComprobante,
}) {
    const setOnClick = () => {
        setShowImporteModal(true);
        setComprobanteId(idComprobante);
        setTipoComprobante(TipoComprobante);
    };

    return (
        <tr onClick={ setOnClick }>
            <td>{NombreCliente}</td>
            <td>{Numero}</td>
            <td>{TotalFacturado}</td>
            <td>{TotalCobrado}</td>
            <td>{FechaEmision}</td>
            <td>{TipoComprobante}</td>
        </tr>
    );
}

ComprobanteRow.propTypes = {
    NombreCliente: PropTypes.string.isRequired,
    Numero: PropTypes.number.isRequired,
    TotalFacturado: PropTypes.string.isRequired,
    TotalCobrado: PropTypes.string.isRequired,
    FechaEmision: PropTypes.string.isRequired,
    TipoComprobante: PropTypes.string.isRequired,
    setShowImporteModal: PropTypes.func.isRequired,
    setComprobanteId: PropTypes.func.isRequired,
    setTipoComprobante: PropTypes.func.isRequired,
    idComprobante: PropTypes.number.isRequired,
};

export default ComprobanteRow;
