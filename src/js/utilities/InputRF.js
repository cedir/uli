import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl }
    from 'react-bootstrap';

class InputRF extends React.Component {
    render() {
        const {
            input,
            label,
            type,
            meta: { error, warning, touched },
            staticField,
            hideLabel,
            selectOptions,
            // in case of options being an object, use this value to
            // point the property value to be assigned to select value.
            selectionValue,
            // format the option to display in the select list
            renderOptionHandler,
            // custom error msg to be displayed insted of the validation error
            customErrorMsg,
            // this is the key to be used for tracking repeated options
            optionKey,
            ...props
        } = this.props;
        let { componentClass } = this.props;
        let message;
        const validationState = (touched && (error && 'error')) || (warning && 'warning') || null;

        // let componentClass;
        if (type === 'textarea') {
            componentClass = type;
        }
        // if custom error msg was provided, use it
        if (touched && (error || warning)) {
            message = (
                <span className='help-block'>
                    { customErrorMsg || error || warning }
                </span>
            );
        }
        // This component can be used a simple input, a text area or a select
        return (
            <FormGroup validationState={ validationState }>
                { !hideLabel && <ControlLabel>{ label }</ControlLabel> }
                { !staticField && componentClass !== 'select' && <FormControl
                  { ...input }
                  type={ type }
                  componentClass={ componentClass }
                  { ...props }
                />
                }
                { !staticField && componentClass === 'select' && <FormControl
                  { ...input }
                  type={ type }
                  componentClass={ componentClass }
                  { ...props }
                >
                    { componentClass === 'select' && selectOptions &&
                    (() => {
                        const options = selectOptions.map((o) => {
                            let optionDisplay;
                            if (typeof renderOptionHandler === 'function') {
                                optionDisplay = renderOptionHandler(o);
                            } else {
                                optionDisplay = o;
                            }
                            const key = o[optionKey] || o;
                            const value = (selectionValue && o[selectionValue])
                                || o;
                            return (
                                <option key={ key } value={ value }>{optionDisplay}</option>
                            );
                        });
                        options.unshift(<option key={ '--' } value={ null }>--</option>);
                        return options;
                    })()
                    }
                </FormControl>
                }
                { staticField && <FormControl.Static
                  style={ { color: 'grey', cursor: 'not-allowed' } }
                  type={ type }
                >
                    { input.value }
                </FormControl.Static>
                }
                { message }
            </FormGroup>
        );
    }
}

const { object, string, bool, array, func } = PropTypes;

InputRF.propTypes = {
    input: object,
    label: string,
    type: string,
    meta: object,
    staticField: bool,
    hideLabel: bool,
    componentClass: string,
    selectOptions: array,
    selectionValue: string,
    renderOptionHandler: func,
    customErrorMsg: string,
    optionKey: string,
};

export default InputRF;
