import React from 'react';

function handleSave(event) {
    event.preventDefault();
}

function ImporteForm() {
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

export default ImporteForm;
