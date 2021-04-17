import React from 'react';
import PropTypes from 'prop-types';

function ContadorTableRow({ nombre, cantTurnos }) {
    return (
        <React.Fragment>
            <td>{nombre} </td>
            {cantTurnos.map(cant => <td>{cant}</td>)}
        </React.Fragment>
    );
}

const { string, array } = PropTypes;

ContadorTableRow.propTypes = {
    nombre: string.isRequired,
    cantTurnos: array.isRequired,
};

export default ContadorTableRow;
