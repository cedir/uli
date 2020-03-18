import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from 'mdi-react/DeleteIcon';

const MedicacionEstudioTableRow = ({ medicacion, onClickDelete }) => {
    const descripcion = medicacion.medicamento.descripcion;
    const importe = medicacion.importe || medicacion.medicamento.importe;

    return (
        <tr>
            <td>{ descripcion }</td>
            <td>{ importe }</td>
            <td>
                <DeleteIcon
                  onClick={ () => onClickDelete(medicacion) }
                />
            </td>
        </tr>
    );
};

const { object, func } = PropTypes;

MedicacionEstudioTableRow.propTypes = {
    medicacion: object.isRequired,
    onClickDelete: func.isRequired,
};

export default MedicacionEstudioTableRow;
