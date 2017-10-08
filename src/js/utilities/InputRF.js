import React, { PropTypes } from 'react';
import { FormGroup, ControlLabel, FormControl }
    from 'react-bootstrap';

class InputRF extends React.Component {
    render() {
        const {
            input,
            label,
            type,
            meta: { error, warning, touched },
            ...props
        } = this.props;

        let message;
        const validationState = (touched && (error && 'error')) || (warning && 'warning') || null;

        if (touched && (error || warning)) {
            message = <span className='help-block'>{ error || warning }</span>;
        }

        return (
            <FormGroup validationState={ validationState }>
                <ControlLabel>{ label }</ControlLabel>
                <FormControl
                  { ...input }
                  type={ type }
                  { ...props }
                />
                { message }
            </FormGroup>
        );
    }
}

const { object, string } = PropTypes;

InputRF.propTypes = {
    input: object,
    label: string,
    type: string,
    meta: object,
};

export default InputRF;
