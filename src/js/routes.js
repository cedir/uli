import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './app/App';
import HomePage from './app/components/pages/HomePage';
import EstudiosPage from './app/components/pages/EstudiosPage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage}/>
        <Route path="/estudios" component={EstudiosPage}/>
    </Route>
);

