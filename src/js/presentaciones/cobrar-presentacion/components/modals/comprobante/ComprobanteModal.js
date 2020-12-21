import React from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem, ListGroup } from 'react-bootstrap';

function ComprobanteModal({ comprobante }) {
    const porcentaje = comprobante.gravado ? comprobante.gravado.porcentaje : 0;
    return (
        <ListGroup>
            <ListGroupItem>Fecha: {comprobante.fecha_emision}</ListGroupItem>
            <ListGroupItem>
                Responsable: Cedir - {comprobante.tipo_comprobante.nombre} {comprobante.sub_tipo}
            </ListGroupItem>
            <ListGroupItem>
                Comprobante nro: {comprobante.numero}
            </ListGroupItem>
            <ListGroupItem>Iva: {porcentaje}%</ListGroupItem>
        </ListGroup>
    );
}

const { object } = PropTypes;

ComprobanteModal.propTypes = {
    comprobante: object.isRequired,
};

export default ComprobanteModal;
