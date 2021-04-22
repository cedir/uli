import React from 'react';
import PropTypes from 'prop-types';

function ContadorTableHeader({ tiempos }) {
    return (
        <tr>
            <th>Nombre</th>
            {tiempos.map((tiempo, key) => <th key={ key }>{tiempo} mes</th>)}
        </tr>
    );
}

const { array } = PropTypes;

ContadorTableHeader.propTypes = {
    tiempos: array.isRequired,
};

export default ContadorTableHeader;
