/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DeleteIcon from 'mdi-react/DeleteIcon';
import { ModalMedicacion } from '../../components/Modals';
import {
    ACTUALIZAR_INPUT_ESTUDIO_SIN_PRESENTAR, ELIMINAR_ESTUDIO_SIN_PRESENTAR,
} from '../actionTypes';

function NuevaPresentacionObraSocialTableRow(props) {
    const { row, actualizarInputEstudioSinPresentar, eliminarEstudioSinPresentar, index } = props;
    const {
        fecha, nro_de_orden: orden,
        paciente, practica, medico,
        importe_estudio,
        pension, diferencia_paciente,
        importe_medicacion: medicacion,
        arancel_anestesia,
    } = row;

    const [nroOrden, setNroOrden] = useState(orden);
    const [importe, setImporte] = useState(parseFloat(importe_estudio, 10));
    const [pensionState, setPension] = useState(parseFloat(pension, 10));
    const [difPaciente, setDifPaciente] = useState(parseFloat(diferencia_paciente, 10));
    const [anestesista, setAnestesista] = useState(parseFloat(arancel_anestesia, 10));
    const [medicacionClicked, setMedicacionClicked] = useState(false);
    const [renderRow, setRenderRow] = useState(true);

    const deleteIconClickHandler = () => {
        setRenderRow(!renderRow);
        eliminarEstudioSinPresentar(index);
    };

    const onChangeHandler = (dispatcher) => {
        let parsedValue = parseFloat(dispatcher.value, 10);
        if (isNaN(parsedValue)) {
            parsedValue = 0;
        }
        switch (dispatcher.idInput) {
            case 1:
                setNroOrden(dispatcher.value);
                break;
            case 2:
                setImporte(parsedValue);
                break;
            case 3:
                setPension(parsedValue);
                break;
            case 4:
                setDifPaciente(parsedValue);
                break;
            case 5:
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
                          actualizarInputEstudioSinPresentar(
                              index, 1, e.target.value,
                          ),
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
                        actualizarInputEstudioSinPresentar(
                            index, 2, e.target.value,
                        ),
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
                        actualizarInputEstudioSinPresentar(
                            index, 3, e.target.value,
                        ),
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
                        actualizarInputEstudioSinPresentar(
                            index, 4, e.target.value,
                        ),
                    )
                  }
                />
            </td>
            <td className='medicacion'>
                <div>{ parseFloat(medicacion, 10) }</div>
            </td>
            <td>
                <input
                  type='number'
                  value={ parseFloat(anestesista, 10) }
                  onChange={ e =>
                    onChangeHandler(
                        actualizarInputEstudioSinPresentar(
                            index, 5, e.target.value,
                        ),
                    )
                  }
                />
            </td>
            <td className='delete'>
                <DeleteIcon
                  tabIndex='0'
                  role='button'
                  onClick={ deleteIconClickHandler }
                />
            </td>
            <td style={ { display: 'none' } }>
                <ModalMedicacion
                  show={ medicacionClicked }
                  onClickClose={ medicacionIconClickHandler }
                  estudio={ row }
                />
            </td>
        </tr>
    );
}

const { object, func, number } = PropTypes;

NuevaPresentacionObraSocialTableRow.propTypes = {
    row: object.isRequired,
    eliminarEstudioSinPresentar: func.isRequired,
    index: number.isRequired,
    actualizarInputEstudioSinPresentar: func.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        actualizarInputEstudioSinPresentar: (index, idInput, value) =>
            dispatch({
                type: ACTUALIZAR_INPUT_ESTUDIO_SIN_PRESENTAR,
                index, idInput, value,
            }),
        eliminarEstudioSinPresentar: index =>
            dispatch({
                type: ELIMINAR_ESTUDIO_SIN_PRESENTAR, index,
            }),
    };
}

export default connect(null, mapDispatchToProps)(NuevaPresentacionObraSocialTableRow);
