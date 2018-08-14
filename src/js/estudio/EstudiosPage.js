import React from 'react';
import PropTypes from 'prop-types';
import EstudiosDelDia from './components/EstudiosDelDia';

const EstudiosPagePre = props => (
    <div>
        <EstudiosDelDia history={ props.history } />
    </div>
);

const { object } = PropTypes;

EstudiosPagePre.propTypes = {
    history: object,
};

export default EstudiosPagePre;

