import React from 'react';
import PropTypes from 'prop-types';

function ContadorTableRow({ usuario, cantidadTurnos }) {
    return (
        <React.Fragment>
            <tr>
                <td>{usuario}</td>
                {cantidadTurnos.map(tiempo => <td>{tiempo}</td>)}
            </tr>
        </React.Fragment>
    );
}

const { array, object } = PropTypes;

ContadorTableRow.propTypes = {
    usuario: array.isRequired,
    cantidadTurnos: object.isRequired,
};

export default ContadorTableRow;
