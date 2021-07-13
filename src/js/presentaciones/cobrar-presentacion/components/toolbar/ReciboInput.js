import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, InputGroup, Button, FormControl } from 'react-bootstrap';

function ReciboInput({ nroRecibo, setNroRecibo }) {
    const styles = {
        inlineForm: { marginTop: '.5rem' },
        formGroup: { marginLeft: '1rem', marginTop: '2rem' },
    };
    return (
        <span className='form-inline' style={ styles.inlineForm }>
            <FormGroup style={ styles.formGroup }>
                <InputGroup>
                    <InputGroup.Button>
                        <Button>Nro. de recibo:</Button>
                    </InputGroup.Button>
                    <FormControl
                      type='text'
                      value={ nroRecibo }
                      name='recibo'
                      onChange={ e => setNroRecibo(e.target.value) }
                    />
                </InputGroup>
            </FormGroup>
        </span>
    );
}

const { string, func } = PropTypes;

ReciboInput.propTypes = {
    nroRecibo: string.isRequired,
    setNroRecibo: func.isRequired,
};

export default ReciboInput;
