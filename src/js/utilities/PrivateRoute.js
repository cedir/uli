import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends React.Component {
    constructor(props) {
        super(props);

        this.renderComponentOrGoToLogin = this.renderComponentOrGoToLogin.bind(this);
    }

    renderComponentOrGoToLogin(renderProps) {
        return this.props.authenticated ? (
            React.createElement(this.props.component, renderProps)
        ) : (
            <Redirect
              to={ { pathname: '/login', state: { from: renderProps.location } } }
            />
        );
    }

    render() {
        return (
            <Route
              exact={ this.props.exact }
              path={ this.props.path }
              render={ this.renderComponentOrGoToLogin }
            />
        );
    }
}

const { bool, string, func } = PropTypes;

PrivateRoute.propTypes = {
    component: func.isRequired,
    exact: bool,
    path: string.isRequired,
    authenticated: bool,
};

export default PrivateRoute;
