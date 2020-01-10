import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TableRowInput from '../low-order-components/TableRowInput';

function NuevaPresentacionObraSocialTableRow({ row, parentUpdate }) {
    const [deleteClicked, setDeleteClicked] = useState(false);
    const [renderRow, setRenderRow] = useState(true);
    const [medicacionClicked, setMedicacionClicked] = useState(false);
    const [anestesiaClicked, setAnestesiaClicked] = useState(false);

    const deleteIconClickHandler = () => {
        setDeleteClicked(!deleteClicked);
    };

    const medicacionIconClickHandler = () => {
        setMedicacionClicked(!medicacionClicked);
    };

    const anestesiaIconClickHandler = () => {
        setAnestesiaClicked(!anestesiaClicked);
    };

    const {
        numero, fecha, orden, numero_de_afiliado: numeroAfiliado, paciente,
        practica, actuante, importe, pension,
        diferencia_paciente: diferenciaPaciente, medicacion, anestesista,
    } = row;
    const isDeleteActive = deleteClicked ? '-active' : '';
    const isMedicacionActive = medicacionClicked ? 'active' : '';
    const isAnestesiaActive = anestesiaClicked ? 'active' : '';

    return (
        renderRow && (
            <tr className='table-row' key={ numero }>
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
                <td className='numero'>{ numero }</td>
                <td>{ fecha }</td>
                <td>
                    <input type='text' placeholder={ orden } />
                </td>
                <td>{ numeroAfiliado }</td>
                <td>{ paciente }</td>
                <td className='practica'>{ practica }</td>
                <td>{ actuante }</td>
                <td>
                    <TableRowInput
                      type='number'
                      className='importe-input'
                      onKeyUp={ parentUpdate }
                      placeholder={ importe }
                    />
                </td>
                <td>
                    <TableRowInput
                      type='number'
                      className='pension-input'
                      onKeyUp={ parentUpdate }
                      placeholder={ pension }
                    />
                </td>
                <td>
                    <TableRowInput
                      type='number'
                      className='difpaciente-input'
                      onKeyUp={ parentUpdate }
                      placeholder={ diferenciaPaciente }
                    />
                </td>
                <td className='td-medicacion'>
                    <div>{medicacion}</div>
                </td>
                <td>
                    <TableRowInput
                      type='number'
                      className='anestesista-input'
                      onKeyUp={ parentUpdate }
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
            </tr>
        )
    );
}

const { func, object } = PropTypes;

NuevaPresentacionObraSocialTableRow.propTypes = {
    row: object.isRequired,
    parentUpdate: func.isRequired,
};

export default NuevaPresentacionObraSocialTableRow;
