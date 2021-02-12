import React from 'react';
import PropTypes from 'prop-types';

function DiferenciaCobradaModal({ diferenciaCobrada, diferenciaConIva }) {
    return (
        <React.Fragment>
            Se ha detectado una diferencia de {diferenciaCobrada}
            {diferenciaConIva !== diferenciaCobrada ? ` (con iva ${diferenciaConIva})` : ''}.
            {' '}¿Quiere crear un comprobante asociado?
        </React.Fragment>
    );
}

const { number } = PropTypes;

DiferenciaCobradaModal.propTypes = {
    diferenciaCobrada: number.isRequired,
    diferenciaConIva: number.isRequired,
};

export default DiferenciaCobradaModal;
