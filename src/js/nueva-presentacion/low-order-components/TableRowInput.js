import React, { useState } from 'react';
import PropTypes from 'prop-types';


function TableRowInput({ type, className, onKeyUp, placeholder }) {
    const [value, setValue] = useState(0);

    function onChange(e) {
        const newValue = e.target.value.replace('-', '');
        if (Number(newValue) !== 0) {
            setValue(newValue);
        }
    }

    return (
        <input
          type={ type }
          className={ className }
          onKeyUp={ onKeyUp }
          placeholder={ placeholder }
          value={ value }
          onChange={ onChange }
        />
    );
}

const { string, func, number } = PropTypes;

TableRowInput.propTypes = {
    type: string.isRequired,
    className: string.isRequired,
    onKeyUp: func.isRequired,
    placeholder: number.isRequired,
};

export default TableRowInput;
