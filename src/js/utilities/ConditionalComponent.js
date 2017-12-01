import React, { PropTypes } from 'react';

const ConditionalComponent = (props) => {
    if (props.display) {
        const newProps = {};
        Object.assign(newProps, props);
        delete newProps.component;
        delete newProps.display;
        return React.createElement(props.component, newProps);
    }

    return null;
};

ConditionalComponent.propTypes = {
    display: PropTypes.bool,
    component: PropTypes.func,
};

export default ConditionalComponent;
