import React from 'react';
import PropTypes from 'prop-types';

function DiferenciaCobradaModal({ diferenciaCobrada, diferenciaSinIva }) {
    return (
        <React.Fragment>
            Se ha detectado una diferencia de {diferenciaSinIva}
            {diferenciaSinIva !== diferenciaCobrada ? ` (con iva ${diferenciaCobrada})` : ''}.
            {' '}¿Quiere crear un comprobante asociado?
        </React.Fragment>
    );
}

const { number } = PropTypes;

DiferenciaCobradaModal.propTypes = {
    diferenciaCobrada: number.isRequired,
    diferenciaSinIva: number.isRequired,
};

export default DiferenciaCobradaModal;
