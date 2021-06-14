import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap/dist/react-bootstrap';
import { LOGOUT } from '../../../login/actionTypes';
import { getSucursal } from '../../storeHelper';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
    }

    componentWillMount() {
        if (!this.props.token) {
            this.props.history.push('/login');
        }
    }

    getNombreSucursal() {
        if (getSucursal() === 2) {
            return 'Hospital Italiano';
        }
        return 'C.E.Di.R';
    }

    logout() {
        this.props.logout();
    }

    render() {
        return (
            <div className='row border-bottom'>
                <nav className='navbar navbar-static-top white-bg' style={ { marginBottom: 0 } }>
                    <div className='navbar-header'>
                        <a
                          className='navbar-minimalize minimalize-styl-2 btn btn-primary'
                          href='#'
                        >
                            <i className='fa fa-bars' />
                        </a>
                    </div>
                    <ul className='nav navbar-top-links navbar-right'>
                        <span>{ this.getNombreSucursal() }</span>
                        <li>
                            <Button bsStyle='link' onClick={ this.logout }>
                                <i className='fa fa-sign-out' /> Log out
                            </Button>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

const { string, object, func } = PropTypes;

Header.propTypes = {
    token: string,
    history: object,
    logout: func,
};

const mapActionsToProps = dispatch => (
    {
        logout: () => dispatch({ type: LOGOUT }),
    }
);

const mapStateToProps = state => ({
    token: state.login.token,
});

export default connect(mapStateToProps, mapActionsToProps)(Header);
