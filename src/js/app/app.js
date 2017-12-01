import React, { PropTypes } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './layout/components/Header';
import Footer from './layout/components/Footer';
import Navigation from './layout/components/Navigation';
import { correctHeight, detectBody } from './layout/Helpers';
import PrivateRoute from '../utilities/PrivateRoute';
import ConditionalComponent from '../utilities/ConditionalComponent';
import Login from '../login/components/Login';
import HomePage from '../home/HomePage';
import EstudiosPage from '../estudio/EstudiosPage';
import EstudioDetailPage from '../estudio/components/EstudioDetailPage';
import PagoAnestesistaPage from '../anestesista/PagoAnestesistaPage';
import CreateOrEditEstudio from '../estudio/components/CreateOrEditEstudio';

class App extends React.Component {

    constructor(props) {
        super(props);

        // this.isUserAuthenticated = this.isUserAuthenticated.bind(this);
        this.inLoginPage = this.inLoginPage.bind(this);
    }

    componentDidMount() {
        // Run correctHeight function on load and resize window event
        $(window).bind('load resize', () => {
            correctHeight();
            detectBody();
        });

        // Correct height of wrapper after metisMenu animation.
        $('.metismenu a').click(() => {
            setTimeout(() => {
                correctHeight();
            }, 300);
        });
    }

    inLoginPage() {
        const path = this.props.location.pathname;
        return path === '/login';
    }

    render() {
        const wrapperClass = this.inLoginPage() ? '' : `gray-bg ${this.props.location.pathname}`;
        return (
            <div id='wrapper'>
                <ConditionalComponent
                  component={ Navigation }
                  display={ !this.inLoginPage() }
                  location={ this.props.location }
                />
                <div id={ this.inLoginPage() ? 'login' : 'page-wrapper' } className={ wrapperClass }>
                    <ConditionalComponent
                      component={ Header }
                      display={ !this.inLoginPage() }
                      history={ this.props.history }
                    />
                    <PrivateRoute
                      exact
                      path='/'
                      component={ HomePage }
                      authenticated={ !!this.props.token }
                    />
                    <PrivateRoute
                      path='/home'
                      component={ HomePage }
                      authenticated={ !!this.props.token }
                    />
                    <PrivateRoute
                      exact
                      path='/estudios'
                      component={ EstudiosPage }
                      authenticated={ !!this.props.token }
                    />
                    <PrivateRoute
                      exact
                      path='/estudios/detail/:id'
                      component={ EstudioDetailPage }
                      authenticated={ !!this.props.token }
                    />
                    <PrivateRoute
                      exact
                      path='/estudios/createoredit/:mode'
                      component={ CreateOrEditEstudio }
                      authenticated={ !!this.props.token }
                    />
                    <PrivateRoute
                      path='/anestesistas/pago'
                      component={ PagoAnestesistaPage }
                      authenticated={ !!this.props.token }
                    />
                    <Route path='/login' component={ Login } />
                    <Footer />
                </div>
            </div>
        );
    }
}

App.propTypes = {
    location: PropTypes.object,
    history: PropTypes.object,
    token: PropTypes.string,
};

const mapStateToProps = state => ({
    token: state.login.token,
});

export default connect(mapStateToProps)(App);
