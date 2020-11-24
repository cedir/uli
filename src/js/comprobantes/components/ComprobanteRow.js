import React from 'react';
import PropTypes from 'prop-types';
import { Button, Glyphicon } from 'react-bootstrap';
import { config } from '../../app/config';

function ComprobanteRow({
    NombreCliente,
    Numero,
    TotalFacturado,
    TotalCobrado,
    FechaEmision,
    TipoComprobante,
    setShowImporteModal,
    setComprobanteId,
    idComprobante,
    cae,
}) {
    const setOnClick = () => {
        setShowImporteModal(true);
        setComprobanteId(idComprobante);
    };

    return (
        <tr>
            <td>{NombreCliente}</td>
            <td>{Numero}</td>
            <td>{TotalFacturado}</td>
            <td>{TotalCobrado}</td>
            <td>{FechaEmision}</td>
            <td>{TipoComprobante}</td>
            <td>
                <a href='#' onClick={ setOnClick }>
                    Crear asociado
                </a>
            </td>
            <td>
                {cae &&
                    <Button
                      bsStyle='link'
                      onClick={ () => window.open(`${config.baseUrl}/comprobante/imprimir/${cae}/`) }
                    >
                        <Glyphicon glyph='print' />
                    </Button>
                }
            </td>
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
    idComprobante: PropTypes.number.isRequired,
    cae: PropTypes.string,
};

export default ComprobanteRow;
