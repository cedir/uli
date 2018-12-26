import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Checkbox }
    from 'react-bootstrap';

class CheckboxRF extends Component {
    render() {
        const {
            input,
            label,
            type,
            meta: { error, warning, touched },
            staticField,
            ...props
        } = this.props;
        let message;
        const validationState = (touched && (error && 'error')) || (warning && 'warning') || null;

        // if custom error msg was provided, use it
        if (touched && (error || warning)) {
            message = (
                <span className='help-block'>
                    { error || warning }
                </span>
            );
        }
        // This component can be used a simple input, a text area or a select
        return (
            <FormGroup validationState={ validationState }>
                { !staticField && <Checkbox
                  { ...input }
                  { ...props }
                >{ label }</Checkbox>
                }
                { message }
            </FormGroup>
        );
    }
}

const { object, string, bool } = PropTypes;

CheckboxRF.propTypes = {
    input: object,
    label: string,
    type: string,
    meta: object,
    staticField: bool,
};

export default CheckboxRF;
