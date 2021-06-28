import React from 'react';
import PropTypes from 'prop-types';
import FilePlusIcon from 'mdi-react/FilePlusIcon';
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
    history,
}) {
    const propsNombreCliente = cae ? {
        onClick: () => history.push(`/comprobantes/detail/${idComprobante}`),
        role: 'button',
        tabIndex: '0',
    } : {};

    return (
        <tr>
            <td>
                <div
                  style={ { paddingBottom: '1em' } }
                  { ...propsNombreCliente }
                >
                    {NombreCliente}
                </div>
            </td>
            <td>{Numero}</td>
            <td>{TotalFacturado}</td>
            <td>{TotalCobrado}</td>
            <td>{FechaEmision}</td>
            <td>{TipoComprobante}</td>
            <td>
                <FilePlusIcon
                  onClick={ () => {
                      setShowImporteModal(true);
                      setComprobanteId(idComprobante);
                    } }
                />
            </td>
            <td>
                {cae &&
                    <Button
                      bsStyle='link'
                      style={ { paddingTop: 0 } }
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
    history: PropTypes.object,
};

export default ComprobanteRow;
