import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function VerPresentacionTableRow(props) {
    const { estudio } = props;
    const [totales, setTotales] = useState(0);
    const {
        fecha, nro_de_orden: orden,
        paciente, practica, medico,
        importe_estudio: importe,
        pension, diferencia_paciente: difPaciente,
        importe_medicacion: medicacion,
        arancel_anestesia: arancelAnestesia,
    } = estudio;

    useEffect(() => {
        setTotales(
            parseFloat(importe, 10) -
            (
                parseFloat(pension, 10) +
                parseFloat(difPaciente, 10) +
                parseFloat(medicacion, 10) +
                parseFloat(arancelAnestesia, 10)
            ),
        );
    });

    return (
        <tr>
            <td>{ fecha }</td>
            <td>{ orden }</td>
            <td title={ `${paciente.nombre} ${paciente.apellido} ` }>
                { paciente.apellido }
            </td>
            <td title={ practica.descripcion }>{ practica.abreviatura }</td>
            <td title={ `${medico.nombre} ${medico.apellido}` }>
                { medico.apellido }
            </td>
            <td title={ `${medico.nombre} ${medico.apellido}` }>
                { medico.apellido }
            </td>
            <td>{ totales.toFixed(2) }</td>
        </tr>
    );
}

VerPresentacionTableRow.propTypes = {
    estudio: PropTypes.object.isRequired,
};

export default VerPresentacionTableRow;
