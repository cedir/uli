import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SEND_NOTA_DE_CREDITO_ASOCIADA } from '../actionTypes';

function ImporteForm({ idComprobante, crear_nota_de_credito_asociada, setShowImporteModal }) {
    const [saving, setSaving] = useState(false);

    const handleSave = (event) => {
        event.preventDefault();
        setSaving(true);
        crear_nota_de_credito_asociada(
            idComprobante,
            event.target.importe.value,
            setShowImporteModal,
        );
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
            <button type='submit' disabled={ saving } className='btn btn-primary'>
                { saving ? 'Creando nota de credito asociada...' : 'Crear Nota de credito asociada' }
            </button>
        </form>
    );
}

ImporteForm.propTypes = {
    idComprobante: PropTypes.number.isRequired,
    crear_nota_de_credito_asociada: PropTypes.func.isRequired,
    setShowImporteModal: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        crear_nota_de_credito_asociada: (idComp, importe, mostrarModal) =>
            dispatch({ type: SEND_NOTA_DE_CREDITO_ASOCIADA, idComp, importe, mostrarModal }),
    };
}

export default connect(null, mapDispatchToProps)(ImporteForm);
