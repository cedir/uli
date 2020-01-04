import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SEND_NOTA_DE_CREDITO_ASOCIADA } from '../actionTypes';

function ImporteForm({ idComprobante, crear_nota_de_credito_asociada }) {
    const handleSave = (event) => {
        event.preventDefault();
        crear_nota_de_credito_asociada(idComprobante, event.target.importe.value);
    };

    return (
        <form onSubmit={ handleSave }>
            <div className='form-group'>
                <label htmlFor='importe'>Importe</label>
                <div className='field'>
                    <input
                      type='text'
                      name='importe'
                      className='form-control'
                      placeholder='Importe'
                    />
                </div>
            </div>
            <button type='submit' className='btn btn-primary'>
                Crear Nota de credito asociada
            </button>
        </form>
    );
}

ImporteForm.propTypes = {
    idComprobante: PropTypes.number.isRequired,
    crear_nota_de_credito_asociada: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        crear_nota_de_credito_asociada: (idComp, importe) =>
            dispatch({ type: SEND_NOTA_DE_CREDITO_ASOCIADA, idComp, importe }),
    };
}

export default connect(null, mapDispatchToProps)(ImporteForm);
