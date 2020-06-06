import React from 'react';
import PropTypes from 'prop-types';

function ImportesTotales(props) {
    const { estudios, gravado } = props;
    const total = estudios + ((estudios * gravado) * 0.01);
    return (
        <div className='importes-totales'>
            <div className='col'>
                <span>Estudios:</span>
                <div>{ `$${estudios.toFixed(2)}` }</div>
            </div>
            { (gravado === 0 || gravado) && (
            <div className='col gravado'>
                <span>Gravado:</span>
                <div>{ `%${gravado}` }</div>
            </div>
            )}
            { (gravado === 0 || gravado) && (
            <div className='col'>
                <span>Total:</span>
                <div>{ `$${total.toFixed(2)}` }</div>
            </div>
            )}
        </div>
    );
}

const { number } = PropTypes;

ImportesTotales.propTypes = {
    estudios: number.isRequired,
    gravado: number.isRequired,
};

export default ImportesTotales;
