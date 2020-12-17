import React from 'react';
import PropTypes from 'prop-types';

function DiferenciaCobradaModal({ diferenciaCobrada }) {
    return (
        <React.Fragment>
            Se ha detectado una diferencia de {diferenciaCobrada}. ¿Quiere crear
            un comprobante asociado?
        </React.Fragment>
    );
}

const { number } = PropTypes;

DiferenciaCobradaModal.propTypes = {
    diferenciaCobrada: number.isRequired,
};

export default DiferenciaCobradaModal;
