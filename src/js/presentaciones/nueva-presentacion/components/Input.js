import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


export function useInputState() {
    const [value, setValue] = useState(0);
    const onChangeHandler = (e) => {
        if (value >= 0) {
            setValue(Number(e.target.value));
        } else {
            setValue(0);
        }
    };
    return {
        value,
        onChangeHandler,
    };
}

export function Input(props) {
    const { inputState, placeholder, className, onKeyUp } = props;
    const [required, setRequired] = useState(false);
    useEffect(() => {
        if (inputState.value === 0) {
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
          placeholder={ placeholder }
          value={ inputState.value }
          onChange={ inputState.onChangeHandler }
          onKeyUp={ onKeyUp }
        />
    );
}


const { func, string, object } = PropTypes;

Input.propTypes = {
    className: string.isRequired,
    placeholder: string.isRequired,
    inputState: object.isRequired,
    onKeyUp: func.isRequired,
};
