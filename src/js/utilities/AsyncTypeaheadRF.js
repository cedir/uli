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
                <AsyncTypeahead
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

AsyncTypeaheadRF.propTypes = {
    input: object,
    label: string,
    type: string,
    meta: object,
};

export default AsyncTypeaheadRF;
