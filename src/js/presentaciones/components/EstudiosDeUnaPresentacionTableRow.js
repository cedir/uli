import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import DeleteIcon from 'mdi-react/DeleteIcon';
import RestartIcon from 'mdi-react/RestartIcon';
import { Checkbox } from 'react-bootstrap';

function EstudiosDeUnaPresentacionTableRow(props) {
    const {
        estudio,
        actualizarInput,
        eliminarEstudio,
        index,
        seccion,
        importesActualizados,
        resetImporte,
        estudioSeleccionado,
    } = props;
    const {
        fecha, nro_de_orden: orden,
        paciente, practica, medico,
        importe_estudio, id,
        pension, diferencia_paciente,
        importe_medicacion: medicacion,
        arancel_anestesia,
        actualizarImportes = false,
    } = estudio;

    const [nroOrden, setNroOrden] = useState(orden);
    const [importe, setImporte] = useState(parseFloat(importe_estudio, 10));
    const [pensionState, setPension] = useState(parseFloat(pension, 10));
    const [difPaciente, setDifPaciente] = useState(parseFloat(diferencia_paciente, 10));
    const [anestesista, setAnestesista] = useState(parseFloat(arancel_anestesia, 10));
    const [renderRow, setRenderRow] = useState(true);
    const [seleccionado, setSeleccionado] = useState(false);
    const history = useHistory();

    const deleteIconClickHandler = () => {
        setRenderRow(!renderRow);
        eliminarEstudio(index);
    };

    const onChangeHandler = (e) => {
        const inputValue = e.target.value || '0.00';
        actualizarInput(index, e.target.name, inputValue);
        switch (e.target.name) {
            case 'nro_de_orden':
                setNroOrden(e.target.value);
                break;
            case 'importe_estudio':
                setImporte(inputValue);
                break;
            case 'pension':
                setPension(inputValue);
                break;
            case 'diferencia_paciente':
                setDifPaciente(inputValue);
                break;
            case 'arancel_anestesia':
                setAnestesista(inputValue);
                break;
            default:
                break;
        }
    };

    const { descripcion } = practica;
    const descripcionAbreviada = descripcion &&
        descripcion.slice(0, 8).concat(descripcion.length > 8 ? '...' : '');

    useEffect(() => {
        if (actualizarImportes) {
            setImporte(parseFloat(importe_estudio, 10));
            setPension(parseFloat(pension, 10));
            setDifPaciente(parseFloat(diferencia_paciente, 10));
            setAnestesista(parseFloat(arancel_anestesia, 10));
            importesActualizados(id);
        }
    }, [actualizarImportes]);

    useEffect(() => {
        if (estudioSeleccionado) {
            estudioSeleccionado(estudio.id, seleccionado);
        }
    }, [seleccionado]);

    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
    return (
        <tr className='estudios-table-row'>
            {estudioSeleccionado && (
                <td>
                    <Checkbox onClick={ () => setSeleccionado(!seleccionado) } />
                </td>
            )}
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
            <td title={ paciente.informacion_extra ? `${paciente.informacion_extra}` : 'No hay información extra' }>
                { paciente.nroAfiliado }
            </td>
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
                  type='text'
                  value={ importe }
                  onChange={ e => onChangeHandler(e) }
                  onFocus={ e => e.target.select() }
                  name='importe_estudio'
                />
            </td>
            <td>
                <input
                  type='text'
                  value={ pensionState }
                  onChange={ e => onChangeHandler(e) }
                  onFocus={ e => e.target.select() }
                  name='pension'
                />
            </td>
            <td>
                <input
                  type='text'
                  value={ difPaciente }
                  onChange={ e => onChangeHandler(e) }
                  onFocus={ e => e.target.select() }
                  name='diferencia_paciente'
                />
            </td>
            <td className='medicacion'>
                <div>{ medicacion }</div>
            </td>
            <td>
                <input
                  type='text'
                  value={ anestesista }
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
            { resetImporte && (
                <td>
                    <RestartIcon
                      onClick={ () => resetImporte(index) }
                    />
                </td>
            )}
        </tr>
    );
}

const { object, func, number, string, bool } = PropTypes;

EstudiosDeUnaPresentacionTableRow.propTypes = {
    estudio: object.isRequired,
    eliminarEstudio: func,
    index: number.isRequired,
    actualizarInput: func.isRequired,
    seccion: string.isRequired,
    actualizarImportes: bool,
    importesActualizados: func,
    resetImporte: func,
    estudioSeleccionado: func,
};

export default EstudiosDeUnaPresentacionTableRow;
