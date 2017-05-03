import React, { Component, PropTypes } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router';
import { Login } from './Login';

class Navigation extends Component {

    // componentDidMount() {
    //     $('#side-menu').metisMenu();
    // }

    activeRoute(routeName) {
        return this.props.location.pathname.endsWith(routeName) ? "active" : "";
    }

    secondLevelActive(routeName) {
        return this.props.location.pathname.endsWith(routeName) ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
    }

    render() {
        return (
            <nav className="navbar-default navbar-static-side" role="navigation">
                <ul className="nav metismenu" id="side-menu">
                    <li className="nav-header">
                        <Login/>
                        <div className="logo-element">
                            Uli
                        </div>
                    </li>
                    <li className={this.activeRoute("/")}>
                        <Link to="/"><i className="fa fa-th-large" /> <span className="nav-label">Pagina Principal</span></Link>
                    </li>
                    <li className={this.activeRoute("/estudios")}>
                        <Link to="/estudios"><i className="fa fa-heartbeat" /> <span className="nav-label">Estudios</span></Link>
                    </li>
                    <li className={this.activeRoute("/anestesistas/pago")}>
                        <Link to="/anestesistas/pago"><i className="fa fa-heartbeat" /> <span className="nav-label">Pago Anestesista</span></Link>
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