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
            staticField,
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
                { !staticField && <FormControl
                  { ...input }
                  type={ type }
                  { ...props }
                />
                }
                { staticField && <FormControl.Static
                  style={ { color: 'grey' } }
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

const { object, string, bool } = PropTypes;

InputRF.propTypes = {
    input: object,
    label: string,
    type: string,
    meta: object,
    staticField: bool,
};

export default InputRF;
