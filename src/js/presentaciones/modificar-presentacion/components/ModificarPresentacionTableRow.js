/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DeleteIcon from 'mdi-react/DeleteIcon';
import { ModalMedicacion } from '../../components/Modals';
import {
    ACTUALIZAR_INPUT_ESTUDIO_DE_UNA_PRESENTACION, ELIMINAR_ESTUDIO_DE_UNA_PRESENTACION,
} from '../../actionTypes';

function ModificarPresentacionTableRow(props) {
    const {
        row, actualizarInputEstudioDeUnaPresentacion,
        index, eliminarEstudioDeUnaPresentacion,
    } = props;
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
        eliminarEstudioDeUnaPresentacion(index);
    };

    const onChangeHandler = (dispatcher) => {
        let parsedValue = parseFloat(dispatcher.payload.value, 10);
        if (isNaN(parsedValue)) {
            parsedValue = 0;
        }
        switch (dispatcher.payload.idInput) {
            case 1:
                setNroOrden(dispatcher.payload.value);
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
                        actualizarInputEstudioDeUnaPresentacion(
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
                        actualizarInputEstudioDeUnaPresentacion(
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
                        actualizarInputEstudioDeUnaPresentacion(
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
                        actualizarInputEstudioDeUnaPresentacion(
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
                        actualizarInputEstudioDeUnaPresentacion(
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
                />
            </td>
        </tr>
    );
}

ModificarPresentacionTableRow.propTypes = {
    row: PropTypes.object.isRequired,
    eliminarEstudioDeUnaPresentacion: PropTypes.func.isRequired,
    actualizarInputEstudioDeUnaPresentacion: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        actualizarInputEstudioDeUnaPresentacion: (index, idInput, value) =>
            dispatch({ type: ACTUALIZAR_INPUT_ESTUDIO_DE_UNA_PRESENTACION,
                payload: { index, idInput, value } }),
        eliminarEstudioDeUnaPresentacion: index =>
            dispatch({
                type: ELIMINAR_ESTUDIO_DE_UNA_PRESENTACION,
                payload: { index },
            }),
    };
}

export default connect(null, mapDispatchToProps)(ModificarPresentacionTableRow);
