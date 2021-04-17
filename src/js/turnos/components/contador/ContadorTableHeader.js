import React from 'react';
import PropTypes from 'prop-types';

function ContadorTableHeader({ tiempos }) {
    return (
        <React.Fragment>
            <th>Nombre</th>
            {tiempos.map(tiempo => <th>{tiempo} mes</th>)}
        </React.Fragment>
    );
}

const { array } = PropTypes;

ContadorTableHeader.propTypes = {
    tiempos: array.isRequired,
};

export default ContadorTableHeader;
