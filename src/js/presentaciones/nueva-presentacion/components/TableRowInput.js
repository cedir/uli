import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


export function useInputState() {
    cosnt [value, setValue] = useState(0);
    const onChangeHandler = (e) => {
        setValue(Number(e.target.value));
    };
    return {
        value,
        onChangeHandler,
    };
}

export function Input(props) {
    const [required, setRequired] = useState(false);
    const { inputState, placeholder, className } = props;
    useEffect(() => {
        if (inputState.value === 0) {
            setRequired(true);
        } else {
            setRequired(false);
        }
    })
    const isRequired = required ? ' required' : ''
    return (
        <input
          type='number'
          className={` ${className}${isRequired} `}
          placeholder={ placeholder }
          value={ inputState.value }
          onChange={ inputState.onChangeHandler }
        />
    );
}


const { string, number, func } = PropTypes;

TableRowInput.propTypes = {
    type: string.isRequired,
    className: string.isRequired,
    placeholder: number.isRequired,
    inputState: func.isRequired,
};

export default Input;
