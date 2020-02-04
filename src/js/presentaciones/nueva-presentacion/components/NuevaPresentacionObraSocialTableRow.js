import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from './Input';
import { ModalEliminarFila, ModalAnestesia, ModalMedicacion } from './Modals';

/* eslint-disable no-unused-vars */

function useInputState(props) {
    const [newValue, setValue] = useState(props);
    const changeHandler = (e) => {
        if (e.target.value > 0) {
            setValue(parseFloat(e.target.value, 10));
        } else {
            setValue(0.00);
        }
    };

    return {
        newValue,
        changeHandler,
    };
}

export function NuevaPresentacionObraSocialTableRow(props) {
    const [deleteClicked, setDeleteClicked] = useState(false);
    const [renderRow, setRenderRow] = useState(true);
    const [medicacionClicked, setMedicacionClicked] = useState(false);
    const [anestesiaClicked, setAnestesiaClicked] = useState(false);

    const deleteIconClickHandler = () => {
        setDeleteClicked(!deleteClicked);
    };

    const deleteRowHandler = () => {
        setRenderRow(!renderRow);
    };

    const medicacionIconClickHandler = () => {
        setMedicacionClicked(!medicacionClicked);
    };

    const anestesiaIconClickHandler = () => {
        setAnestesiaClicked(!anestesiaClicked);
    };

    const { row, onKeyUp } = props;
    const {
        id, fecha, nro_de_orden: orden,
        paciente, practica, medico,
        importe_estudio: importe,
        pension, diferencia_paciente: difPaciente,
        importe_medicacion: medicacion,
        arancel_anestesia: anestesista,
    } = row;

    const inputOne = useInputState(parseFloat(importe, 10));
    const inputTwo = useInputState(parseFloat(pension, 10));
    const inputThree = useInputState(parseFloat(difPaciente, 10));
    const inputFour = useInputState(parseFloat(anestesista, 10));

    const rowCalculations =
    parseFloat(inputOne.newValue, 10) +
    parseFloat(inputTwo.newValue, 10) +
    parseFloat(inputThree.newValue, 10) +
    parseFloat(inputFour.newValue, 10);

    const isDeleteActive = deleteClicked ? '-active' : '';
    const isMedicacionActive = medicacionClicked ? 'active' : '';
    const isAnestesiaActive = anestesiaClicked ? 'active' : '';
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
                    <i
                      className={ `fa fa-plus-circle fa-1x ${isAnestesiaActive}` }
                      tabIndex='0'
                      role='button'
                      onClick={ anestesiaIconClickHandler }
                    />
                </td>
                <td className='numero'>{ id }</td>
                <td>{ fecha }</td>
                <td>{ orden }
                    <input type='number' />
                </td>
                <td>{ paciente.id }</td>
                <td>{ `${paciente.nombre} ${paciente.apellido}` }</td>
                <td className='practica'>{ practica.descripcion }</td>
                <td>{ `${medico.nombre} ${medico.apellido}` }</td>
                <td>
                    <Input
                      className='importe-input'
                      onKeyUp={ onKeyUp }
                      value={ parseFloat(inputOne.newValue, 10) }
                      onChange={ inputOne.changeHandler }
                    />
                </td>
                <td>
                    <Input
                      className='pension-input'
                      onKeyUp={ onKeyUp }
                      value={ parseFloat(inputTwo.newValue, 10) }
                      onChange={ inputTwo.changeHandler }
                    />
                </td>
                <td>
                    <Input
                      className='difpaciente-input'
                      onKeyUp={ onKeyUp }
                      value={ parseFloat(inputThree.newValue, 10) }
                      onChange={ inputThree.changeHandler }
                    />
                </td>
                <td className='td-medicacion'>
                    <div>{ medicacion }</div>
                </td>
                <td>
                    <Input
                      className='anestesista-input'
                      onKeyUp={ onKeyUp }
                      value={ parseFloat(inputFour.newValue, 10) }
                      onChange={ inputFour.changeHandler }
                    />
                </td>
                <td className='delete'>
                    <i
                      className={ `fa fa-trash trash-icon${isDeleteActive}` }
                      tabIndex='0'
                      role='button'
                      onClick={ deleteIconClickHandler }
                    />
                </td>
                <td style={ { display: 'none' } }>{ String(rowCalculations) }</td>
                <td style={ { display: 'none' } }>
                    <ModalEliminarFila
                      show={ deleteClicked }
                      onClickClose={ deleteIconClickHandler }
                      onClickEliminar={ deleteRowHandler }
                      nroFila={ id }
                    />
                    <ModalAnestesia
                      show={ anestesiaClicked }
                      onClickClose={ anestesiaIconClickHandler }
                    />
                    <ModalMedicacion
                      show={ medicacionClicked }
                      onClickClose={ medicacionIconClickHandler }
                    />
                </td>
            </tr>
        )
    );
}

const { object, string, func } = PropTypes;

NuevaPresentacionObraSocialTableRow.propTypes = {
    row: object.isRequired,
    onKeyUp: func.isRequired,
};

useInputState.propTypes = {
    value: string.isRequired,
};
