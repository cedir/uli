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
            ...props
        } = this.props;

        let message;
        const validationState = (touched && (error && 'error')) || (warning && 'warning') || null;

        let componentClass;
        if (type === 'textarea') {
            componentClass = type;
        }

        if (touched && (error || warning)) {
            message = <span className='help-block'>{ error || warning }</span>;
        }

        return (
            <FormGroup validationState={ validationState }>
                <ControlLabel>{ label }</ControlLabel>
                { !staticField && <FormControl
                  { ...input }
                  type={ type }
                  componentClass={ componentClass }
                  { ...props }
                />
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

const { object, string, bool } = PropTypes;

InputRF.propTypes = {
    input: object,
    label: string,
    type: string,
    meta: object,
    staticField: bool,
};

export default InputRF;
