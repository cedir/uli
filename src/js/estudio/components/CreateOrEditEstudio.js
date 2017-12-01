import React from 'react';
import CreateOrEditEstudioForm from './CreateOrEditEstudioForm';


const CreateOrEditEstudio = props => (
    <div>
        <h1>{ `${props.match.params.mode} estudio` }</h1>
        <CreateOrEditEstudioForm mode={ props.match.params.mode } />
    </div>
);

const { object } = React.PropTypes;

CreateOrEditEstudio.propTypes = {
    match: object.isRequired,
};

export default CreateOrEditEstudio;
