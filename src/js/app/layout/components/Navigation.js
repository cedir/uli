import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Navigation extends Component {
    constructor(props) {
        super(props);

        this.activeRoute = this.activeRoute.bind(this);
        this.secondLevelActive = this.secondLevelActive.bind(this);
    }

    componentDidMount() {
        $('#side-menu').metisMenu();
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
                        <a href='/home'><i className='fa fa-th-large' />
                            <span className='nav-label'>Pagina Principal</span>
                        </a>
                    </li>
                    <li className={ this.activeRoute('/estudios') }>
                        <a href='/estudios'><i className='fa fa-heartbeat' />
                            <span className='nav-label'>Estudios</span>
                        </a>
                    </li>
                    <li className={ this.activeRoute('/anestesistas/pago') }>
                        <a href='/anestesistas/pago'>
                            <i className='fa fa-heartbeat' />
                            <span className='nav-label'>Pago Anestesista</span>
                        </a>
                    </li>
                    <li className={ this.activeRoute('/presentaciones-obras-sociales') }>
                        <a href='/presentaciones-obras-sociales'>
                            <i className='fa fa-heartbeat' />
                            <span className='nav-label'>Presentaciones</span>
                        </a>
                    </li>
                    <li className={ this.activeRoute('/caja/main') }>
                        <a href='/caja/main'>
                            <i className='fa fa-heartbeat' />
                            <span className='nav-label'>Caja</span>
                        </a>
                    </li>
                    <li className={ this.activeRoute('/listado-informe-comprobantes') }>
                        <a href='/listado-informe-comprobantes'>
                            <i className='fa fa-heartbeat' />
                            <span className='nav-label'>Comprobantes</span>
                        </a>
                    </li>
                    <li className={ this.activeRoute('/medicos/pago') }>
                        <a href='/medicos/pago'>
                            <i className='fa fa-heartbeat' />
                            <span className='nav-label'>Pago Medicos</span>
                        </a>
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
