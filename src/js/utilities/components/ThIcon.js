import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ThArrow({ Icons, nameCol, fieldCol, sort }) {
    const [idIcon, setIdIcon] = useState(0);
    const [Icon, setIcon] = useState(Icons[idIcon]);
    const getOrderingField = () => {
        switch (idIcon) {
            case 0: return '';
            case 1: return fieldCol;
            default: return `-${fieldCol}`;
        }
    };
    return (
        <th
          style={ { cursor: 'pointer' } }
          onClick={ () => {
              setIdIcon((idIcon + 1) % Icons.length);
              setIcon(Icons[idIcon]);
              sort(getOrderingField());
          } }
        >
            {nameCol}
            <Icon style={ { position: 'absolute' } } />
        </th>
    );
}

const { array, func, string } = PropTypes;

ThArrow.propTypes = {
    Icons: array.isRequired,
    nameCol: string.isRequired,
    fieldCol: string.isRequired,
    sort: func.isRequired,
};

export default ThArrow;
