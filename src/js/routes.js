import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './app/layout/Layout';
import HomePage from './app/home/HomePage';
import EstudiosPage from './app/estudios/EstudiosPage';
import PagoAnestesistaPage from './app/pagoAnestesista/PagoAnestesistaPage';

export default (
    <Route path="/" component={Layout}>
        <IndexRoute component={HomePage}/>
        <Route path="/estudios" component={EstudiosPage}/>
        <Route path="/anestesistas/pago" component={PagoAnestesistaPage}/>
    </Route>
);

