import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon, Button } from 'react-bootstrap';

function ListadoMovimientosTableRow({
    movimiento,
    setMovimiento,
    setModal,
    fromUpdate,
}) {
    const { fecha, monto, monto_acumulado: montoAcumulado, concepto,
        tipo = {}, estudio, medico } = movimiento;
    const tipoDescripcion = tipo.descripcion || '-';
    const nombrePaciente = estudio ? `${estudio.paciente.apellido}, ${estudio.paciente.nombre}` : '-';
    const practica = estudio ? estudio.practica.descripcion : '-';
    const obraSocial = estudio ? estudio.obra_social.nombre : '-';

    const getNombreMedico = () => {
        if (medico && medico.nombre) {
            return `${medico.apellido}, ${medico.nombre}`;
        }
        return estudio ? `${estudio.medico.apellido}, ${estudio.medico.nombre}` : '-';
    };

    return (
        <tr>
            <td>{fecha}</td>
            <td>{tipoDescripcion}</td>
            <td>{concepto}</td>
            <td>{monto}</td>
            <td>{montoAcumulado}</td>
            <td>{obraSocial}</td>
            <td>{practica}</td>
            <td>{nombrePaciente}</td>
            <td>{getNombreMedico()}</td>
            { !fromUpdate &&
                <td>
                    <Button
                      bsStyle='link'
                      onClick={ () => { setMovimiento(movimiento); setModal(true); } }
                    >
                        <Glyphicon glyph='pencil' />
                    </Button>
                </td>
            }
        </tr>
    );
}

const { object, func, bool } = PropTypes;

ListadoMovimientosTableRow.propTypes = {
    movimiento: object.isRequired,
    setMovimiento: func,
    setModal: func,
    fromUpdate: bool,
};

export default ListadoMovimientosTableRow;
