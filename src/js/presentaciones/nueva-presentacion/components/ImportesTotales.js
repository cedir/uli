import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable no-mixed-operators */

function ImportesTotales(props) {
    const { estudios, gravado } = props;
    const total = estudios + (estudios * gravado) / 100;
    return (
        <div className='importes-totales'>
            <div className='col'>
                <span>Estudios:</span>
                <div>{ `$${estudios}` }</div>
            </div>
            <div className='col'>
                <span>Gravado:</span>
                <div>{ `%${gravado}` }</div>
            </div>
            <div className='col'>
                <span>Total:</span>
                <div>{ `$${total}` }</div>
            </div>
        </div>
    );
}

const { number } = PropTypes;

ImportesTotales.propTypes = {
    estudios: number.isRequired,
    gravado: number.isRequired,
};

export default ImportesTotales;
