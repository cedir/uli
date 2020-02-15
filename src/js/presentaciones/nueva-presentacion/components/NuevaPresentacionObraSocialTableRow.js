import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ModalMedicacion } from './Modals';
import {
    ACTUALIZAR_NRO_DE_ORDEN, ACTUALIZAR_IMPORTE, ACTUALIZAR_ANESTESISTA,
    ACTUALIZAR_DIF_PACIENTE, ACTUALIZAR_PENSION, ELIMINAR_FILA } from '../actionTypes';

function NuevaPresentacionObraSocialTableRow(props) {
    const { row, actualizarNroDeOrden,
        actualizarImporte, actualizarAnestesista,
        actualizarDifPaciente, actualizarPension,
        eliminarFila } = props;
    const {
        id, fecha, nro_de_orden: orden,
        paciente, practica, medico,
        importe_estudio,
        pension, diferencia_paciente,
        importe_medicacion: medicacion,
        arancel_anestesia,
    } = row;

    const [renderRow, setRenderRow] = useState(true);
    const [nroOrden, setNroOrden] = useState(orden);
    const [importe, setImporte] = useState(importe_estudio);
    const [pensionValue, setPension] = useState(pension);
    const [difPaciente, setDifPaciente] = useState(diferencia_paciente);
    const [anestesista, setAnestesista] = useState(arancel_anestesia);
    const [medicacionClicked, setMedicacionClicked] = useState(false);

    const deleteIconClickHandler = () => {
        setRenderRow(!renderRow);
        eliminarFila(id);
    };

    const medicacionIconClickHandler = () => {
        setMedicacionClicked(!medicacionClicked);
    };

    const changeHandler = (e, setValue, actualizarValue) => {
        const idValue = {
            value: e.target.value,
            idEstudio: id,
        };
        const obj = Object.create(idValue);
        const parsedValue = parseFloat(e.target.value);
        if (parsedValue <= 0 || isNaN(parsedValue)) {
            setValue(0);
        } else {
            setValue(e.target.value);
        }
        actualizarValue(obj);
    };

    const isMedicacionActive = medicacionClicked ? 'active' : '';

    return (
        renderRow && (
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
                      onChange={ e => changeHandler(e, setNroOrden, actualizarNroDeOrden) }
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
                      value={ parseFloat(importe, 10) }
                      onChange={ e => changeHandler(e, setImporte, actualizarImporte) }
                    />
                </td>
                <td>
                    <input
                      value={ parseFloat(pensionValue, 10) }
                      onChange={ e => changeHandler(e, setPension, actualizarPension) }
                    />
                </td>
                <td>
                    <input
                      value={ parseFloat(difPaciente, 10) }
                      onChange={ e => changeHandler(e, setDifPaciente, actualizarDifPaciente) }
                    />
                </td>
                <td className='td-medicacion'>
                    <div>{ parseFloat(medicacion, 10) }</div>
                </td>
                <td>
                    <input
                      value={ parseFloat(anestesista, 10) }
                      onChange={ e => changeHandler(e, setAnestesista, actualizarAnestesista) }
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
        )
    );
}

const { object } = PropTypes;

NuevaPresentacionObraSocialTableRow.propTypes = {
    row: object.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        actualizarNroDeOrden: idValue =>
            dispatch({
                type: ACTUALIZAR_NRO_DE_ORDEN, idValue,
            }),
        actualizarImporte: idValue =>
            dispatch({
                type: ACTUALIZAR_IMPORTE, idValue,
            }),
        actualizarPension: idValue =>
            dispatch({
                type: ACTUALIZAR_PENSION, idValue,
            }),
        actualizarDifPaciente: idValue =>
            dispatch({
                type: ACTUALIZAR_DIF_PACIENTE, idValue,
            }),
        actualizarAnestesista: idValue =>
            dispatch({
                type: ACTUALIZAR_ANESTESISTA, idValue,
            }),
        eliminarFila: id =>
            dispatch({
                type: ELIMINAR_FILA, id,
            }),
    };
}

export default connect(null, mapDispatchToProps)(NuevaPresentacionObraSocialTableRow);
