import React, { PropTypes } from 'react';

const ConditionalComponent = (props) => {
    if (props.display) {
        return React.createElement(props.component, props);
    }

    return null;
};

ConditionalComponent.propTypes = {
    display: PropTypes.bool,
    component: PropTypes.func,
};

export default ConditionalComponent;
