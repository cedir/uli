import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import DeleteIcon from 'mdi-react/DeleteIcon';

function EstudiosDeUnaPresentacionTableRow(props) {
    const {
        estudio,
        actualizarInput,
        eliminarEstudio,
        index,
        seccion,
    } = props;
    const {
        fecha, nro_de_orden: orden,
        paciente, practica, medico,
        importe_estudio, id,
        pension, diferencia_paciente,
        importe_medicacion: medicacion,
        arancel_anestesia,
    } = estudio;

    const [nroOrden, setNroOrden] = useState(orden);
    const [importe, setImporte] = useState(parseFloat(importe_estudio, 10));
    const [pensionState, setPension] = useState(parseFloat(pension, 10));
    const [difPaciente, setDifPaciente] = useState(parseFloat(diferencia_paciente, 10));
    const [anestesista, setAnestesista] = useState(parseFloat(arancel_anestesia, 10));
    const [renderRow, setRenderRow] = useState(true);
    const history = useHistory();

    const deleteIconClickHandler = () => {
        setRenderRow(!renderRow);
        eliminarEstudio(index);
    };

    const onChangeHandler = (e) => {
        let parsedValue = parseFloat(e.target.value, 10);
        if (isNaN(parsedValue)) {
            parsedValue = 0;
        }
        actualizarInput(index, e.target.name, parsedValue);
        switch (e.target.name) {
            case 'nro_de_orden':
                setNroOrden(e.target.value);
                break;
            case 'importe_estudio':
                setImporte(parsedValue);
                break;
            case 'pension':
                setPension(parsedValue);
                break;
            case 'diferencia_paciente':
                setDifPaciente(parsedValue);
                break;
            case 'arancel_anestesia':
                setAnestesista(parsedValue);
                break;
            default:
                break;
        }
    };

    const { descripcion } = practica;
    const descripcionAbreviada = descripcion &&
        descripcion.slice(0, 8).concat(descripcion.length > 8 ? '...' : '');

    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
    return (
        <tr className='estudios-table-row'>
            <td
              className='fecha'
              onClick={ seccion && (() => history.push(`/estudios/detail/${id}/${seccion}`)) }
            >
                { fecha }
            </td>
            <td>
                <input
                  type='text'
                  value={ nroOrden }
                  placeholder={ nroOrden }
                  onChange={ e => onChangeHandler(e) }
                  onFocus={ e => e.target.select() }
                  name='nro_de_orden'
                />
            </td>
            <td>{ paciente.id }</td>
            <td title={ `${paciente.nombre} ${paciente.apellido}` }>
                { paciente.apellido }
            </td>
            <td title={ practica.descripcion } className='practica'>
                { practica.abreviatura || descripcionAbreviada }
            </td>
            <td title={ `${medico.nombre} ${medico.apellido}` }>
                { medico.apellido }
            </td>
            <td>
                <input
                  type='number'
                  value={ importe }
                  onChange={ e => onChangeHandler(e) }
                  onFocus={ e => e.target.select() }
                  name='importe_estudio'
                />
            </td>
            <td>
                <input
                  type='number'
                  value={ pensionState }
                  onChange={ e => onChangeHandler(e) }
                  onFocus={ e => e.target.select() }
                  name='pension'
                />
            </td>
            <td>
                <input
                  type='number'
                  value={ difPaciente }
                  onChange={ e => onChangeHandler(e) }
                  onFocus={ e => e.target.select() }
                  name='diferencia_paciente'
                />
            </td>
            <td className='medicacion'>
                <div>{ parseFloat(medicacion, 10).toFixed(2) }</div>
            </td>
            <td>
                <input
                  type='number'
                  value={ parseFloat(anestesista, 10) }
                  onChange={ e => onChangeHandler(e) }
                  onFocus={ e => e.target.select() }
                  name='arancel_anestesia'
                />
            </td>
            { eliminarEstudio && (
                <td>
                    <DeleteIcon
                      className='delete-icon'
                      tabIndex='0'
                      role='button'
                      onClick={ deleteIconClickHandler }
                    />
                </td>
            )}
        </tr>
    );
}

const { object, func, number, string } = PropTypes;

EstudiosDeUnaPresentacionTableRow.propTypes = {
    estudio: object.isRequired,
    eliminarEstudio: func,
    index: number.isRequired,
    actualizarInput: func.isRequired,
    seccion: string.isRequired,
};

export default EstudiosDeUnaPresentacionTableRow;
