import React from 'react';
import PropTypes from 'prop-types';
import MenuUpDownIcon from 'mdi-react/MenuSwapIcon';
import MenuUpIcon from 'mdi-react/MenuUpIcon';
import MenuDownIcon from 'mdi-react/MenuDownIcon';
import ThIcon from '../../utilities/components/ThIcon';

function ListadoMovimientosTableHeader({ fromUpdate, sortMovimientos }) {
    const namesSort = ['Fecha Movimiento', 'Usuario', 'Tipo', 'Descripcion', 'Monto'];
    const fieldSort = ['id', 'usuario', 'tipo', 'descripcion', 'monto'];
    const columnNames = ['Monto ac.', 'Obra social', 'Practica', 'Paciente', 'Medico'];

    const Icons = [MenuUpDownIcon, MenuDownIcon, MenuUpIcon];

    const renderTh = ((name, id) => <th key={ id }>{name}</th>);

    return (
        <tr>
            {!fromUpdate && namesSort.map((name, id) => (
                <ThIcon
                  key={ id }
                  Icons={ Icons }
                  sort={ sortMovimientos }
                  nameCol={ name }
                  fieldCol={ fieldSort[id] }
                />
            ))}
            {fromUpdate && namesSort.map(renderTh)}
            {columnNames.map(renderTh)}
            {!fromUpdate && <th />}
        </tr>
    );
}

const { func, bool } = PropTypes;

ListadoMovimientosTableHeader.propTypes = {
    sortMovimientos: func,
    fromUpdate: bool,
};

export default ListadoMovimientosTableHeader;
