import React from 'react';
import PropTypes from 'prop-types';
import EstudiosDelDia from './components/EstudiosDelDia';

function EstudiosPagePre({ history, location }) {
    const { fromCaja = false } = location.state || {};
    return (
        <div>
            <EstudiosDelDia
              history={ history }
              fromCaja={ fromCaja }
            />
        </div>
    );
}

const { object } = PropTypes;

EstudiosPagePre.propTypes = {
    history: object,
    location: object,
};

export default EstudiosPagePre;

