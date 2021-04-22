import React from 'react';
import PropTypes from 'prop-types';

function ContadorTableRow({ usuarios, cantidadTurnos }) {
    return (
        <React.Fragment>
            { usuarios.map(usuario => (
                <tr>
                    <td>{usuario}</td>
                    {cantidadTurnos[usuario].map(tiempo => <td>{tiempo}</td>)}
                </tr>
            ))}
        </React.Fragment>
    );
}

const { array, object } = PropTypes;

ContadorTableRow.propTypes = {
    usuarios: array.isRequired,
    cantidadTurnos: object.isRequired,
};

export default ContadorTableRow;
