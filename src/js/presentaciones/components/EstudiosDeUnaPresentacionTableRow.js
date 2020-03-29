/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes, { array } from 'prop-types';
import DeleteIcon from 'mdi-react/DeleteIcon';
import { ModalMedicacion } from './Modals';
import { SET_IMPORTE_MEDICACION_ESTUDIO } from '../nueva-presentacion/actionTypes';
import { CLEAN_MEDICACIONES_STORE } from '../../medicacion/actionTypes';

function EstudiosDeUnaPresentacionTableRow(props) {
    const {
        estudio,
        actualizarInput,
        eliminarEstudio,
        cleanMedicacionesStore,
        setImporteMedicacionEstudio,
        medicaciones,
        index,
    } = props;
    const {
        fecha, nro_de_orden: orden,
        paciente, practica, medico,
        importe_estudio,
        pension, diferencia_paciente,
        importe_medicacion: medicacion,
        arancel_anestesia,
    } = estudio;

    const [nroOrden, setNroOrden] = useState(orden);
    const [importe, setImporte] = useState(parseFloat(importe_estudio, 10));
    const [pensionState, setPension] = useState(parseFloat(pension, 10));
    const [difPaciente, setDifPaciente] = useState(parseFloat(diferencia_paciente, 10));
    const [anestesista, setAnestesista] = useState(parseFloat(arancel_anestesia, 10));
    const [medicacionClicked, setMedicacionClicked] = useState(false);
    const [renderRow, setRenderRow] = useState(true);

    const deleteIconClickHandler = () => {
        setRenderRow(!renderRow);
        eliminarEstudio(index);
    };

    const onChangeHandler = (idInput, value) => {
        let parsedValue = parseFloat(value, 10);
        if (isNaN(parsedValue)) {
            parsedValue = 0;
        }
        actualizarInput(index, idInput, parsedValue);
        switch (idInput) {
            case 1:
                setNroOrden(value);
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

    const medicacionCloseHandler = () => {
        setMedicacionClicked(false);
        cleanMedicacionesStore();
    };

    const medicacionChargeHandler = () => {
        cleanMedicacionesStore();
        setMedicacionClicked(false);
        let total = 0;
        if (medicaciones.length > 0) {
            const reducer = (importeAcum, currentValue) => importeAcum + currentValue;
            total = medicaciones
                .map(med => parseFloat(med.importe || med.medicamento.importe))
                .reduce(reducer);
        }
        setImporteMedicacionEstudio(total, index);
    };

    const isMedicacionActive = medicacionClicked ? 'active' : '';

    return (
        <tr className='table-row'>
            <td className='icon'>
                <i
                  className={ `fa fa-plus-circle fa-1x ${isMedicacionActive}` }
                  tabIndex='0'
                  role='button'
                  onClick={ () => setMedicacionClicked(true) }
                />
            </td>
            <td className='fecha'>{ fecha }</td>
            <td>
                <input
                  type='text'
                  value={ nroOrden }
                  placeholder={ nroOrden }
                  onChange={ e => onChangeHandler(1, e.target.value) }
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
                  onChange={ e => onChangeHandler(2, e.target.value) }
                />
            </td>
            <td>
                <input
                  type='number'
                  value={ pensionState }
                  onChange={ e => onChangeHandler(3, e.target.value) }
                />
            </td>
            <td>
                <input
                  type='number'
                  value={ difPaciente }
                  onChange={ e => onChangeHandler(4, e.target.value) }
                />
            </td>
            <td className='medicacion'>
                <div>{ parseFloat(medicacion, 10).toFixed(2) }</div>
            </td>
            <td>
                <input
                  type='number'
                  value={ parseFloat(anestesista, 10) }
                  onChange={ e => onChangeHandler(5, e.target.value) }
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
                  onClickClose={ medicacionCloseHandler }
                  onClickDo={ medicacionChargeHandler }
                  estudio={ estudio }
                />
            </td>
        </tr>
    );
}

const { object, func, number } = PropTypes;

EstudiosDeUnaPresentacionTableRow.propTypes = {
    estudio: object.isRequired,
    eliminarEstudio: func.isRequired,
    index: number.isRequired,
    actualizarInput: func.isRequired,
    cleanMedicacionesStore: func.isRequired,
    setImporteMedicacionEstudio: func.isRequired,
    medicaciones: array,
};

EstudiosDeUnaPresentacionTableRow.defaultProps = {
    medicaciones: [],
};

function mapStateToProps(state) {
    return {
        medicaciones: state.medicacionReducer.medicaciones,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        cleanMedicacionesStore: () =>
            dispatch({
                type: CLEAN_MEDICACIONES_STORE,
            }),
        setImporteMedicacionEstudio: (total, index) =>
            dispatch({
                type: SET_IMPORTE_MEDICACION_ESTUDIO, total, index,
            }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EstudiosDeUnaPresentacionTableRow);
