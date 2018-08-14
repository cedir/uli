import React from 'react';
import PropTypes from 'prop-types';

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

const { bool, func } = PropTypes;

ConditionalComponent.propTypes = {
    display: bool,
    component: func,
};

export default ConditionalComponent;
