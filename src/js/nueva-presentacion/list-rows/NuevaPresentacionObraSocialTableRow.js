import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, useInputState } from '../low-order-components/Input';

export function useInputValues() {
    const inputOne = useInputState();
    const inputTwo = useInputState();
    const inputThree = useInputState();
    const inputFour = useInputState();
    return {
        inputOne,
        inputTwo,
        inputThree,
        inputFour,
    };
}

export function NuevaPresentacionObraSocialTableRow(props) {
    const [deleteClicked, setDeleteClicked] = useState(false);
    const [renderRow, setRenderRow] = useState(true);
    const [medicacionClicked, setMedicacionClicked] = useState(false);
    const [anestesiaClicked, setAnestesiaClicked] = useState(false);
    const componentState = useInputValues();
    const deleteIconClickHandler = () => {
        setDeleteClicked(!deleteClicked);
    };

    const medicacionIconClickHandler = () => {
        setMedicacionClicked(!medicacionClicked);
    };

    const anestesiaIconClickHandler = () => {
        setAnestesiaClicked(!anestesiaClicked);
    };

    const { row } = props;
    const {
        fecha, nro_de_orden: orden,
        paciente, practica, medico,
        importe_estudio: importe,
        pension, diferencia_paciente: difPaciente,
        importe_medicacion: medicacion,
        arancel_anestesista: anestesista,
    } = row;
    const isDeleteActive = deleteClicked ? '-active' : '';
    const isMedicacionActive = medicacionClicked ? 'active' : '';
    const isAnestesiaActive = anestesiaClicked ? 'active' : '';

    return (
        renderRow && (
            <tr className='table-row'>
                <td className='icon'>
                    <i
                      className={ `fas fa-pills fa-1x ${isMedicacionActive}` }
                      tabIndex='0'
                      role='button'
                      onClick={ medicacionIconClickHandler }
                    />
                    <i
                      className={ `fas fa-syringe fa-1x ${isAnestesiaActive}` }
                      tabIndex='0'
                      role='button'
                      onClick={ anestesiaIconClickHandler }
                    />
                </td>
                <td className='numero' />
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
                      inputState={ componentState.inputOne }
                      className='importe-input'
                      placeholder={ importe }
                    />
                </td>
                <td>
                    <Input
                      inputState={ componentState.inputTwo }
                      className='pension-input'
                      placeholder={ pension }
                    />
                </td>
                <td>
                    <Input
                      inputState={ componentState.inputThree }
                      className='difpaciente-input'
                      placeholder={ difPaciente }
                    />
                </td>
                <td className='td-medicacion'>
                    <div>{ medicacion }</div>
                </td>
                <td>
                    <Input
                      inputState={ componentState.inputFour }
                      className='anestesista-input'
                      placeholder={ anestesista }
                    />
                </td>
                <td>
                    <i
                      className={ `fas fa-trash fa-1x trash-icon${isDeleteActive}` }
                      tabIndex='0'
                      role='button'
                      onClick={ deleteIconClickHandler }
                    />
                </td>
                <td style={ { display: 'none' } }>
                    { componentState.inputOne.value +
                    componentState.inputTwo.value +
                    componentState.inputThree.value +
                    componentState.inputFour.value }
                </td>
            </tr>
        )
    );
}

const { object } = PropTypes;

NuevaPresentacionObraSocialTableRow.propTypes = {
    row: object.isRequired,
};
