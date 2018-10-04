import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Navigation extends Component {

    // componentDidMount() {
    //     $('#side-menu').metisMenu();
    // }
    constructor(props) {
        super(props);

        this.activeRoute = this.activeRoute.bind(this);
        this.secondLevelActive = this.secondLevelActive.bind(this);
    }

    activeRoute(routeName) {
        return this.props.location.pathname.endsWith(routeName) ? 'active' : '';
    }

    secondLevelActive(routeName) {
        return this.props.location.pathname.endsWith(routeName) ?
            'nav nav-second-level collapse in' : 'nav nav-second-level collapse';
    }

    render() {
        return (
            <nav className='navbar-default navbar-static-side'>
                <ul className='nav metismenu' id='side-menu'>
                    <li className={ this.activeRoute('/home') }>
                        <Link to='/home'><i className='fa fa-th-large' />
                            <span className='nav-label'>Pagina Principal</span>
                        </Link>
                    </li>
                    <li className={ this.activeRoute('/estudios') }>
                        <Link to='/estudios'><i className='fa fa-heartbeat' />
                            <span className='nav-label'>Estudios</span>
                        </Link>
                    </li>
                    <li className={ this.activeRoute('/anestesistas/pago') }>
                        <Link to='/anestesistas/pago'>
                            <i className='fa fa-heartbeat' />
                            <span className='nav-label'>Pago Anestesista</span>
                        </Link>
                    </li>
                    <li className={ this.activeRoute('/presentaciones-obras-sociales') }>
                        <Link to='/presentaciones-obras-sociales'>
                            <i className='fa fa-heartbeat' />
                            <span className='nav-label'>Presentaciones</span>
                        </Link>
                    </li>
                    <li className={ this.activeRoute('/listado-informe-comprobantes') }>
                        <Link to='/listado-informe-comprobantes'>
                            <i className='fa fa-heartbeat' />
                            <span className='nav-label'>Comprobantes</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        );
    }
}
const { object } = PropTypes;
Navigation.propTypes = {
    location: object,
};

export default Navigation;
