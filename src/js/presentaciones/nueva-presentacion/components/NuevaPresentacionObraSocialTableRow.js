import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from './Input';
import { ModalMedicacion } from './Modals';

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
    const [renderRow, setRenderRow] = useState(true);
    const [medicacionClicked, setMedicacionClicked] = useState(false);

    const deleteIconClickHandler = () => {
        setRenderRow(!renderRow);
    };


    const medicacionIconClickHandler = () => {
        setMedicacionClicked(!medicacionClicked);
    };

    const { row, onKeyUp } = props;
    const {
        fecha, nro_de_orden: orden,
        paciente, practica, medico,
        importe_estudio: importe,
        pension, diferencia_paciente: difPaciente,
        importe_medicacion: medicacion,
        arancel_anestesia: anestesista,
    } = row;

    const inputNroDeOrden = useInputState(parseInt(orden, 10));
    const inputOne = useInputState(parseFloat(importe, 10));
    const inputTwo = useInputState(parseFloat(pension, 10));
    const inputThree = useInputState(parseFloat(difPaciente, 10));
    const inputFour = useInputState(parseFloat(anestesista, 10));

    const rowCalculations =
    parseFloat(inputOne.newValue, 10) +
    parseFloat(inputTwo.newValue, 10) +
    parseFloat(inputThree.newValue, 10) +
    parseFloat(inputFour.newValue, 10);

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
                    <Input
                      className='nro-orden'
                      value={ parseInt(inputNroDeOrden.newValue, 10) }
                      onChange={ inputNroDeOrden.changeHandler }
                      onKeyUp={ onKeyUp }
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
                      className='fa fa-trash trash-icon'
                      tabIndex='0'
                      role='button'
                      onClick={ deleteIconClickHandler }
                    />
                </td>
                <td style={ { display: 'none' } }>{ String(rowCalculations) }</td>
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

const { object, string, func } = PropTypes;

NuevaPresentacionObraSocialTableRow.propTypes = {
    row: object.isRequired,
    onKeyUp: func.isRequired,
};

useInputState.propTypes = {
    value: string.isRequired,
};
