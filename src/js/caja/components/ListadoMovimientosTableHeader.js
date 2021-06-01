import React from 'react';
import PropTypes from 'prop-types';

function ListadoMovimientosTableHeader({ fromUpdate, sortMovimientos }) {
    const columnNames = ['Fecha', 'Usuario', 'Tipo', 'Descripcion', 'Monto',
        'Monto ac.', 'Obra social', 'Practica', 'Paciente', 'Medico'];
    const columnField = ['fecha', 'usuario', 'tipo', 'descripcion', 'monto',
        'montoAcumulado', 'obraSocial', 'practica', 'paciente', 'medico'];

    return (
        <tr>
            {columnNames.map((column, index) => (
                <th key={ index } onClick={ () => sortMovimientos(columnField[index]) }>
                    {column}
                </th>
            ))}
            {!fromUpdate && <th />}
        </tr>
    );
}

const { func, bool } = PropTypes;

ListadoMovimientosTableHeader.propTypes = {
    sortMovimientos: func.isRequired,
    fromUpdate: bool,
};

export default ListadoMovimientosTableHeader;
