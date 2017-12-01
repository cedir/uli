import React from 'react';
import EstudiosDelDia from './components/EstudiosDelDia';

const EstudiosPagePre = props => (
    <div>
        <EstudiosDelDia history={ props.history } />
    </div>
);

const { object } = React.PropTypes;

EstudiosPagePre.propTypes = {
    history: object,
};

export default EstudiosPagePre;

