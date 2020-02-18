import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SEND_COMPROBANTE_ASOCIADO } from '../actionTypes';

function ImporteForm({
    idComprobante,
    crear_nota_de_credito_asociada,
    setShowImporteModal,
}) {
    const [saving, setSaving] = useState(false);

    const handleSave = (event) => {
        event.preventDefault();
        setSaving(true);
        crear_nota_de_credito_asociada(
            idComprobante,
            event.target.importe.value,
            event.target.concepto.value,
            setShowImporteModal,
        );
    };

    return (
        <form onSubmit={ handleSave }>
            <div className='form-group'>
                <label htmlFor='importe'>Importe</label>
                <div className='field'>
                    <input
                      type='number'
                      name='importe'
                      className='form-control'
                      placeholder='Importe'
                      step='.01'
                    />
                </div>
            </div>
            <div className='form-group'>
                <label htmlFor='Concepto'>Concepto</label>
                <div className='field'>
                    <input
                      type='text'
                      name='concepto'
                      className='form-control'
                      placeholder='Concepto'
                    />
                </div>
            </div>
            <button type='submit' disabled={ saving } className='btn btn-primary'>
                { saving ? 'Creando comprobante asociado...' : 'Crear comprobante asociado' }
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
        crear_nota_de_credito_asociada: (idComp, importe, concepto, mostrarModal) =>
            dispatch({
                type: SEND_COMPROBANTE_ASOCIADO,
                idComp,
                importe,
                concepto,
                mostrarModal,
            }),
    };
}

export default connect(null, mapDispatchToProps)(ImporteForm);
