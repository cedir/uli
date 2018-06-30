import React, { PropTypes } from 'react';
import { FormGroup, ControlLabel }
    from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

class AsyncTypeaheadRF extends React.Component {
    render() {
        const {
            input,
            label,
            type,
            meta: { error, warning, pristine },
            staticField,
            ...props
        } = this.props;

        let message;
        const validationState = (!pristine && (error && 'error')) || (warning && 'warning') || null;

        if (!pristine && (error || warning)) {
            message = <span className='help-block'>{ error || warning }</span>;
        }

        const inputProps = { name: input.name };
        return (
            <FormGroup validationState={ validationState }>
                <ControlLabel>{ label }</ControlLabel>
                <AsyncTypeahead
                  inputProps={ inputProps }
                  onChange={ input.onChange }
                  disabled={ staticField }
                  { ...props }
                />
                { message }
            </FormGroup>
        );
    }
}

const { object, string, bool } = PropTypes;

AsyncTypeaheadRF.propTypes = {
    input: object,
    label: string,
    type: string,
    meta: object,
    staticField: bool,
};

export default AsyncTypeaheadRF;
