import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './app/app';
import HomePage from './home/HomePage';
import EstudiosPage from './estudio/EstudiosPage';
import PagoAnestesistaPage from './anestesista/PagoAnestesistaPage';

export default (
    <Route path='/' component={ App }>
        <IndexRoute component={ HomePage } />
        <Route path='/estudios' component={ EstudiosPage } />
        <Route path='/anestesistas/pago' component={ PagoAnestesistaPage } />
    </Route>
);

