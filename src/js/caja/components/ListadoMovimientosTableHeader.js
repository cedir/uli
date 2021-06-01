import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MenuUpDownIcon from 'mdi-react/MenuSwapIcon';
import MenuUpIcon from 'mdi-react/MenuUpIcon';
import MenuDownIcon from 'mdi-react/MenuDownIcon';

function ListadoMovimientosTableHeader({ fromUpdate, sortMovimientos }) {
    const columnNames = ['Fecha Movimiento', 'Usuario', 'Tipo', 'Descripcion', 'Monto',
        'Monto ac.', 'Obra social', 'Practica', 'Paciente', 'Medico'];
    const columnField = ['id', 'usuario', 'tipo', 'descripcion', 'monto',
        'montoAcumulado', 'obraSocial', 'practica', 'paciente', 'medico'];

    const ArrowIcons = [MenuUpDownIcon, MenuDownIcon, MenuUpIcon];
    const getName = (id, name) => {
        switch (id) {
            case 0: return '';
            case 1: return name;
            default: return `-${name}`;
        }
    };

    return (
        <tr>
            {columnNames.map((column, index) => {
                const [idIcon, setIdIcon] = useState(0);
                const [Icon, setIcon] = useState(ArrowIcons[idIcon]);
                return (
                    <th
                      key={ index }
                      onClick={ () => {
                          setIdIcon((idIcon + 1) % ArrowIcons.length);
                          setIcon(ArrowIcons[idIcon]);
                          sortMovimientos(getName(idIcon, columnField[index]));
                      } }
                    >
                        {column}
                        <Icon style={ { position: 'absolute' } } />
                    </th>
                );
            })}
            {!fromUpdate && <th />}
        </tr>
    );
}

const { func, bool } = PropTypes;

ListadoMovimientosTableHeader.propTypes = {
    sortMovimientos: func.isRequired,
    fromUpdate: bool,
};

export default ListadoMovimientosTableHeader;
