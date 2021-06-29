import React from 'react';
import PropTypes from 'prop-types';
import { Button, Glyphicon } from 'react-bootstrap';

function MedicacionEstudioTableRow({ medicacion, removeMedicacion }) {
    const descripcion = medicacion.medicamento.descripcion;
    const importe = medicacion.importe || medicacion.medicamento.importe;

    return (
        <tr>
            <td>{ descripcion }</td>
            <td>{ importe }</td>
            <td className='hide-on-print' style={ { paddingTop: '2px' } }>
                <Button
                  bsStyle='link'
                  onClick={ () => removeMedicacion(medicacion) }
                >
                    <Glyphicon glyph='remove' />
                </Button>
            </td>
        </tr>
    );
}

const { object, func } = PropTypes;

MedicacionEstudioTableRow.propTypes = {
    medicacion: object.isRequired,
    removeMedicacion: func.isRequired,
};

export default MedicacionEstudioTableRow;
