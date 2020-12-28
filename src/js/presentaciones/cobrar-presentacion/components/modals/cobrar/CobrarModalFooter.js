import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

function CobrarModalFooter({
    idPresentacion,
    estudios,
    nroRecibo,
    retencionImpositiva,
    cobrarPresentacion,
    cargando,
    cobrada,
}) {
    return (
        <Button
          bsStyle='primary'
          disabled={ cargando || cobrada }
          onClick={ () =>
            cobrarPresentacion(idPresentacion, estudios, nroRecibo, retencionImpositiva) }
        >
            Confirmar
        </Button>
    );
}

const { array, string, number, func, bool } = PropTypes;

CobrarModalFooter.propTypes = {
    estudios: array.isRequired,
    nroRecibo: string.isRequired,
    retencionImpositiva: number.isRequired,
    cobrarPresentacion: func.isRequired,
    idPresentacion: number.isRequired,
    cargando: bool.isRequired,
    cobrada: bool.isRequired,
};

export default CobrarModalFooter;
