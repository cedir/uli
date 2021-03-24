import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
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
import CreateEstudio from '../estudio/components/CreateEstudio';
import PagoMedicos from '../estudio/components/PagoMedicos';
import PresentacionesObraSocialPage from '../presentaciones/components/PresentacionesObraSocialPage';
import CobrarPresentacionPage from '../presentaciones/cobrar-presentacion/components/CobrarPresentacionPage';
import NuevaPresentacionPage from '../presentaciones/nueva-presentacion/components/NuevaPresentacionPage';
import ModificarPresentacionPage from '../presentaciones/modificar-presentacion/components/ModificarPresentacionPage';
import ListadoInformeComprobantes from '../comprobantes/components/ListadoInformeComprobantes';
import CajaMain from '../caja/components/CajaMain';
import Comprobantes from '../comprobantes/components/Comprobantes';
import CreateComprobante from '../comprobantes/components/crear-comprobante/CreateComprobante';
import CreateCajaForm from '../caja/components/create/CreateCajaForm';
import AlertComponent from '../utilities/components/alert/AlertComponent';
import './app.css';
import ScriptCrearEstudios from '../utilities/components/ScriptCrearEstudios';
import ComprobanteHandler from '../comprobantes/components/crear-comprobante/ComprobanteHandler';

function App(props) {
    useEffect(() => {
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
    });

    const inLoginPage = () => {
        const path = props.location.pathname;
        return path === '/login';
    };

    const wrapperClass = inLoginPage() ? '' : `gray-bg ${props.location.pathname}`;

    return (
        <div id='wrapper'>
            <ConditionalComponent
              component={ Navigation }
              display={ !inLoginPage() }
              location={ props.location }
            />
            <div id={ inLoginPage() ? 'login' : 'page-wrapper' } className={ wrapperClass }>
                <div className='components-wrapper'>
                    <ConditionalComponent
                      component={ Header }
                      display={ !inLoginPage() }
                      history={ props.history }
                    />
                    <PrivateRoute
                      exact
                      path='/'
                      component={ HomePage }
                      authenticated={ !!props.token }
                    />
                    <PrivateRoute
                      path='/home'
                      component={ HomePage }
                      authenticated={ !!props.token }
                    />
                    <PrivateRoute
                      exact
                      path='/estudios'
                      component={ EstudiosPage }
                      authenticated={ !!props.token }
                    />
                    <PrivateRoute
                      exact
                      path='/estudios/detail/:id'
                      component={ EstudioDetailPage }
                      authenticated={ !!props.token }
                    />
                    <PrivateRoute
                      exact
                      path='/estudios/detail/:id/:seccion'
                      component={ EstudioDetailPage }
                      authenticated={ !!props.token }
                    />
                    <PrivateRoute
                      exact
                      path='/estudios/create'
                      component={ CreateEstudio }
                      authenticated={ !!props.token }
                    />
                    <PrivateRoute
                      path='/anestesistas/pago'
                      component={ PagoAnestesistaPage }
                      authenticated={ !!props.token }
                    />
                    <PrivateRoute
                      exact
                      path='/presentaciones-obras-sociales'
                      component={ PresentacionesObraSocialPage }
                      authenticated={ !!props.token }
                    />
                    <PrivateRoute
                      exact
                      path='/presentaciones-obras-sociales/nueva-presentacion'
                      component={ NuevaPresentacionPage }
                      authenticated={ !!props.token }
                    />
                    <PrivateRoute
                      exact
                      path='/presentaciones-obras-sociales/modificar-presentacion-abierta'
                      component={ ModificarPresentacionPage }
                      authenticated={ !!props.token }
                    />
                    <PrivateRoute
                      exact
                      path='/presentaciones-obras-sociales/cobrar-presentacion/:id'
                      component={ CobrarPresentacionPage }
                      authenticated={ !!props.token }
                    />
                    <PrivateRoute
                      exact
                      path='/comprobantes'
                      component={ Comprobantes }
                      authenticated={ !!props.token }
                    />
                    <PrivateRoute
                      exact
                      path='/comprobantes/create'
                      component={ ComprobanteHandler }
                      authenticated={ !!props.token }
                    />
                    <PrivateRoute
                      exact
                      path='/comprobantes/detail/:id'
                      component={ ComprobanteHandler }
                      authenticated={ !!props.token }
                    />
                    <PrivateRoute
                      path='/caja/main'
                      component={ CajaMain }
                      authenticated={ !!props.token }
                    />
                    <PrivateRoute
                      path='/caja/create'
                      component={ CreateCajaForm }
                      authenticated={ !!props.token }
                    />
                    <PrivateRoute
                      path='/listado-informe-comprobantes'
                      component={ ListadoInformeComprobantes }
                      authenticated={ !!props.token }
                    />
                    <PrivateRoute
                      path='/medicos/pago'
                      component={ PagoMedicos }
                      authenticated={ !!props.token }
                    />
                    {/* para crear estudios rapidamente */}
                    <PrivateRoute
                      path='/script-crear-estudios'
                      component={ ScriptCrearEstudios }
                      authenticated={ !!props.token }
                    />
                </div>
                <Route path='/login' component={ Login } />
                <Footer />
                <AlertComponent />
            </div>
        </div>
    );
}

const { object, string } = PropTypes;

App.propTypes = {
    location: object,
    history: object,
    token: string,
};

const mapStateToProps = state => ({
    token: state.login.token,
});

export default connect(mapStateToProps)(App);
