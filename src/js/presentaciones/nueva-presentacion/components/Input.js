import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export function Input(props) {
    const { value, className, onKeyUp, onChange } = props;
    const [required, setRequired] = useState(false);
    useEffect(() => {
        if (value === 0) {
            setRequired(true);
        } else {
            setRequired(false);
        }
    });
    const isRequired = required ? ' required' : '';
    return (
        <input
          type='number'
          className={ ` ${className}${isRequired} ` }
          onChange={ onChange }
          value={ value }
          onKeyUp={ onKeyUp }
        />
    );
}


const { func, string, number } = PropTypes;

Input.propTypes = {
    className: string.isRequired,
    onKeyUp: func.isRequired,
    onChange: func.isRequired,
    value: number.isRequired,
};
