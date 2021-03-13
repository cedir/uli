import React from 'react';
import PropTypes from 'prop-types';
import EstudiosDelDia from './components/EstudiosDelDia';

function EstudiosPagePre({ history, location }) {
    let state = location.state;
    state = state || { fromCaja: false };
    return (
        <div>
            <EstudiosDelDia
              history={ history }
              fromCaja={ state.fromCaja }
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

