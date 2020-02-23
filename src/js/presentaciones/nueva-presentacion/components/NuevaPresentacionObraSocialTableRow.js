/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes, { func } from 'prop-types';
import { ModalMedicacion } from './Modals';
import { ACTUALIZAR_INPUT_VALUE, ELIMINAR_FILA } from '../actionTypes';

function NuevaPresentacionObraSocialTableRow(props) {
    const { row, actualizarInputValue, eliminarFila } = props;
    const {
        id, fecha, nro_de_orden: orden,
        paciente, practica, medico,
        importe_estudio,
        pension, diferencia_paciente,
        importe_medicacion: medicacion,
        arancel_anestesia,
    } = row;

    console.log(row);

    const [nroOrden, setNroOrden] = useState(orden);
    const [importe, setImporte] = useState(parseFloat(importe_estudio, 10));
    const [pensionState, setPension] = useState(parseFloat(pension, 10));
    const [difPaciente, setDifPaciente] = useState(parseFloat(diferencia_paciente, 10));
    const [anestesista, setAnestesista] = useState(parseFloat(arancel_anestesia, 10));
    const [medicacionClicked, setMedicacionClicked] = useState(false);
    const [renderRow, setRenderRow] = useState(true);

    const deleteIconClickHandler = () => {
        setRenderRow(!renderRow);
        eliminarFila(id);
    };

    const onChangeHandler = (dispatcher) => {
        let parsedValue = parseFloat(dispatcher.value, 10);
        if (isNaN(parsedValue)) {
            parsedValue = 0;
        }
        switch (dispatcher.id) {
            case 0:
                setNroOrden(dispatcher.value);
                break;
            case 1:
                setImporte(parsedValue);
                break;
            case 2:
                setPension(parsedValue);
                break;
            case 3:
                setDifPaciente(parsedValue);
                break;
            case 4:
                setAnestesista(parsedValue);
                break;
            default:
                break;
        }
    };

    const medicacionIconClickHandler = () => {
        setMedicacionClicked(!medicacionClicked);
    };

    const isMedicacionActive = medicacionClicked ? 'active' : '';
    return (
        <tr className='table-row'>
            <td className='icon'>
                <i
                  className={ `fa fa-plus-circle fa-1x ${isMedicacionActive}` }
                  tabIndex='0'
                  role='button'
                  onClick={ medicacionIconClickHandler }
                />
            </td>
            <td className='fecha'>{ fecha }</td>
            <td>
                <input
                  type='text'
                  value={ nroOrden }
                  placeholder={ nroOrden }
                  onChange={ e =>
                    onChangeHandler(
                        actualizarInputValue(0, e.target.value, id),
                    )
                  }
                />
            </td>
            <td>{ paciente.id }</td>
            <td title={ `${paciente.nombre} ${paciente.apellido}` }>
                { paciente.apellido }
            </td>
            <td title={ practica.descripcion } className='practica'>
                { practica.abreviatura }
            </td>
            <td title={ `${medico.nombre} ${medico.apellido}` }>
                { medico.apellido }
            </td>
            <td>
                <input
                  type='number'
                  value={ importe }
                  onChange={ e =>
                    onChangeHandler(
                      actualizarInputValue(1, e.target.value, id),
                    )
                  }
                />
            </td>
            <td>
                <input
                  type='number'
                  value={ pensionState }
                  onChange={ e =>
                    onChangeHandler(
                      actualizarInputValue(2, e.target.value, id),
                    )
                  }
                />
            </td>
            <td>
                <input
                  type='number'
                  value={ difPaciente }
                  onChange={ e =>
                    onChangeHandler(
                      actualizarInputValue(3, e.target.value, id),
                    )
                  }
                />
            </td>
            <td className='td-medicacion'>
                <div>{ parseFloat(medicacion, 10) }</div>
            </td>
            <td>
                <input
                  type='number'
                  value={ parseFloat(anestesista, 10) }
                  onChange={ e =>
                    onChangeHandler(
                      actualizarInputValue(4, e.target.value, id),
                    )
                  }
                />
            </td>
            <td className='delete'>
                <i
                  className='fa fa-trash trash-icon'
                  tabIndex='0'
                  role='button'
                  onClick={ deleteIconClickHandler }
                />
            </td>
            <td style={ { display: 'none' } }>
                <ModalMedicacion
                  show={ medicacionClicked }
                  onClickClose={ medicacionIconClickHandler }
                />
            </td>
        </tr>
    );
}

const { object } = PropTypes;

NuevaPresentacionObraSocialTableRow.propTypes = {
    row: object.isRequired,
    eliminarFila: func.isRequired,
    actualizarInputValue: func.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        eliminarFila: id =>
            dispatch({ type: ELIMINAR_FILA, id }),
        actualizarInputValue: (id, value, idEstudio) =>
            dispatch({ type: ACTUALIZAR_INPUT_VALUE, id, value, idEstudio }),
    };
}

export default connect(null, mapDispatchToProps)(NuevaPresentacionObraSocialTableRow);
