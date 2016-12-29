import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './app/App';
import HomePage from './app/components/pages/HomePage';
import Page1 from './app/components/pages/Page1';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage}/>
        <Route path="/page1" component={Page1}/>
    </Route>
);

