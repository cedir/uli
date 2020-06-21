/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes, { array } from 'prop-types';
import { useHistory } from 'react-router';
import DeleteIcon from 'mdi-react/DeleteIcon';
import { ModalMedicacion } from './Modals';
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
    const [medicacionClicked, setMedicacionClicked] = useState(false);
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

    // const medicacionCloseHandler = () => {
    //     setMedicacionClicked(false);
    //     cleanMedicacionesStore();
    // };

    // const medicacionChargeHandler = () => {
    //     cleanMedicacionesStore();
    //     setMedicacionClicked(false);
    //     let total = 0;
    //     if (medicaciones.length > 0) {
    //         const reducer = (importeAcum, currentValue) => importeAcum + currentValue;
    //         total = medicaciones
    //             .map(med => parseFloat(med.importe || med.medicamento.importe))
    //             .reduce(reducer);
    //     }
    //     setImporteMedicacionEstudio(total, index);
    // };

    const isMedicacionActive = medicacionClicked ? 'active' : '';

    const { descripcion } = practica;
    const descripcionAbreviada = descripcion &&
        descripcion.slice(0, 8).concat(descripcion.length > 8 ? '...' : '');

    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
    return (
        <tr className='estudios-table-row'>
            <td
              className='fecha'
              onClick={ () => history.push(`/estudios/detail/${id}`) }
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
            {/* <td hidden>
                <ModalMedicacion
                  show={ medicacionClicked }
                  onClickClose={ medicacionCloseHandler }
                  onClickDo={ medicacionChargeHandler }
                  estudio={ estudio }
                />
            </td> */}
        </tr>
    );
}

const { object, func, number } = PropTypes;

EstudiosDeUnaPresentacionTableRow.propTypes = {
    estudio: object.isRequired,
    eliminarEstudio: func,
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
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EstudiosDeUnaPresentacionTableRow);
