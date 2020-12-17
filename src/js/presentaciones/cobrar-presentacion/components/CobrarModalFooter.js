import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

function CobrarModalFooter({
    idPresentacion,
    estudios,
    nroRecibo,
    retencionImpositiva,
    cobrarPresentacion,
}) {
    return (
        <Button
          bsStyle='primary'
          onClick={ () =>
            cobrarPresentacion(idPresentacion, estudios, nroRecibo, retencionImpositiva) }
        >
            Confirmar
        </Button>
    );
}

const { array, string, number, func } = PropTypes;

CobrarModalFooter.propTypes = {
    estudios: array.isRequired,
    nroRecibo: string.isRequired,
    retencionImpositiva: number.isRequired,
    cobrarPresentacion: func.isRequired,
    idPresentacion: number.isRequired,
};

export default CobrarModalFooter;
