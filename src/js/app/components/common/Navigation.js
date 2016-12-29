import React, { Component, PropTypes } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router';
import { Login } from './Login';

class Navigation extends Component {

    componentDidMount() {
        const { menu } = this.refs;
        $(menu).metisMenu();
    }

    activeRoute(routeName) {
        return this.props.location.pathname.endsWith(routeName) ? "active" : "";
    }

    secondLevelActive(routeName) {
        return this.props.location.pathname.endsWith(routeName) ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
    }

    render() {
        return (
            <nav className="navbar-default navbar-static-side" role="navigation">
                <ul className="nav metismenu" id="side-menu" ref="menu">
                    <li className="nav-header">
                        <Login/>
                        <div className="logo-element">
                            Uli
                        </div>
                    </li>
                    <li className={this.activeRoute("/")}>
                        <Link to="/"><i className="fa fa-th-large" /> <span className="nav-label">Pagina Principal</span></Link>
                    </li>
                    <li className={this.activeRoute("/page1")}>
                        <Link to="/page1"><i className="fa fa-user-md" /> <span className="nav-label">Página 1</span></Link>
                    </li>
                </ul>

            </nav>
        );
    }
}

Navigation.propTypes = {
    location: PropTypes.object
};

export default Navigation;